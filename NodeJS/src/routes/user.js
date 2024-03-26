import express from 'express';
import { userController, userdetailsController, createUserController
        , loginUserController, searchUserController, updateUserController
        , deleteUserController, getAllUserController, deleteManyUserController
        , deleteAllUserController, refreshTokenUserController } from '../controllers/userController.js';
import authMiddleware from '../middleware/authMiddleware.js'        

const route = express.Router()

route.get('/', userController)
route.get('/getall', authMiddleware, getAllUserController)
route.get('/search', searchUserController)
route.get('/:id', userdetailsController)

route.post('/', createUserController)
route.post('/login', loginUserController)
route.post('/refreshToken', refreshTokenUserController)

route.patch('/update/:id', updateUserController)

route.delete('/delete/:id', deleteUserController)
route.delete('/deleteMany', deleteManyUserController)
route.delete('/deleteAll', deleteAllUserController)

export default route