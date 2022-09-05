import { Router } from "express";
import { TipoPropietarioController } from "../controller/TipoPropietarioController";


const router = Router();

router.post('/',TipoPropietarioController.new);
router.get('/',TipoPropietarioController.getTipos);

export default router;