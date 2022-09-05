import { Router } from "express";
import { UserController } from "../controller/UserController";
import { checkJwt } from "../middlerware/jwt";

//Relaciona al modelo User con su controlador correspondiente (User Controller)
//se definen las subrutas
const router= Router();


//router.post('/',[checkJwt],UserController.newUser);
router.post('/',UserController.newUser);
router.get('/',UserController.getUsers);
router.get('/:id',UserController.getbyId);
router.get('/username/:username',UserController.getbyUsername);
router.delete('/:id',UserController.delete);
router.patch('/:id',UserController.update);

export default router;