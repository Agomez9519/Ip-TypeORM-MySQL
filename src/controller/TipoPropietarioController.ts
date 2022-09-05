import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { TipoPropietario } from "../entity/TipoPropietario";

export class TipoPropietarioController{

    static new = async (req:Request, res:Response)=>{
        const {descripcion}=req.body;
        const tipoPropietario = new TipoPropietario()
        tipoPropietario.descripcion = descripcion;


        const tipoVehiculoRepository = AppDataSource.getRepository(TipoPropietario);

        try {
            await tipoVehiculoRepository.save(tipoPropietario);
        } catch (e) {
            return res.status(409).json({
                message: "El tipo de propietario ya existe"
            })
        }
        res.send('Tipo de propietario creado');
        
    }

    static getTipos = async (req:Request, res:Response)=>{
        
                //se instancia la clase repository anexandola con la clase Entity User
            const userRepository = AppDataSource.getRepository(TipoPropietario)
            let types;
            try {
                types = await userRepository.find()
            } catch (error) {
                res.status(500).json({
                message: "Error al traer los tipos de propietarios",
                error: error.message
            })
           }

            if (types.length > 0) {
                return res.send(types)
            }else{
                return res.status(404).json({
                    message: "No hay tipos de propietarios"
                })
            }
    }

}