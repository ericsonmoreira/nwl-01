import Knex from 'knex'

export async function up(knex: Knex) {
  // CRIAR A TABELA
  return knex.schema.createTable('point_items', table => {
    table.integer('point_id').
      notNullable().
      references('id').
      inTable('points');
    table.integer('item_id').
      notNullable().
      references('id').
      inTable('items');
  });
}

export async function down(knex: Knex) {
  // Voltar atras (Deletar a TABELA)
  return knex.schema.dropTable('point_items');
}