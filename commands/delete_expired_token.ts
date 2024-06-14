import { BaseCommand } from '@adonisjs/core/ace'
import type { CommandOptions } from '@adonisjs/core/types/ace'
import db from '@adonisjs/lucid/services/db'
import logger from '@adonisjs/core/services/logger'

export default class DeleteExpiredToken extends BaseCommand {
  static commandName = 'delete:expired-token'
  static description = 'delete expired token'

  static options: CommandOptions = {
    startApp: true,
  }

  async run() {
    const today = new Date()
    let isoDate = today.toISOString()
    let dateString = isoDate.substring(0, 10)
    try {
      await db.from('public_auth_access_tokens').where('expires_at', '<', dateString).delete()
      await db.from('admin_auth_access_tokens').where('expires_at', '<', dateString).delete()
      logger.info('succesfully removed expired token')
    } catch (error) {
      logger.error(error.message)
    }
  }
}
