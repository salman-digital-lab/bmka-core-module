import { BaseCommand } from '@adonisjs/core/ace'
import type { CommandOptions } from '@adonisjs/core/types/ace'
import db from '@adonisjs/lucid/services/db'

export default class DeleteExpiredToken extends BaseCommand {
  static commandName = 'delete:expired-token'
  static description = 'delete expired token'

  static options: CommandOptions = {}

  async run() {
    const today = new Date()
    let isoDate = today.toISOString()
    let dateString = isoDate.substring(0, 10)
    db.from('public_auth_access_tokens').where('expires_at', '<', dateString).delete()
    db.from('admin_auth_access_tokens').where('expires_at', '<', dateString).delete()
  }
}
