import { HttpContext } from '@adonisjs/core/http'
import City from '#models/city'

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
}
