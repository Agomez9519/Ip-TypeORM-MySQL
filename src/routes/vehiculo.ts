import { Router } from "express";
import { VehiculoController } from "../controller/VehiculoController";

const router = Router()

router.get('/:patente',VehiculoController.getByPatente )

export default router;