import router from '@adonisjs/core/services/router'
const ProfilesController = () => import('#controllers/profiles_controller')

router
  .group(() => {
    router.put('/:id', [ProfilesController, 'update'])
    router.get('/:id', [ProfilesController, 'show'])
    router.get('', [ProfilesController, 'index'])
  })
  .prefix('/v2/profiles')
