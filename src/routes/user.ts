import { Router } from "express";
import { UserController } from "../controller/UserController";

//Relaciona al modelo User con su controlador correspondiente (User Controller)
//se definen las subrutas
const router= Router();

router.post('/',UserController.newUser);
router.get('/',UserController.getUsers);
router.get('/:id',UserController.getbyId);
router.delete('/:id',UserController.delete);
router.patch('/:id',UserController.update);

export default router;