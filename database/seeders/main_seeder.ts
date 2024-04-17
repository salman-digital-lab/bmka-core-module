import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { UniversityFactory } from '#database/factories/university_factory'
import { ProvinceFactory } from '#database/factories/province_factory'
import { CityFactory } from '#database/factories/city_factory'
import { RealAdminUserFactory } from '#database/factories/admin_user_factory'
import { RoleFactory } from '#database/factories/role_factory'
import { PermissionFactory } from '#database/factories/permission_factory'
import { RolesPermissionFactory } from '#database/factories/roles_permission_factory'
import {
  LMDIActivityFirstTraining,
  LMDIActivityInnovatorClass,
  LMDIActivityMain,
  LMDIActivityPersonalityAssesment,
  LMDIActivityRegistration,
  LMDIActivitySecondSelection,
} from '#database/factories/lmdi_factory'

export default class extends BaseSeeder {
  async run() {
    await UniversityFactory.createMany(100)
    await ProvinceFactory.createMany(5)
    await CityFactory.createMany(100)

    await PermissionFactory.createMany(5)
    await RoleFactory.createMany(5)
    await RolesPermissionFactory.createMany(10)

    await LMDIActivityRegistration.create()
    await LMDIActivityFirstTraining.create()
    await LMDIActivitySecondSelection.create()
    await LMDIActivityPersonalityAssesment.create()
    await LMDIActivityInnovatorClass.create()
    await LMDIActivityMain.create()

    // Real Data Seeder
    await RealAdminUserFactory.create()
  }
}
