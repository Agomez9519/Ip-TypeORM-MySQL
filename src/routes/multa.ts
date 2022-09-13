import { Router } from "express";
import { MultaController } from "../controller/MultaController";

const router = Router();

router.get('/:patente', MultaController.getAllByPatente);


export default router;