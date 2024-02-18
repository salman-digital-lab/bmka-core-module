import { HttpContext } from '@adonisjs/core/http'
import ActivityRegistration from '#models/activity_registration'
import Activity from '#models/activity'
import Excel from 'exceljs'

export default class ActivityRegistrationsController {
  async show({ params, response }: HttpContext) {
    const registrationId: number = params.id
    try {
      const registration = await ActivityRegistration.findOrFail(registrationId)

      return response.ok({
        messages: 'GET_DATA_SUCCESS',
        data: registration,
      })
    } catch (error) {
      return response.internalServerError({
        message: 'GENERAL_ERROR',
        error: error.message,
      })
    }
  }

  async index({ params, request, response }: HttpContext) {
    const activityId = params.id
    const page = request.qs().page ?? 1
    const perPage = request.qs().per_page ?? 10
    try {
      const registrations = await ActivityRegistration.query()
        .where('activity_id', activityId)
        .orderBy('id', 'desc')
        .paginate(page, perPage)

      return response.ok({
        messages: 'GET_DATA_SUCCESS',
        data: registrations,
      })
    } catch (error) {
      return response.internalServerError({
        message: 'GENERAL_ERROR',
        error: error.message,
      })
    }
  }

  async updateStatus({ request, params, response }: HttpContext) {
    const registrationId: number = params.id
    const payload = request.all()
    try {
      const registration = await ActivityRegistration.findOrFail(registrationId)
      await registration.merge({ status: payload.status }).save()
      return response.ok({
        messages: 'UPDATE_DATA_SUCCESS',
        data: registration,
      })
    } catch (error) {
      return response.internalServerError({
        message: 'GENERAL_ERROR',
        error: error.message,
      })
    }
  }

  async export({ params, response }: HttpContext) {
    const activityId = params.id
    try {
      const activity = await Activity.findOrFail(activityId)
      const registrations = await ActivityRegistration.query()
        .where({ activityId: activityId })
        .preload('publicUser')

      const workbook = new Excel.Workbook()
      const worksheet = workbook.addWorksheet('Sheet 1')
      const font = { name: 'Times New Roman', size: 12 }

      worksheet.columns = [
        { header: 'No', key: 'no', width: 5, style: { font: font } },
        { header: 'Name', key: 'name', width: 40, style: { font: font } },
        { header: 'Gender', key: 'gender', width: 7, style: { font: font } },
        { header: 'Email', key: 'email', width: 30, style: { font: font } },
        { header: 'Whatsapp', key: 'whatsapp', width: 20, style: { font: font } },
        { header: 'Line ID', key: 'line', width: 15, style: { font: font } },
        { header: 'Instagram', key: 'instagram', width: 15, style: { font: font } },
        {
          header: 'Province',
          key: 'province',
          width: 25,
          style: { font: font },
        },
        { header: 'City', key: 'city', width: 40, style: { font: font } },
        {
          header: 'University',
          key: 'university',
          width: 50,
          style: { font: font },
        },
        { header: 'Major', key: 'major', width: 40, style: { font: font } },
        {
          header: 'Intake Year',
          key: 'intake_year',
          width: 13,
          style: { font: font },
        },
        { header: 'Role', key: 'level', width: 15, style: { font: font } },
      ]

      const questions: Array<{ label: string; name: string }> = JSON.parse(
        activity.additionalQuestionnaire
      )
      questions.forEach((question) => {
        worksheet.columns = [
          ...worksheet.columns,
          {
            header: question.label,
            key: question.name,
            width: 20,
            style: { font: font },
          },
        ]
      })

      return response.ok({
        messages: 'EXPORT_DATA_SUCCESS',
      })
    } catch (error) {
      return response.internalServerError({
        message: 'GENERAL_ERROR',
        error: error.message,
      })
    }
  }
}
