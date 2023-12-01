const knex = require('../database/connection');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = {
    loginUser: async (req, res) => {
        const { email, senha } = req.body
        try {
            const emailValidation = await knex('usuarios').where({ email });
            if (emailValidation.length < 1) {
                return res.status(400).json({ mensagem: 'Email e/ou senha inválido(s).' })
            }
            const { senha: userPassword, ...usuario } = emailValidation[0];
            const passwordValidation = await bcrypt.compare(senha, userPassword);
            if (!passwordValidation) {
                return res.status(400).json({ mensagem: 'Email e/ou senha inválido(s).' })
            }
            const token = jwt.sign({ id: usuario.id }, process.env.PASSWORDJWT, { expiresIn: '8h' });
            return res.json({ usuario, token });
        } catch (error) {
            return res.status(500).json({ mensagem: error.message })
        }
    }
}