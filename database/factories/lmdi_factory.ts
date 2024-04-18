import factory from '@adonisjs/lucid/factories'
import Activity from '#models/activity'
import { DateTime } from 'luxon'
import { ActivityCategory, ActivityType } from '../../enum.js'

type Questionnaire =
  | {
      id?: number
      type: 'text' | 'number'
      label: string
      name: string
      required: boolean
    }
  | {
      id?: number
      type: 'dropdown'
      label: string
      name: string
      required: boolean
      data: { label: string; value: string; id: number }[]
    }

const ADDITIONAL_QUESTIONNAIRE_DEFAULT = [
  {
    type: 'text',
    label: 'What is your motivation for joining this event?',
    name: 'question1664618698378',
    required: true,
  },
  {
    type: 'text',
    label: 'Where did you hear about this event?',
    name: 'question1664613454378',
    required: true,
  },
  {
    type: 'text',
    label: 'Referal Code',
    name: 'question16646132498378',
    required: true,
  },
  {
    type: 'text',
    label: 'GDrive link to your CV',
    name: 'question162434618698378',
    required: true,
  },
]

export const LMDIActivityRegistration = factory
  .define(Activity, async () => {
    return {
      name: 'Open Registration ILIAS',
      slug: 'open-registration-ilias',
      registration_start: DateTime.local(2024, 4, 12),
      registration_end: DateTime.local(2024, 5, 31),
      activity_type: ActivityType.REGISTRATION_ONLY,
      activityCategory: ActivityCategory.KADERISASI,
      additionalQuestionnaire: JSON.stringify(
        ADDITIONAL_QUESTIONNAIRE_DEFAULT
      ) as unknown as Questionnaire[],
      is_published: 1,
      additionalConfig: {
        custom_selection_data: [],
        mandatory_profile_data: ['linkedin', 'personal_id', 'tiktok'],
      },
    }
  })
  .build()

export const LMDIActivityFirstTraining = factory
  .define(Activity, async () => {
    return {
      name: 'Productive Muslim Training',
      slug: 'productive-muslim-training',
      activityCategory: ActivityCategory.KADERISASI,

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
      activityCategory: ActivityCategory.KADERISASI,

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
      activityCategory: ActivityCategory.KADERISASI,

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
      activityCategory: ActivityCategory.KADERISASI,

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
      activityCategory: ActivityCategory.KADERISASI,
      registration_start: DateTime.local(2024, 8, 20),
      registration_end: DateTime.local(2024, 8, 25),
      activity_type: ActivityType.SUB_PROGRAM,
      is_published: 1,
    }
  })
  .build()
