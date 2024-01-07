import * as services from "../services"
import { internalServerError, badRequest } from "../middleware/handle_errors"
import { email, password, refreshToken } from "../helpers/joi_schema"
import joi from "joi"

//Register
export const register = async (req, res) => {
    try {
        const { error } = joi.object({ email, password }).validate(req.body)
        if (error) return badRequest(error.details[0]?.message, res)
        // Biến response sẽ truy cập tới service để check DB và tìm hoặc tạo 1 user
        const response = await services.register(req.body)
        return res.status(200).json(response)
    } catch (error) {
        return internalServerError(res)
    }
}

//Login
export const login = async (req, res) => {
    try {
        // error check email và password có đúng với joi_schema
        const { error } = joi.object( {email, password }).validate(req.body)
        // Nếu 1 trong 2 sai thì sẽ trả ra lỗi cho bên phía client
        if (error) return badRequest(error.details[0]?.message, res)
        // response sẽ truy cập tới service để check DB
        
        const response = await services.login(req.body)
        return res.status(200).json(response)
    } catch (error) {
        return internalServerError(res)
    }
}

export const refreshTokenController = async (req, res) => {
    try {
        // error check email và password có đúng với joi_schema
        const { error } = joi.object({ refreshToken }).validate(req.body)
        // Nếu 1 trong 2 sai thì sẽ trả ra lỗi cho bên phía client
        if (error) return badRequest(error.details[0]?.message, res)
        // response sẽ truy cập tới service để check DB
        
        const response = await services.refreshToken(req.body.refreshToken)
        return res.status(200).json(response)
    } catch (error) {
        return internalServerError(res)
    }
}