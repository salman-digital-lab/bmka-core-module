import vine from '@vinejs/vine'

export const activityValidator = vine.compile(
  vine.object({
    name: vine.string(),
    slug: vine.string(),
    description: vine.string().optional(),
    activity_start: vine.date().optional(),
    activity_end: vine.date().afterField('activity_start').optional(),
    registration_start: vine.date().optional(),
    registration_end: vine.date().afterField('registration_start').optional(),
    selection_start: vine.date().optional(),
    selection_end: vine.date().afterField('selection_start').optional(),
    minimum_level: vine.number().withoutDecimals().positive().optional(),
    activity_type: vine.number().withoutDecimals().positive().optional(),
    additional_config: vine
      .object({
        custom_selection_data: vine.array(vine.string()),
        mandatory_profile_data: vine.array(vine.string()),
      })
      .optional(),
    is_published: vine.number().optional(),
    additional_questionnaire: vine.string().optional(),
    activity_category: vine.number().withoutDecimals().positive().optional(),
  })
)

export const updateActivityValidator = vine.compile(
  vine.object({
    name: vine.string().optional(),
    slug: vine.string().optional(),
    description: vine.string().optional(),
    activity_start: vine.date().optional(),
    activity_end: vine.date().afterField('activity_start').optional(),
    registration_start: vine.date().optional(),
    registration_end: vine.date().afterField('registration_start').optional(),
    selection_start: vine.date().optional(),
    selection_end: vine.date().afterField('selection_start').optional(),
    minimum_level: vine.number().withoutDecimals().positive().optional(),
    activity_type: vine.number().withoutDecimals().positive().optional(),
    additional_config: vine
      .object({
        custom_selection_data: vine.array(vine.string()),
        mandatory_profile_data: vine.array(vine.string()),
      })
      .optional(),
    is_published: vine.number().optional(),
    additional_questionnaire: vine.string().optional(),
    activity_category: vine.number().withoutDecimals().positive().optional(),
  })
)

export const imageValidator = vine.compile(
  vine.object({
    images: vine.file({
      size: '2mb',
      extnames: ['jpg', 'png', 'jpeg', 'PNG', 'JPG', 'JPEG'],
    }),
  })
)
