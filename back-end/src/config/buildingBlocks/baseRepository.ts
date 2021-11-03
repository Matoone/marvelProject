import knexInstance from '../db/knexInstance';
import { Identity } from './identity';
import { NotFound } from './errors';

export interface Repository<T extends Identity> {
  /**
   * Récupère un aggrégat depuis son identité.
   * @param id
   */
  getById(id: string): Promise<T>;

  /**
   * Récupère une liste d'aggrégat depuis leur identité.
   * @param ids
   */
  getByIds(...ids: string[]): Promise<T[]>;

  /**
   * Ajoute un ou plusieurs aggrégats à la couche de données.
   * @param objects
   */
  add(...objects: T[]): Promise<string[]>;

  /**
   * Modifie un ou plusieurs aggrégats dans notre couche de données.
   * @param objects
   */
  save(...objects: T[]): Promise<void>;

  /**
   * Supprime un ou plusieurs aggrégats de la couche de données.
   * @param objects
   */
  remove(...objects: T[]): Promise<void>;
}

export interface IJoinTableParams<T extends Identity> {
  name: string;
  joinColumn: string;
  toObject: (data: any) => T;
  toData: (object: T) => any;
}

export abstract class KnexRepository<T extends Identity>
  implements Repository<T>
{
  constructor(
    readonly tableName: string,
    readonly toObject: (snapshot: any) => T,
    readonly toData: (object: T) => any,
  ) {}
  async getById(id: string): Promise<T> {
    const query = knexInstance
      .table(this.tableName)
      .where(`${this.tableName}.id`, id)
      .first();

    let snapshot = await query;
    if (!snapshot) {
      throw new NotFound(this.tableName);
    }

    return this.toObject(snapshot);
  }

  async getByIds(...ids: string[]): Promise<T[]> {
    const query = knexInstance
      .table(this.tableName)
      .whereIn(`${this.tableName}.id`, ids);

    const snapshots = await query;

    return snapshots.map(this.toObject);
  }
  async add(...objects: T[]): Promise<string[]> {
    const trx = await knexInstance.transaction();
    try {
      const data = objects.map(this.toData)

      const ids: string[] = await trx(this.tableName)
        .insert(data)
        .returning('id');

      await trx.commit();

      return ids;
    } catch (e) {
      await trx.rollback();
      console.log(e);
      throw e;
    }
  }
  async save(...objects: T[]): Promise<void> {
    const trx = await knexInstance.transaction();
    try {

      await Promise.all(
        objects.map((obj) => {
          const { id, ...snapshot } = this.toData(obj as T);
          return trx(this.tableName).where({ id: id }).update(snapshot);
        })
      );
      await trx.commit();
    } catch (e) {
      await trx.rollback();
      console.log(e);
      throw e;
    }
  }
  async remove(...objects: T[]): Promise<void> {
    const trx = await knexInstance.transaction();
    try {
      await trx(this.tableName)
        .whereIn(
          'id',
          objects.map((obj) => obj.id)
        )
        .delete();
      await trx.commit();
    } catch (e) {
      await trx.rollback();
      console.log(e);
      throw e;
    }
  }
}
