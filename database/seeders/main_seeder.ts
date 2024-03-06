import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { UniversityFactory } from '#database/factories/university_factory'
import { ProvinceFactory } from '#database/factories/province_factory'
import { CityFactory } from '#database/factories/city_factory'
import { ActivityFactory } from '#database/factories/activity_factory'
import { PublicUserFactory } from '#database/factories/public_user_factory'
import { AdminUserFactory } from '#database/factories/admin_user_factory'
import { ProfileFactory } from '#database/factories/profile_factory'
import { ActivityRegistrationFactory } from '#database/factories/activity_registration_factory'
import { RuangCurhatFactory } from '#database/factories/ruang_curhat_factory'
import { RoleFactory } from '#database/factories/role_factory'
import { PermissionFactory } from '#database/factories/permission_factory'
import { RolesPermissionFactory } from '#database/factories/roles_permission_factory'

export default class extends BaseSeeder {
  async run() {
    await UniversityFactory.createMany(10)
    await ProvinceFactory.createMany(10)
    await CityFactory.createMany(15)
    await ActivityFactory.createMany(25)
    await AdminUserFactory.createMany(10)

    for (var i: number = 1; i <= 10; i++) {
      const user = await PublicUserFactory.create()
      await ProfileFactory.merge({ userId: user.id }).create()
    }

    await ActivityRegistrationFactory.createMany(10)
    await RuangCurhatFactory.createMany(10)
    await PermissionFactory.createMany(5)
    await RoleFactory.createMany(5)
    await RolesPermissionFactory.createMany(10)
  }
}
