import { Request, Response } from "express"
import { Like } from "typeorm"
import { AppDataSource } from "../data-source"
import { Multa } from "../entity/Multa"

export class MultaController{

    static getAllByPatente = async (req: Request, res: Response) =>{
            
        const {patente} = req.params
        const multasRepository = AppDataSource.getRepository(Multa)
    
        try {
            const multas = await multasRepository.findBy({
                vehiculo: Like(`%${patente}}%`)
            })
            res.send(multas)
        } catch (error) {
            res.status(404).json({
                message: "Error al traer las multas",
                error: error.message
            })
        }
       

}
}