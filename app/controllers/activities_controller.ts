import { HttpContext } from '@adonisjs/core/http'
import app from '@adonisjs/core/services/app'
import Activity from '#models/activity'
import {
  activityValidator,
  updateActivityValidator,
  imageValidator,
} from '#validators/activity_validator'
import { DateTime } from 'luxon'
import { unlink } from 'node:fs/promises'

export default class ActivitiesController {
  async index({ request, response }: HttpContext) {
    try {
      const page = request.qs().page ?? 1
      const perPage = request.qs().per_page ?? 10
      const search = request.qs().search

      const clause: {
        activity_category?: number
        minimum_level?: number
        activity_type?: number
      } = {}

      if (request.qs().category) {
        clause.activity_category = request.qs().category
      }

      if (request.qs().minimumLevel) {
        clause.minimum_level = request.qs().minimumLevel
      }

      if (request.qs().activity_type) {
        clause.activity_type = request.qs().activity_type
      }

      const activities = await Activity.query()
        .where(clause)
        .where('name', 'ILIKE', search ? '%' + search + '%' : '%%')
        .select(
          'id',
          'name',
          'activity_start',
          'activity_end',
          'registration_start',
          'registration_end',
          'selection_start',
          'selection_end',
          'activity_type',
          'activity_category',
          'is_published'
        )
        .orderBy('id', 'desc')
        .paginate(page, perPage)

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

      var fileNames: string[]
      if (activity.images !== null) {
        fileNames = activity.images.split(',')
      } else {
        fileNames = []
      }

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
    const index: number = payload.index
    try {
      const activity = await Activity.findOrFail(activityId)

      if (activity.images === null) {
        return response.notFound({
          message: 'IMAGE_NOT_FOUND',
        })
      }

      const filePath = `./public/activity-images/${activity.images[index]}`
      await unlink(filePath)

      const images: string[] = activity.images.split(',')
      images.splice(index, 1)
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
        activityStart: payload.activity_start
          ? DateTime.fromJSDate(payload.activity_start)
          : undefined,
        activityEnd: payload.activity_end ? DateTime.fromJSDate(payload.activity_end) : undefined,
        registrationStart: payload.registration_start
          ? DateTime.fromJSDate(payload.registration_start)
          : undefined,
        registrationEnd: payload.registration_end
          ? DateTime.fromJSDate(payload.registration_end)
          : undefined,
        selectionStart: payload.selection_start
          ? DateTime.fromJSDate(payload.selection_start)
          : undefined,
        selectionEnd: payload.selection_end
          ? DateTime.fromJSDate(payload.selection_end)
          : undefined,
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
    const payload = await updateActivityValidator.validate(request.all())
    try {
      const id: number = params.id
      const activityData = await Activity.findOrFail(id)
      const updated = await activityData
        .merge({
          ...payload,
          activityStart: payload.activity_start
            ? DateTime.fromJSDate(payload.activity_start)
            : undefined,
          activityEnd: payload.activity_end ? DateTime.fromJSDate(payload.activity_end) : undefined,
          registrationStart: payload.registration_start
            ? DateTime.fromJSDate(payload.registration_start)
            : undefined,
          registrationEnd: payload.registration_end
            ? DateTime.fromJSDate(payload.registration_end)
            : undefined,
          selectionStart: payload.selection_start
            ? DateTime.fromJSDate(payload.selection_start)
            : undefined,
          selectionEnd: payload.selection_end
            ? DateTime.fromJSDate(payload.selection_end)
            : undefined,
        })
        .save()

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
