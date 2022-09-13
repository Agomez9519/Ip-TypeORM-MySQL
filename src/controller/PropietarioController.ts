import { Request, Response } from "express"
import { AppDataSource } from "../data-source"
import { Propietario } from "../entity/Propietario"
import { Vehiculo } from "../entity/Vehiculo"

export class PropietarioController{

    static getByRut = async (req: Request, res: Response) =>{
            
        const {rut} = req.params
        const vehiculoRepository = AppDataSource.getRepository(Propietario)
    
        try {
            const propietario = await vehiculoRepository.findOneByOrFail({rut: String(rut)})
            res.send(propietario)
        } catch (error) {
            res.status(404).json({
                message: "Error al traer los datos del propietario",
                error: error.message
            })
        }
       

}

static getAllCarsByRut = async (req: Request, res: Response) =>{
            
    const {rut} = req.params
    const vehiculosRepository = AppDataSource.getRepository(Vehiculo)

    try {
        const vehiculos = await vehiculosRepository.find({   
            where: {
                propietario: {
                    rut: `${rut}`
                },
            },
        })
        res.send(vehiculos)
    } catch (error) {
        res.status(404).json({
            message: "Error al traer los vehiculos del propietario",
            error: error.message
        })
    }
   

}


}

