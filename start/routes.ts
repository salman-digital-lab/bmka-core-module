import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'
const ProfilesController = () => import('#controllers/profiles_controller')
const ActivitiesController = () => import('#controllers/activities_controller')
const ActivityRegistrationsController = () =>
  import('#controllers/activity_registrations_controller')
const AuthController = () => import('#controllers/auth_controller')

router.get('/', () => {
  return 'Hello world from the home page.'
})

router
  .group(() => {
    router
      .group(() => {
        router.post('register', [AuthController, 'register'])
        router.post('login', [AuthController, 'login'])
        router.post('logout', [AuthController, 'logout']).use(middleware.auth())
      })
      .prefix('auth')

    router
      .group(() => {
        router.put('/:id', [ProfilesController, 'update'])
        router.get('/:id', [ProfilesController, 'show'])
        router.get('', [ProfilesController, 'index'])
      })
      .prefix('profiles')
      .use(middleware.auth())

    router
      .group(() => {
        router.put('/:id', [ActivitiesController, 'update'])
        router.get('/:id', [ActivitiesController, 'show'])
        router.get('', [ActivitiesController, 'index'])
        router.post('', [ActivitiesController, 'store'])
        router.put('images', [ActivitiesController, 'uploadImage'])
        router.put('delete-image', [ActivitiesController, 'deleteImage'])
      })
      .prefix('activities')
      .use(middleware.auth())

    router
      .group(() => {
        router.put('/:id', [ActivityRegistrationsController, 'updateStatus'])
        router.get('/:id', [ActivityRegistrationsController, 'show'])
        router.get('', [ActivityRegistrationsController, 'index'])
        router.get('export/:id', [ActivityRegistrationsController, 'export'])
      })
      .prefix('activity-registrations')
      .use(middleware.auth())
  })
  .prefix('v2')
