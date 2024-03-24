import { HttpContext } from '@adonisjs/core/http'
import City from '#models/city'
import { cityValidator } from '#validators/region_validator'

export default class ProvincesController {
  async index({ response }: HttpContext) {
    try {
      const cities = await City.all()

      return response.ok({
        messages: 'GET_DATA_SUCCESS',
        data: cities,
      })
    } catch (error) {
      return response.internalServerError({
        message: 'GENERAL_ERROR',
        error: error.message,
      })
    }
  }

  async getByProvinceId({ params, response }: HttpContext) {
    const provinceId: number = params.id
    try {
      const cities = await City.query().where('province_id', provinceId)

      return response.ok({
        messages: 'GET_DATA_SUCCESS',
        data: cities,
      })
    } catch (error) {
      return response.internalServerError({
        message: 'GENERAL_ERROR',
        error: error.message,
      })
    }
  }

  async store({ request, response }: HttpContext) {
    const payload = await cityValidator.validate(request.all())
    try {
      const city = await City.create(payload)

      return response.ok({
        message: 'CREATE_DATA_SUCCESS',
        data: city,
      })
    } catch (error) {
      return response.internalServerError({
        message: 'GENERAL_ERROR',
        error: error.message,
      })
    }
  }

  async update({ params, request, response }: HttpContext) {
    const payload = await cityValidator.validate(request.all())
    try {
      const id: number = params.id
      const city = await City.findOrFail(id)
      const updated = await city.merge(payload).save()

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
