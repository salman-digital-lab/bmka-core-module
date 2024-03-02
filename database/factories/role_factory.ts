import factory from '@adonisjs/lucid/factories'
import Role from '#models/role'

export const RoleFactory = factory
  .define(Role, async ({ faker }) => {
    return {
      role_name: faker.string.fromCharacters(['panitia', 'counselor', 'admin']),
    }
  })
  .build()
