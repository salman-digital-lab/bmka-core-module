import factory from '@adonisjs/lucid/factories'
import Activity from '#models/activity'
import { DateTime } from 'luxon'
import { ActivityType } from '../../enum.js'

export const LMDIActivityRegistration = factory
  // @ts-expect-error need to fix later
  .define(Activity, async () => {
    return {
      name: 'Open Registration ILIAS',
      slug: 'open-registration-ilias',
      registration_start: DateTime.local(2024, 4, 12),
      registration_end: DateTime.local(2024, 5, 31),
      activity_type: ActivityType.REGISTRATION_ONLY,
      is_published: 1,
      additionalConfig: JSON.stringify({
        custom_selection_data: [],
        mandatory_profile_data: ['linkedin', 'personal_id', 'tiktok'],
      }),
    }
  })
  .build()

export const LMDIActivityFirstTraining = factory
  .define(Activity, async () => {
    return {
      name: 'Productive Muslim Training',
      slug: 'productive-muslim-training',
      registration_start: DateTime.local(2024, 6, 7),
      registration_end: DateTime.local(2024, 6, 9),
      activity_type: ActivityType.SUB_PROGRAM,
      is_published: 1,
    }
  })
  .build()

export const LMDIActivitySecondSelection = factory
  .define(Activity, async () => {
    return {
      name: '2nd Phase Selection',
      slug: '2nd-phase-selection',
      registration_start: DateTime.local(2024, 6, 13),
      registration_end: DateTime.local(2024, 7, 4),
      activity_type: ActivityType.SUB_PROGRAM,
      is_published: 1,
    }
  })
  .build()

export const LMDIActivityPersonalityAssesment = factory
  .define(Activity, async () => {
    return {
      name: 'Personality Assessment',
      slug: 'personality-assessment',
      registration_start: DateTime.local(2024, 7, 8),
      registration_end: DateTime.local(2024, 7, 14),
      activity_type: ActivityType.SUB_PROGRAM,
      is_published: 1,
    }
  })
  .build()

export const LMDIActivityInnovatorClass = factory
  .define(Activity, async () => {
    return {
      name: 'Innovator Class',
      slug: 'innovator-class',
      registration_start: DateTime.local(2024, 7, 15),
      registration_end: DateTime.local(2024, 8, 17),
      activity_type: ActivityType.SUB_PROGRAM,
      is_published: 1,
    }
  })
  .build()

export const LMDIActivityMain = factory
  .define(Activity, async () => {
    return {
      name: 'Leadership in Action Summit',
      slug: 'leadership-in-action-summit',
      registration_start: DateTime.local(2024, 8, 20),
      registration_end: DateTime.local(2024, 8, 25),
      activity_type: ActivityType.SUB_PROGRAM,
      is_published: 1,
    }
  })
  .build()
