/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('todos').del();
  await knex('todos').insert([
    { name: 'Course list', status: 1 },
    { name: 'Create student', status: 2 },
    { name: 'Update university', status: 0 },
  ]);
};
