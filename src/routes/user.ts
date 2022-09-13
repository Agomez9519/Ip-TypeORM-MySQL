import { Router } from "express";
import { UserController } from "../controller/UserController";
import { checkJwt } from "../middlerware/jwt";

//Relaciona al modelo User con su controlador correspondiente (User Controller)
//se definen las subrutas
const router= Router();


router.post('/',[checkJwt],UserController.newUser);
//  router.post('/',UserController.newUser);
router.get('/',[checkJwt],UserController.getUsers);
router.get('/username/:username',[checkJwt],UserController.getbyUsername);
router.delete('/:username',[checkJwt],UserController.delete);
router.patch('/:username',[checkJwt],UserController.update);

export default router;