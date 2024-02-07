import vine from '@vinejs/vine'

export const activityValidator = vine.compile(
  vine.object({
    name: vine.string(),
    slug: vine.string(),
    description: vine.string(),
    activity_start: vine.date({
      formats: ['YYYY/MM/DD'],
    }),
    activity_end: vine.date().afterField('activity_start'),
    registration_start: vine.date(),
    registration_end: vine.date().afterField('registration_start'),
    selection_start: vine.date(),
    selection_end: vine.date().afterField('selection_start'),
    minimum_role: vine.number().withoutDecimals().positive(),
    activity_type: vine.enum(['common', 'registration_only', 'ssc', 'lmd', 'spectra', 'komprof']),
    additional_config: vine
      .object({
        custom_selection_data: vine.array(vine.string()),
        mandatory_profile_data: vine.array(vine.string()),
      })
      .optional(),
    is_published: vine.number(),
  })
)
