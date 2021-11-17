import { Router } from 'express'
import adminController from './controller/adminController'

const route = Router()

route.get('/', adminController.getAll)
route.get('/auth-get', adminController.isAuthorized, adminController.getAll)
route.post('/register', adminController.register)
route.get('/login', adminController.Login)
route.delete('/delete', adminController.isAuthorized, adminController.deleteAll)

export default route
