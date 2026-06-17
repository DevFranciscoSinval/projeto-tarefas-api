const authService = require('../services/authService');

const register = async (req, res, next) => {
    try{
        const user = await authService.register(req.body);
        return res.status(201).json({
            message: 'Usuário criado com sucesso',
            user
        });
    } catch (error) {
        next(error);
    }
};

const login = async (req, res, next) => {
    try {
        const result = await authService.login(req.body);
        return res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};

module.exports = { register, login };