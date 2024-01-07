import * as services from "../services"
import { internalServerError, badRequest } from "../middleware/handle_errors"

export const insertData = async (req, res) => {
    try {
        const response = await services.insertData()
        return res.status(200).json(response)
    } catch (error) {
        return internalServerError(res)
    }
}