import factory from '@adonisjs/lucid/factories'
import ActivityRegistration from '#models/activity_registration'
import Activity from '#models/activity'
import PublicUser from '#models/public_user'

export const ActivityRegistrationFactory = factory
  .define(ActivityRegistration, async ({ faker }) => {
    const publicUsers = await PublicUser.query().select('id')
    const activities = await Activity.query().select('id').where('is_published', 0)

    return {
      user_id: publicUsers[Math.floor(Math.random() * (publicUsers.length - 1))].id,
      activity_id: activities[Math.floor(Math.random() * (activities.length - 1))].id,
      status: faker.string.fromCharacters([
        'DITERIMA',
        'LULUS KEGIATAN',
        'TIDAK LULUS',
        'TIDAK DITERIMA',
      ]),
      questionnaireAnswer: {
        '0': 'google.drive.com/kdbhjehdbH',
        '1': 'share poster ke 3 wa grup',
        '2': 'Cukup besar',
      },
    }
  })
  .build()

export const ActivityRegistrationOnlyFactory = factory
  .define(ActivityRegistration, async () => {
    const publicUsers = await PublicUser.query().select('id')
    const activities = await Activity.query().select('id')

    return {
      user_id: publicUsers[Math.floor(Math.random() * (publicUsers.length - 1))].id,
      activity_id: activities[Math.floor(Math.random() * (activities.length - 1))].id,
      status: 'TERDAFTAR',
      questionnaireAnswer: {
        '0': 'google.drive.com/kdbhjehdbH',
        '1': 'share poster ke 3 wa grup',
        '2': 'Cukup besar',
      },
    }
  })
  .build()
