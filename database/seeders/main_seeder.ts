import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { UniversityFactory } from '#database/factories/university_factory'
import { ProvinceFactory } from '#database/factories/province_factory'
import { CityFactory } from '#database/factories/city_factory'
import { ActivityFactory } from '#database/factories/activity_factory'
import { PublicUserFactory } from '#database/factories/public_user_factory'
import { ProfileFactory } from '#database/factories/profile_factory'
import { ActivityRegistrationFactory } from '#database/factories/activity_registration_factory'

export default class extends BaseSeeder {
  async run() {
    await UniversityFactory.createMany(10)
    await ProvinceFactory.createMany(10)
    await CityFactory.createMany(15)
    await ActivityFactory.createMany(25)

    for (var i: number = 1; i <= 10; i++) {
      const user = await PublicUserFactory.create()
      await ProfileFactory.merge({ userId: user.id }).create()
    }

    await ActivityRegistrationFactory.createMany(10)
  }
}
