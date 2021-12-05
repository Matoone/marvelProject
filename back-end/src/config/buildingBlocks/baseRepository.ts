import knexInstance from '../db/knexInstance';
import { Identity } from './identity';
import { NotFound } from './errors';

export interface Repository<T extends Identity> {
  getById(id: string): Promise<T>;
  getByIds(...ids: string[]): Promise<T[]>;
  add(...objects: T[]): Promise<string[]>;
  save(...objects: T[]): Promise<string[]>;
  remove(...objects: T[]): Promise<string[]>;
}
export abstract class KnexRepository<T extends Identity>
  implements Repository<T>
{
  constructor(
    readonly tableName: string,
    readonly toObject: (snapshot: any) => T,
    readonly toData: (object: T) => any
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
      const data = objects.map(this.toData);

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
  async save(...objects: T[]): Promise<string[]> {
    const trx = await knexInstance.transaction();
    try {
      await Promise.all(
        objects.map((obj) => {
          const { id, ...snapshot } = this.toData(obj as T);
          return trx(this.tableName).where({ id: id }).update(snapshot);
        })
      );
      await trx.commit();

      return objects.map((obj) => obj.id);
    } catch (e) {
      await trx.rollback();
      console.log(e);
      throw e;
    }
  }
  async remove(...objects: T[]): Promise<string[]> {
    const trx = await knexInstance.transaction();
    try {
      await trx(this.tableName)
        .whereIn(
          'id',
          objects.map((obj) => obj.id)
        )
        .delete();
      await trx.commit();

      return objects.map((obj) => obj.id);
    } catch (e) {
      await trx.rollback();
      console.log(e);
      throw e;
    }
  }
}
