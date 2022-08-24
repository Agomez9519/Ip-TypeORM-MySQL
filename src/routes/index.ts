import { Router } from "express";
import user from "./user";

//Se definen los endpoints por donde se haran las consultas
//se definen las rutas principales
const routes = Router();

routes.use('/user',user)

export default routes;