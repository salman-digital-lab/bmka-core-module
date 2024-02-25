import vine from '@vinejs/vine'

export const UpdateRuangCurhatValidator = vine.compile(
  vine.object({
    counselorId: vine.number().optional(),
    status: vine.enum([
      'Belum Ditangani',
      'Akan Ditangani',
      'Sedang Ditangani',
      'Sudah Ditangani',
      'Gagal Ditangani',
    ]),
    additionalNotes: vine.string().optional(),
  })
)
