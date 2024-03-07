import { BaseCommand } from '@adonisjs/core/ace'
import type { CommandOptions } from '@adonisjs/core/types/ace'
import Activity from '#models/activity'

export default class CloseRegistration extends BaseCommand {
  static commandName = 'close:registration'
  static description = 'Set activity is_published as 0'

  static options: CommandOptions = {}

  async run() {
    var : string[] = []
    try {
      // get activities with status = OPENED
      var activities = await Activity.query()
        .select('id', 'registration_end')
        .where({ is_published: 1 })

      activities = activities.toJSON()
      if (activities[0] != undefined) {
        // get the slugs of OPENED activities that should be closed on current date
        activities.forEach((element) => {
          var registerEndDate = Date.parse(element.register_end_date)
          var todayDate = new Date().setHours(0, 0, 0, 0)

          if (todayDate > registerEndDate) {
            slugContainers.push(element.slug)
          }
        })

        // update the status as CLOSED
        for (let i = 0; i < slugContainers.length; i++) {
          await Activity.query().where('slug', slugContainers[i]).update({ status: 'CLOSED' })
        }
      }
    } catch (error) {
      console.log(error.message)
    }
  }
}
