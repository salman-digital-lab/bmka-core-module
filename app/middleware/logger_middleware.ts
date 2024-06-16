import { HttpContext } from '@adonisjs/core/http'
import { NextFn } from '@adonisjs/core/types/http'

export default class {
  async handle({ request, response, logger }: HttpContext, next: NextFn) {
    await next()
    const datetime = new Date().toLocaleString()

    if (response.getStatus() < 400) {
      logger.info(
        'DATE: ' +
          datetime +
          ' | IP: ' +
          request.ip() +
          ' | METHOD: ' +
          request.method() +
          ' | URL: ' +
          request.url() +
          ' | STATUS: ' +
          JSON.stringify(response.getStatus()) +
          ' | BODY: ' +
          JSON.stringify(response.getBody())
      )
    } else {
      logger.error(
        'DATE: ' +
          datetime +
          ' | IP: ' +
          request.ip() +
          ' | METHOD: ' +
          request.method() +
          ' | URL: ' +
          request.url() +
          ' | STATUS: ' +
          JSON.stringify(response.getStatus()) +
          ' | BODY: ' +
          JSON.stringify(response.getBody())
      )
    }
  }
}
