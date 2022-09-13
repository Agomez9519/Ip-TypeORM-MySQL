import {Request, response, Response } from "express"
import { User } from "../entity/User"
import { AppDataSource } from "../data-source"
import { validate } from "class-validator"
import { request } from "http"
import { stringify } from "querystring"
import * as jwt from "jsonwebtoken";
import config from "../config/config";

export class UserController {

   static newUser = async (req: Request, res: Response) =>{
    /* codigo de prueba 
    res.status(200).json({message: "New user"})
    */

    //se define una constante con los 3 valores recibidos por el request
    const {username, password, role} = req.body
    
    //instancia una clase del de la entidad User
    const user = new User();

    //Se almacenan los valores recibidos por el request a la instancia user 
    user.username= username;
    user.password= password;
    user.role = role;


    //importamos la clase ValidationOptions para usarla como parametro en el await validate
    const validationOptions = {
        validationError: {target: false, value: false},
    }

    //definimos una constante que almacena la respuesta al llamar al metodo validate,
    //reciviendo de parametros el usuario
    //y la clase validationOptions, si es mayor a 0, el request viene con errores
    const errors = await validate(user, validationOptions)
    if (errors.length > 0) {
        return res.status(400).send(errors)
    }

    //creamos una constante que identidicara el repositorio con la clase user 
    //(repository trae metodos DAO)
    const userRepository = AppDataSource.getRepository(User)

    try {
        //Antes de guardar el usuario, encriptamos su Pass
        user.hasPassword();
        await userRepository.save(user)
    } catch (error) {
        return res.status(500).json({
            message: "Error al crear el usuario",
            error: error.message
    })
    }
    const token = jwt.sign(
        {username:username},
        config.jwtSecret,{expiresIn:'1h'}           
        
    )

    return res.status(201).json({
        message: "Usuario Creado",
        token
    })    



   }

   static getUsers = async (req: Request, res: Response) =>{

    //se instancia la clase repository anexandola con la clase Entity User
    const userRepository = AppDataSource.getRepository(User)
    let users;
    try {
        users = await userRepository.find()
    } catch (error) {
        res.status(500).json({
        message: "Error al traer los usuarios",
        error: error.message
    })
   }

   if (users.length > 0) {
    return res.send(users)
   }else{
    return res.status(404).json({
        message: "No hay usuarios"
    })
   }

   }

   static getbyUsername = async (req: Request, res: Response) =>{
    const {username} = req.params
    const userRepository = AppDataSource.getRepository(User)

    try {
        const user = await userRepository.findOneByOrFail({username: String(username)})
        res.send(user)
    } catch (error) {
        res.status(404).json({
            message: "Error al traer el usuario por username",
            error: error.message
        })
    }
   }

   static delete = async (req: Request, res: Response) => {
    const {username} = req.params;
    const userRepository = AppDataSource.getRepository(User)
    let user: User;

    try {
        user = await userRepository.findOneByOrFail({username: String(username)})
    }catch (error) {
        return res.status(404).json({
        message: "Error al traer el usuario",
        error: error.message
     })
    }

    try {
        await userRepository.delete(username);
        res.status(200).json({
            message:"Usuario Eliminado"
        })        
    } catch (error) {
        res.status(500).json({
            message: "Error al eliminar",
        })
    }
  
   }

   static update = async (req: Request, res: Response) => {

    //definimos una variable para recibir los parametros del request
    let user;

    //guardamos el id del usuario a actualizar que viene del request
    const {username2} = req.params;

    //generamos el cuerpo de request con los atributos de nuestra clase Entity
    const {username, password, role} = req.body;
    const userRepository = AppDataSource.getRepository(User)

    //Buscamos el usuario por su id, si lo encontramos cambiaremos los valores de sus atributos
    //del usuario por los ingresados en el request, si no lo encuentra genera un mensaje de error
    try {
        user = await userRepository.findOneByOrFail ({username: String(username2)})
        user.username = username;
        user.password = password;
        user.role = role;
   }catch(error){
        return res.status(404).json({
            message:"Usuario no encontrado",
            error: error.message
        })
   }


   //definimos las constantes para validar 
   const validationOpt = {validationError: {target:false, value:false}}
   const errors = await validate(user, validationOpt)
   
   //validamos si viene con error
   if (errors.length > 0) {
      return res.status(400).send(errors)
    }

    //realizamos la actualizacion, si sale mal, envia un error
    try {
        await userRepository.save(user)
    } catch (error) {
        res.status(500).json({
            message: "Error al eliminar",
            error: error.message
        })
    }

    //si todo resulta bien, se envia un mensaje de aprobacion
    return res.status(204).json({
        message:"Usuario actualizado"
    })
}

}