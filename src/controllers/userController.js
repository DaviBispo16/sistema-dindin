const knex = require("../database/connection");
const bcrypt = require('bcrypt');
require("dotenv").config

module.exports = {
    registerUser: async (req, res) => {
        const { nome, email, senha } = req.body
        try {
            const encryptedPassword = await bcrypt.hash(senha, 10)
            const emailValidation = await knex('usuarios').where({ email });
            if (emailValidation.length > 0) {
                return res.status(400).json({ mensagem: 'Já existe usuário cadastrado com o e-mail informado.' })
            }
            const record = await knex('usuarios').insert({ nome, email, senha: encryptedPassword }).returning(['id', 'nome', 'email']);
            return res.status(201).json(record[0]);
        } catch (error) {
            return res.status(500).json({ mensagem: `${error}` })
        }
    },

    obtainUser: async (req, res) => {
        const { id } = req.usuario;
        try {
            const user = await knex('usuarios').where({ id });
            if (user.length < 1) {
                return res.status(404).json({ mensagem: 'Usuario não encontrado' })
            }
            const { senha, ...usuario } = user[0];
            return res.status(200).json(usuario)
        } catch (error) {
            return res.status(500).json({ mensagem: `${error}` })
        }
    },

    updateUser: async (req, res) => {
        const { nome, email, senha } = req.body
        const { id } = req.usuario;
        try {
            const encryptedPassword = await bcrypt.hash(senha, 10)
            const emailValidation = await knex('usuarios').where({ email });
            if (emailValidation.length < 1) {
                const record = await knex('usuarios').update({ nome, email, senha: encryptedPassword }).where({ id }).returning(['id', 'nome', 'email']);
                return res.status(204).json();
            }
            return res.status(400).json({ mensagem: 'O email informado já estar sendo utilizado por outro usuário' });
        } catch (error) {
            return res.status(500).json({ mensagem: `${error}` })
        }
    }
}