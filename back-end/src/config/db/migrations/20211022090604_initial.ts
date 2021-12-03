import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('users', function (table) {
    table.uuid('id').primary();
    table.string('email').unique().notNullable();
    table.string('password').notNullable();
    table.timestamps(undefined, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('users');
}
