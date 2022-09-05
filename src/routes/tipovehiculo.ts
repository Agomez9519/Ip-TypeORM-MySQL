import { Router } from "express";
import { TipoVehiculoController } from "../controller/TipoVehiculoController";


const router = Router();

router.post('/',TipoVehiculoController.new);

export default router;