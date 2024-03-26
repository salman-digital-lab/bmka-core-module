import { HttpContext } from '@adonisjs/core/http'
import PublicUser from '#models/public_user'
import Profile from '#models/profile'
import { updateProfileValidator } from '#validators/profile_validator'

export default class ProfilesController {
  async index({ request, response }: HttpContext) {
    try {
      const page = request.qs().page ?? 1
      const perPage = request.qs().per_page ?? 10
      const search = request.qs().search

      const profiles = await Profile.query()
        .select('*')
        .where('name', 'ILIKE', search ? '%' + search + '%' : '%%')
        .preload('publicUser')
        .orderBy('name', 'asc')
        .paginate(page, perPage)

      return response.ok({
        messages: 'GET_DATA_SUCCESS',
        data: profiles,
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
      const userData = await PublicUser.find(id)
      const profile = await Profile.query()
        .select('*')
        .where('user_id', id)
        .preload('province')
        .preload('city')

      return response.ok({
        message: 'GET_DATA_SUCCESS',
        data: { userData, profile },
      })
    } catch (error) {
      return response.internalServerError({
        message: 'GENERAL_ERROR',
        error: error.message,
      })
    }
  }

  async update({ params, request, response }: HttpContext) {
    try {
      const payload = await updateProfileValidator.validate(request.all())
      const id: number = params.id
      const profile = await Profile.findByOrFail('user_id', id)
      const updated = await profile.merge(payload).save()

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

  async delete({ params, response }: HttpContext) {
    const id = params.id
    try {
      const profile = await Profile.find('id', id)
      if (!profile) {
        return response.ok({
          message: 'PROFILE_NOT_FOUND',
        })
      }
      await Profile.query().where('id', id).delete()
      return response.ok({
        message: 'DELETE_DATA_SUCCESS',
      })
    } catch (error) {
      return response.internalServerError({
        message: 'GENERAL_ERROR',
        error: error.message,
      })
    }
  }
}
