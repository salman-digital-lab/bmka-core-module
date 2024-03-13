import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'activities'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name', 255).notNullable()
      table.string('slug', 255).unique().notNullable()
      table.text('description').nullable().defaultTo(null)
      table.date('activity_start').nullable().defaultTo(null)
      table.date('activity_end').nullable().defaultTo(null)
      table.date('registration_start').nullable().defaultTo(null)
      table.date('registration_end').nullable().defaultTo(null)
      table.date('selection_start').nullable().defaultTo(null)
      table.date('selection_end').nullable().defaultTo(null)
      table.integer('minimum_level').nullable().defaultTo(0)
      table.integer('activity_type', 2).nullable().defaultTo(null)
      table.integer('activity_category').nullable().defaultTo(null)
      table.string('images', 255).nullable().defaultTo(null)
      table.text('additional_questionnaire', 'longtext').nullable().defaultTo('[]')
      table.text('additional_config', 'longtext').nullable().defaultTo(`{
        custom_selection_data: [],
        mandatory_profile_data: [],
      }`)
      table.integer('is_published', 1).defaultTo(1)

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
