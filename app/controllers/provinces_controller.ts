import { HttpContext } from '@adonisjs/core/http'
import Province from '#models/province'

export default class ProvincesController {
  async index({ response }: HttpContext) {
    try {
      const provinces = await Province.all()

      return response.ok({
        messages: 'GET_DATA_SUCCESS',
        data: provinces,
      })
    } catch (error) {
      return response.internalServerError({
        message: 'GENERAL_ERROR',
        error: error.message,
      })
    }
  }
}
