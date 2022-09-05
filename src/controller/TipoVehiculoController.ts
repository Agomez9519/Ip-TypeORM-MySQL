import { Request, Response } from "express";
import { request } from "http";
import { AppDataSource } from "../data-source";
import { TipoVehiculo } from "../entity/TipoVehiculo";


export class TipoVehiculoController{

    static new= async (req:Request, res:Response)=>{
        const {descripcion}=req.body;
        const tipoVehiculo = new TipoVehiculo()
        tipoVehiculo.descripcion = descripcion;


        const tipoVehiculoRepository = AppDataSource.getRepository(TipoVehiculo);

        try {
            await tipoVehiculoRepository.save(tipoVehiculo);
        } catch (e) {
            return res.status(409).json({
                message: "El tipo de vehiculo ya existe"
            })
        }
        res.send('Tipo de vehiculo creado');
        
    }

}