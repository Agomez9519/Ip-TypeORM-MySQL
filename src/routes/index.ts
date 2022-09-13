import { Router } from "express";
import AuthController from "../controller/AuthController";
import user from "./user";
import auth from "./auth";
import tipovehiculo from "./tipovehiculo";
import tipopropietario from "./tipopropietario";
import vehiculo from "./vehiculo";
import multa from "./multa";
import propietario from "./propietario";

//Se definen los endpoints por donde se haran las consultas
//se definen las rutas principales
const routes = Router();

routes.use('/user',user)
routes.use('/auth',auth)
routes.use('/tipovehiculo',tipovehiculo)
routes.use('/tipopropietario',tipopropietario);
routes.use('/vehiculo',vehiculo)
routes.use('/multaxpatente',multa)
routes.use('/propietario',propietario);

export default routes;