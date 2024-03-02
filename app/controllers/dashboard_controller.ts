import { HttpContext } from '@adonisjs/core/http'
import db from '@adonisjs/lucid/services/db'

export default class DasbordAdminController {
  async CountProfiles({ response }: HttpContext) {
    try {
      const profiles = await db.from('profiles').count('id as profile_amounts').groupBy('level')
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
  /*async CountMembers({ response }: HttpContext) {
    let countMembers = await db.rawQuery(
      `SELECT 
        COUNT(id) AS Akun,
        SUM(CASE WHEN is_graduated = 1 then 1 else 0 end) AS Alumni,
        SUM(CASE WHEN ssc >= ${MINIMUM_SPECTRA_GENERATION} then 1 else 0 end) AS "Alumni SSC",
        SUM(CASE WHEN lmd >= ${MINIMUM_LMD_GENERATION} then 1 else 0 end) AS "Alumni LMD",
        SUM(CASE WHEN spectra is not null then 1 else 0 end) AS "Alumni Spectra"
      FROM members`
    )

    countMembers = countMembers[0][0]

    const members = (
      await db.rawQuery(
        `SELECT member_roles.name, COUNT(member_roles.name) AS total FROM member_roles INNER JOIN members on member_roles.id = members.role_id GROUP BY member_roles.name ORDER BY member_roles.index`
      )
    )[0].filter((role) => {
      return role.name.toLowerCase() !== 'alumni'
    })

    Object.keys(countMembers).forEach((key) => {
      members.push({
        name: key,
        total: countMembers[key],
      })
    })

    return response.ok({
      messages: 'GET_DATA_SUCCESS',
      data: members,
    })
  }*/

  async CountUsersGender({ response }: HttpContext) {
    const countGender = await db.rawQuery(
      `SELECT gender, COUNT(gender) AS jumlah FROM profiles GROUP BY gender`
    )
    return response.ok({
      messages: 'GET_DATA_SUCCESS',
      data: countGender[0],
    })
  }
}
