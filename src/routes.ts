import { Router } from 'express'
import adminController from './controller/adminController'

const route = Router()

route.get('/', adminController.getAll)
route.post('/register', adminController.register)
route.delete('/delete', adminController.deleteAll)

export default route
