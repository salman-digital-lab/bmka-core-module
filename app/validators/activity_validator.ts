import vine from '@vinejs/vine'

export const activityValidator = vine.compile(
  vine.object({
    name: vine.string(),
    slug: vine.string(),
    description: vine.string(),
    activity_start: vine.date(),
    activity_end: vine.date(),
    registration_start: vine.date(),
    registration_end: vine.date(),
    selection_start: vine.date(),
    selection_end: vine.date(),
    minimum_role: vine.number().withoutDecimals().positive(),
    activity_type: vine.enum(['common', 'registration_only', 'ssc', 'lmd', 'spectra', 'komprof']),
    additional_config: vine.object({
      custom_selection_data: vine.array(vine.string()),
      mandatory_profile_data: vine.array(vine.string()),
    }),
    is_published: vine.number(),
  })
)