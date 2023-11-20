const jwt = require('jsonwebtoken');
require("dotenv").config();
const knex = require("../database/connection");

module.exports = {
    tokenValidation: async (req, res, next) => {
        const { authorization } = req.headers;
        if (!authorization) {
            return res.status(401).json({ mensagem: 'Para acessar este recurso um token de autenticação válido deve ser enviado.' });
        }
        const token = authorization.split(' ')[1];
        try {
            const { id } = jwt.verify(token, process.env.PASSWORDJWT)
            const user = await knex('usuarios').where({ id });
            if (user < 1) {
                return res.status(404).json({ mensagem: 'Usuário não existe' });
            }
            const { senha: _, ...data } = user[0];
            req.usuario = data;
            return next();
        } catch (error) {
            return res.status(401).json({ mensagem: 'Para acessar este recurso um token de autenticação válido deve ser enviado.' });
        }
    }
}
