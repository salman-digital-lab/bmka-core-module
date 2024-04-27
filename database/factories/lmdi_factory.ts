import factory from '@adonisjs/lucid/factories'
import Activity from '#models/activity'
import { DateTime } from 'luxon'
import { ActivityCategory, ActivityType } from '../../enum.js'

type PersonalQuestionnaire = {
  name: string
  required: boolean
}

type Questionnaire =
  | {
      id?: number
      type: 'text' | 'number' | 'textarea'
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

const PERSONAL_QUESTIONNAIRE_DEFAULT = [
  { name: 'personal_id', required: true },
  { name: 'gender', required: true },
  { name: 'province_id', required: true },
  { name: 'whatsapp', required: true },
  { name: 'linkedin', required: true },
  { name: 'tiktok', required: false },
  { name: 'university_temp', required: true },
  { name: 'major', required: true },
  { name: 'intake_year', required: true },
] as PersonalQuestionnaire[]

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
    label: 'Enter the link to your curriculum vitae',
    name: 'question162434618698378',
    required: true,
  },
  {
    type: 'text',
    label: 'Enter your referal code',
    name: 'question16646132498378',
    required: true,
  },
] as Questionnaire[]

export const LMDIActivityRegistration = factory
  .define(Activity, async () => {
    return {
      name: 'Call For Participants',
      slug: 'call-for-participants',
      registration_start: DateTime.local(2024, 4, 12),
      registration_end: DateTime.local(2024, 5, 31),
      activity_type: ActivityType.REGISTRATION_ONLY,
      activityCategory: ActivityCategory.KADERISASI,
      is_published: 1,
      additionalConfig: {
        custom_selection_status: [],
        mandatory_profile_data: PERSONAL_QUESTIONNAIRE_DEFAULT,
        additional_questionnaire: ADDITIONAL_QUESTIONNAIRE_DEFAULT,
        images: [],
      },
    }
  })
  .build()

export const LMDIActivityFirstTraining = factory
  .define(Activity, async () => {
    return {
      name: 'Youth Productive Class',
      slug: 'youth-produvtive-class',
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
      name: 'Innovator Class & Mentorship',
      slug: 'innovator-class-mentorship',
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
      name: 'Leadership in Action Summit 2024',
      slug: 'leadership-in-action-summit-2024',
      activityCategory: ActivityCategory.KADERISASI,
      registration_start: DateTime.local(2024, 8, 20),
      registration_end: DateTime.local(2024, 8, 25),
      activity_type: ActivityType.SUB_PROGRAM,
      is_published: 1,
    }
  })
  .build()
