/**
 * @param { import("knex").Knex } knex
 * @returns {Knex.SchemaBuilder}
 */
 exports.up = function (knex) {
    return knex.schema.createTable('todos', function (table) {
      table.increments('id');
      table.string('name').notNullable();
      table.tinyint('status').defaultTo(0);
    });
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns {Knex.SchemaBuilder}
   */
  exports.down = function (knex) {
    return knex.schema.dropTable('todos');
  };