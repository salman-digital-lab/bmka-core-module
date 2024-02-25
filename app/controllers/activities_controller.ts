import { HttpContext } from '@adonisjs/core/http'
import app from '@adonisjs/core/services/app'
import Activity from '#models/activity'
import { activityValidator, imageValidator } from '#validators/activity_validator'
import { DateTime } from 'luxon'

export default class ActivitiesController {
  async index({ request, response }: HttpContext) {
    try {
      const page = request.qs().page ?? 1
      const perPage = request.qs().per_page ?? 10
      const search = request.qs().search

      type Clause = {
        activity_category: number
        minimum_level: number
      }

      const clause = <Clause>{}

      if (request.qs().category) {
        clause.activity_category = request.qs().category
      }

      if (request.qs().minimumLevel) {
        clause.minimum_level = request.qs().minimumLevel
      }

      const activities = await Activity.query()
        .select('*')
        .where(clause)
        .where('name', 'ILIKE', search ? '%' + search + '%' : '%%')
        .orderBy('id', 'desc')
        .paginate(page, perPage)

      activities.map((item) => {
        item.additionalConfig = JSON.parse(item.additionalConfig)
        item.additionalQuestionnaire = JSON.parse(item.additionalQuestionnaire)
      })

      return response.ok({
        messages: 'GET_DATA_SUCCESS',
        data: activities,
      })
    } catch (error) {
      return response.internalServerError({
        message: 'GENERAL_ERROR',
        error: error.message,
      })
    }
  }

  async show({ params, response }: HttpContext) {
    try {
      const id: number = params.id
      const activityData = await Activity.find(id)

      return response.ok({
        message: 'GET_DATA_SUCCESS',
        data: activityData,
      })
    } catch (error) {
      return response.internalServerError({
        message: 'GENERAL_ERROR',
        error: error.message,
      })
    }
  }

  async uploadImage({ request, params, response }: HttpContext) {
    const payload = await request.validateUsing(imageValidator)
    const activityId = params.id
    try {
      const activity = await Activity.find(activityId)
      if (!activity) {
        return response.notFound({
          message: 'ACTIVITY_NOT_FOUND',
        })
      }
      var fileNames: string[] = activity.images.split(',')
      const image = payload.images

      let newName = `${new Date().getTime()}.${image.subtype}`
      await image.move(app.publicPath('activity-images'), {
        name: newName,
        overwrite: true,
      })

      fileNames.push(newName)

      await activity.merge({ images: fileNames.toString() }).save()

      return response.ok({
        message: 'UPLOAD_IMAGE_SUCCESS',
      })
    } catch (error) {
      return response.internalServerError({
        message: 'GENERAL_ERROR',
        error: error.message,
      })
    }
  }

  async deleteImage({ request, params, response }: HttpContext) {
    const activityId = params.id
    const payload = request.all()
    try {
      const activity = await Activity.findOrFail(activityId)
      const images: string[] = activity.images.split(',')
      if (images.length !== 0) {
        images.splice(payload.index, 1)
      }
      await activity.merge({ images: images.toString() }).save()

      return response.ok({
        message: 'DELETE_IMAGE_SUCCESS',
      })
    } catch (error) {
      return response.internalServerError({
        message: 'GENERAL_ERROR',
        error: error.message,
      })
    }
  }

  async store({ request, response }: HttpContext) {
    const payload = await activityValidator.validate(request.all())
    try {
      const activityData = await Activity.create({
        ...payload,
        activityStart: DateTime.fromJSDate(payload.activity_start),
        activityEnd: DateTime.fromJSDate(payload.activity_end),
        registrationStart: DateTime.fromJSDate(payload.registration_start),
        registrationEnd: DateTime.fromJSDate(payload.registration_end),
        selectionStart: DateTime.fromJSDate(payload.selection_start),
        selectionEnd: DateTime.fromJSDate(payload.selection_end),
      })

      return response.ok({
        message: 'CREATE_DATA_SUCCESS',
        data: activityData,
      })
    } catch (error) {
      return response.internalServerError({
        message: 'GENERAL_ERROR',
        error: error.stack,
      })
    }
  }

  async update({ params, request, response }: HttpContext) {
    const payload = await activityValidator.validate(request.all())

    try {
      const id: number = params.id
      const activityData = await Activity.findOrFail(id)
      const updated = await activityData.merge(payload).save()

      return response.ok({
        message: 'UPDATE_DATA_SUCCESS',
        data: updated,
      })
    } catch (error) {
      return response.internalServerError({
        message: 'GENERAL_ERROR',
        error: error.message,
      })
    }
  }
}
