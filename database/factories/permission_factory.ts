import factory from '@adonisjs/lucid/factories'
import Permission from '#models/permission'

export const PermissionFactory = factory
  .define(Permission, async ({ faker }) => {
    return {
      permission_code: faker.string.fromCharacters([
        'activity.common.create',
        'activity.common.edit',
        'activity.common.view',
        'profile.view',
        'profile.edit',
      ]),
    }
  })
  .build()
