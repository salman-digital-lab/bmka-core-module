import { HttpContext } from '@adonisjs/core/http'
import { registerValidator, loginValidator } from '#validators/auth_validator'
import AdminUser from '#models/admin_user'

export default class AuthController {
  async register({ request, response }: HttpContext) {
    const { email, password, displayName } = await registerValidator.validate(request.all())
    try {
      const exist = await AdminUser.findBy('email', email)

      if (exist) {
        return response.conflict({
          message: 'EMAIL_ALREADY_REGISTERED',
        })
      }

      const user = await AdminUser.create({
        email: email,
        password: password,
        displayName: displayName,
      })

      return response.ok({
        message: 'REGISTER_SUCCESS',
        data: user,
      })
    } catch (error) {
      return response.internalServerError({
        message: 'GENERAL_ERROR',
        error: error.message,
      })
    }
  }

  async login({ request, response, auth }: HttpContext) {
    const { email, password } = await loginValidator.validate(request.all())
    try {
      const user = await AdminUser.verifyCredentials(email, password)

      await auth.use('web').login(user)

      return response.ok({
        message: 'LOGIN_SUCCESS',
        data: user,
      })
    } catch (error) {
      return response.internalServerError({
        message: 'GENERAL_ERROR',
        error: error.message,
      })
    }
  }

  async logout({ auth, response }: HttpContext) {
    try {
      await auth.use('web').logout()

      return response.ok({
        message: 'LOGOUT_SUCCESS',
      })
    } catch (error) {
      return response.internalServerError({
        message: 'GENERAL_ERROR',
        error: error.message,
      })
    }
  }

  async sendPasswordRecovery({ request, response }: HttpContext) {
    try {
      const email: string = request.all().email
      const user = await AdminUser.findBy('email', email)

      if (!user) {
        return response.notFound({
          message: 'EMAIL_NOT_FOUND',
        })
      }

      // need to install & implement adonis mail here
      return response.ok({
        message: 'SEND_EMAIL_SUCCESS',
      })
    } catch (error) {
      return response.internalServerError({
        message: 'GENERAL_ERROR',
        error: error.message,
      })
    }
  }
}
