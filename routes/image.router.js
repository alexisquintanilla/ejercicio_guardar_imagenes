import { Router } from "express"
import { imageController } from "../controllers/image.controller.js";

const router = Router()

router.post('/image', imageController.guardarImagen)

router.get('/', imageController.getInicio)

router.get('/email/send', imageController.sendEmail)

export default router;