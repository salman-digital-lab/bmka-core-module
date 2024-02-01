import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'activities'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name', 255).notNullable().defaultTo(null)
      table.string('slug', 255).unique().notNullable().defaultTo(null)
      table.text('description').nullable()
      table.date('activity_start').notNullable().defaultTo(null)
      table.date('activity_end').notNullable().defaultTo(null)
      table.date('register_start').notNullable().defaultTo(null)
      table.date('register_end').notNullable().defaultTo(null)
      table.date('selection_start').notNullable().defaultTo(null)
      table.date('selection_end').notNullable().defaultTo(null)
      table
        .enu('activity_type', ['common', 'registration_only', 'ssc', 'lmd', 'spectra', 'komprof'])
        .defaultTo('common')
      table.text('additional_questionnaire', 'longtext').nullable().defaultTo('[]')
      table.text('additional_config', 'longtext').nullable().defaultTo('[]')
      table.integer('is_published', 1).defaultTo(1)

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
