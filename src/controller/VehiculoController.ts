import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Vehiculo } from "../entity/Vehiculo";

export class VehiculoController{

    static getByPatente = async (req: Request, res: Response) =>{
            
            const {patente} = req.params
            const vehiculoRepository = AppDataSource.getRepository(Vehiculo)
        
            try {
                //const vehiculo = await vehiculoRepository.findOneByOrFail({patente: String(patente)})
                const vehiculo = await vehiculoRepository.findOneOrFail({
                    relations: {
                        propietario: true,
                    },where: {
                            patente: `${patente}`
                        },
                       })
                res.send(vehiculo)
            } catch (error) {
                res.status(404).json({
                    message: "Error al traer los datos del vehiculo",
                    error: error.message
                })
            }
           

    }

}