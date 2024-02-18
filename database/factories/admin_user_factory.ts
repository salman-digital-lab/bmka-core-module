import factory from '@adonisjs/lucid/factories'
import AdminUser from '#models/admin_user'

export const AdminUserFactory = factory
  .define(AdminUser, async ({ faker }) => {
    return {
      email: faker.internet.email(),
      password: faker.internet.password(),
      display_name: faker.internet.displayName(),
    }
  })
  .build()
