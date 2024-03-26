import express from 'express';
import { studentController, studentdetailsController } from '../controllers/studentController.js';

const route = express.Router()

route.get('/', studentController)

route.get('/details', studentdetailsController)

export default route