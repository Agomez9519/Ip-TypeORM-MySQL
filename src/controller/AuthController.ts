import { Request, Response } from "express";
import { send } from "process";
import { AppDataSource } from "../data-source";
import { User } from "../entity/User";
import * as jwt from "jsonwebtoken";
import config from "../config/config";


class AuthController{

    static login= async (req:Request, res: Response) => {   

        //capturamos el username y el password desde el request body
        const {username,password} = req.body;
        
        //Validamos que ingresen las variables en el body del request y las mostramos por consola
        //console.log(username,password);

        //validamos que se ingresen el user y el password
        if ( !(username && password)) {
            return res.status(409).json({message:'User y Password son requeridos'})
        }

        //creamos la constante authRepo con el valor del repositorio de la entidad User
        const authRepo= AppDataSource.getRepository(User);
        let user:User;

        //usamos el metodo findOneOrFail del repositorio con la condicion de la variable username 
        //si lo encuentra enviara un mensaje advirtiendo que no encontro al usuario con ese nombre de usuario
        //si NO enviara un mensaje de error sss
        try {
            user = await authRepo.findOneOrFail({
                where:{
                    username
                }
            })
        } catch (error) {
            return res.status(452).json({
                message:'Usuario incorrecto'
            })
        }

        //validamos la pass desencriptandola, si es incorrecta mandamos el mensaje
        if (!user.checkPassword(password) ) {
            console.log(password)
            return res.status(452).json({                                
                message:'Contraseña incorrecta'
            }) 
        }

        //Importamos la clase del config, la cual trae el token que usaremos para entrar a los endpoints
        const token = jwt.sign(
            {userId:user.id,username},
            config.jwtSecret,{expiresIn:'1h'}           
            
        )

        //Si todo esta correcto, se envia la respuesta validando el login, enviamos tambien el token que
        //se le fue asignado
        return res.status(200).json({
            message:'Login',
            token
        })
    }

}

export default AuthController;
