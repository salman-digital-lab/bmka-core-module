import factory from '@adonisjs/lucid/factories'
import Activity from '#models/activity'
import { DateTime } from 'luxon'

export const ActivityFactory = factory
  .define(Activity, async ({ faker }) => {
    const name = faker.lorem.sentence()
    const today = DateTime.now()

    return {
      name: name,
      slug: name.toLowerCase().replace(/ /g, '-'),
      description: faker.lorem.paragraphs(4),
      activity_start: today.plus({ days: 7 }),
      activity_end: today.plus({ days: 10 }),
      registration_start: today,
      registration_end: today.plus({ days: 6 }),
      selection_start: today,
      selection_end: today.plus({ days: 6 }),
      minimum_level: faker.number.int({ min: 1, max: 7 }),
      activity_type: faker.string.fromCharacters(['common', 'ssc', 'lmd']),
      additional_config: {},
      is_published: faker.number.int({ min: 0, max: 1 }),
    }
  })
  .build()
