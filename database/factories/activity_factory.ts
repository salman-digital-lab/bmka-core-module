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
      description:
        '<p>' +
        faker.lorem.paragraphs(1) +
        '</p>' +
        '<p>' +
        faker.lorem.paragraphs(1) +
        '</p>' +
        '<p>' +
        faker.lorem.paragraphs(1) +
        '</p>' +
        '<p>' +
        faker.lorem.paragraphs(1) +
        '</p>',
      activity_start: today.plus({ days: 7 }),
      activity_end: today.plus({ days: 10 }),
      registration_start: today,
      registration_end: today.plus({ days: 6 }),
      selection_start: today,
      selection_end: today.plus({ days: 6 }),
      minimum_level: faker.number.int({ min: 0, max: 6 }),
      activity_type: faker.string.fromCharacters([
        'common',
        'registration_only',
        'ssc',
        'kk',
        'lmd',
        'inventra',
        'komprof',
        'spectra',
      ]),
      activity_category: faker.number.int({ min: 0, max: 5 }),
      is_published: faker.number.int({ min: 0, max: 1 }),
      additionalConfig: JSON.stringify({
        custom_selection_data: ['Tahap 1', 'Tahap 2', 'Tahap 3'],
        mandatory_profile_data: ['whatsapp', 'province', 'city'],
      }),
      additionalQuestionnaire: JSON.stringify([
        {
          type: 'text',
          label:
            'Jika kamu sudah berinfaq/donasi untuk Masjid Salman ITB, silakan upload bukti transfernya di google drive, lalu taruh link-nya di sini ya! (Pastikan aksesnya sudah dibuka untuk memudahkan konfirmasi hihi)',
          name: 'text1664618698378',
          required: true,
        },
        {
          type: 'option',
          label: 'Sudah menyalurkan kebaikan ini melalui apa nih?',
          name: 'text1664618817082',
          required: true,
          data: [
            {
              label: 'Share poster ke 3 WA Grup',
              value: 'share poster ke 3 wa grup',
            },
            {
              label: 'Mention minimal 5 akun bestienya di postingan IG',
              value: 'mention minimal 5 akun bestienya di postingan ig',
            },
            {
              label: 'Ngajak sebanyak-banyak bestienya buat ikutan juga',
              value: 'ngajak sebanyak-banyak bestienya buat ikutan juga',
            },
          ],
        },
        {
          type: 'text',
          label: 'Apa motivasimu mengikuti kegiatan ini?',
          name: 'text1664619435933',
          required: true,
        },
        {
          type: 'text',
          label:
            'Apakah sudah memiliki channel podcast sendiri? (Bisa disebutkan nama channel & medianya) ',
          name: 'text1664619514471',
          required: true,
        },
      ]),
    }
  })
  .build()
