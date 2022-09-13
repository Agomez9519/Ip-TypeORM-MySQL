import { Router } from "express"
import { PropietarioController } from "../controller/PropietarioController";

const router= Router();

router.get('/:rut', PropietarioController.getByRut)
router.get('/allcars/:rut', PropietarioController.getAllCarsByRut)

export default router;
