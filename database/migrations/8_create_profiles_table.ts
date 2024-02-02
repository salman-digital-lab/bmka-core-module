import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'profiles'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('user_id').references('id').inTable('public_users').onDelete('CASCADE')
      table.string('name', 50).notNullable()
      table.enu('gender', ['M', 'F'])
      table.string('whatsapp', 35)
      table.string('line', 50)
      table.string('instagram', 50)
      table.integer('province_id', 2)
      table.foreign('province_id').references('id').inTable('provinces')
      table.integer('city_id', 4)
      table.foreign('city_id').references('id').inTable('cities')
      table.string('university')
      table.string('major', 50)
      table.string('intake_year', 4)
      table.integer('level')

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}