import { Router } from "express";
import AuthController from "../controller/AuthController";

const routes = Router();

//definimos la ruta en la cual se hara la validacion mediante post y un json con username y pass
routes.post('/login',AuthController.login);

export default routes;
