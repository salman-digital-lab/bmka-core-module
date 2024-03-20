import { HttpContext } from '@adonisjs/core/http'
import ActivityRegistration from '#models/activity_registration'
import Activity from '#models/activity'
import Excel from 'exceljs'
import Profile from '#models/profile'
import db from '@adonisjs/lucid/services/db'

export default class ActivityRegistrationsController {
  async show({ params, response }: HttpContext) {
    const registrationId: number = params.id
    try {
      const registration = await ActivityRegistration.findOrFail(registrationId)
      registration.questionnaireAnswer = JSON.parse(registration.questionnaireAnswer)

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

    const profiles: {
      name?: string
    } = {}

    if (request.qs().name) {
      profiles.name = request.qs().name
    }

    // eslint-disable-next-line @typescript-eslint/naming-convention
    const activity_registrations: {
      status?: string
    } = {}

    if (request.qs().status) {
      activity_registrations.status = request.qs().status
    }

    try {
      const activity = await Activity.findOrFail(activityId)
      const config = JSON.parse(activity.additionalConfig)
      const mandatoryData: string[] = config.mandatory_profile_data
      mandatoryData.map((element) => {
        element = 'profiles.' + element
      })

      const registrations = await db
        .from('activity_registrations')
        .join('public_users', 'activity_registrations.user_id', '=', 'public_users.id')
        .join('profiles', 'activity_registrations.user_id', '=', 'profiles.user_id')
        .where(profiles)
        .where(activity_registrations)
        .where('activity_registrations.activity_id', activityId)
        .select(
          'activity_registrations.id',
          'public_users.id as user_id',
          'public_users.email',
          'activity_registrations.status',
          ...mandatoryData
        )
        .orderBy('activity_registrations.id', 'desc')
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
        .select('*')

      if (!registrations) {
        return response.notFound({
          message: 'REGISTRATIONS_NOT_AVAILABLE',
        })
      }

      const workbook = new Excel.Workbook()
      const worksheet = workbook.addWorksheet('Sheet 1')
      const font = { name: 'Arial', size: 12 }

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

      for (let [i, item] of registrations.entries()) {
        let profile = await Profile.query()
          .where('user_id', item.publicUser.id)
          .preload('province')
          .preload('city')
          .preload('university')
          .firstOrFail()

        let profileRowData = {
          no: i + 1,
          name: profile.name,
          gender: profile.gender,
          email: item.publicUser.email,
          whatsapp: profile.whatsapp,
          line: profile.line,
          instagram: profile.instagram,
          province: profile.province.name,
          city: profile.city.name,
          university: profile.university.name,
          major: profile.major,
          intake_year: profile.intakeYear,
          level: profile.level,
        }
        /*

        questionnaireAnswer sample:
        {
          "0":"Jawaban 1",
          "1":"Jawaban 2",
          "2":"["Apple", "Peach"]",
          "3":"Jawaban 2",
        }

        */

        let parsedAnswers: { [index: string]: string } = JSON.parse(item.questionnaireAnswer)
        let answers: string[] = Object.keys(parsedAnswers).map((key) => parsedAnswers[key])
        let answerRowData = Object.assign({}, answers)
        let rowData = { ...profileRowData, ...answerRowData }
        worksheet.addRow(rowData)
      }

      const buffer = await workbook.xlsx.writeBuffer()

      return response
        .status(200)
        .safeHeader('Content-type', 'application/vnd-ms-excel')
        .safeHeader(
          'Content-Disposition',
          `attachment; filename=${activity.name.replace(/ /g, '-')}.xls`
        )
        .send(buffer)
    } catch (error) {
      return response.internalServerError({
        message: 'GENERAL_ERROR',
        error: error.message,
      })
    }
  }
}
