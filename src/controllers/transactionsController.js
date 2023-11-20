const knex = require("../database/connection");
const { parseISO, isValid } = require("date-fns");

module.exports = {
    listTransactions: async (req, res) => {
        const { id } = req.usuario;
        try {
            const transactions = await knex('transacoes').where('usuario_id', id).orderBy('id', 'asc');
            return res.status(200).json(transactions);
        } catch (error) {
            res.status(500).json({ mensagem: `${error}` });
        }
    },

    registerTransactions: async (req, res) => {
        const { tipo, descricao, valor, data, categoria_id } = req.body;
        const { id } = req.usuario;
        try {
            const dataValida = parseISO(data)
            if (!isValid(dataValida)) {
                return res.status(400).json({ mensagem: "A data informada não é válida" });
            }
            const category = await knex('categorias').where('id', categoria_id);
            if (category < 1) {
                return res.status(404).json({ mensagem: "A categoria informada não existe." })
            }
            const transaction = await knex('transacoes').insert({ tipo, descricao, valor, data: dataValida, usuario_id: id, categoria_id }).returning('*');
            const result = { ...transaction[0], categoria_nome: category[0].descricao }
            return res.status(201).json(result);
        } catch (error) {
            return res.status(500).json({ mensagem: `${error}` });
        }
    },

    getExtract: async (req, res) => {
        const { id } = req.usuario;
        try {
            const enter = await knex('transacoes').sum('valor').where({ tipo: 'entrada', usuario_id: id });
            const exit = await knex('transacoes').sum('valor').where({ tipo: 'saida', usuario_id: id });
            const result = { entrada: Number(enter[0].sum ?? 0), saida: Number(exit[0].sum ?? 0) }
            return res.status(200).json(result);
        } catch (error) {
            return res.status(500).json({ mensagem: `${error}` })
        }
    },

    detailTransactions: async (req, res) => {
        const { id } = req.usuario;
        const identificador = Number(req.params.id);
        try {
            const transaction = await knex('transacoes').where({ id: identificador, usuario_id: id });
            if (transaction < 1) {
                return res.status(404).json({ mensagem: 'Transação não encontrada.' })
            }
            const category = await knex('categorias').where({ id: transaction[0].categoria_id });
            const result = {
                id: transaction[0].id,
                tipo: transaction[0].tipo,
                descricao: transaction[0].descricao,
                valor: transaction[0].valor,
                data: transaction[0].data,
                usuario_id: transaction[0].usuario_id,
                categoria_id: transaction[0].categoria_id,
                categoria_nome: category[0].descricao
            }
            return res.status(200).json(result)
        } catch (error) {
            return res.status(500).json({ mensagem: `${error}` });
        }
    },

    updateTransactions: async (req, res) => {
        const { id } = req.usuario
        const identificador = Number(req.params.id);
        const { descricao, valor, data, categoria_id, tipo } = req.body;
        try {
            const dataValida = parseISO(data)
            if (!isValid(dataValida)) {
                return res.status(400).json({ mensagem: "A data informada não é válida" });
            }
            const transaction = await knex('transacoes').where({ id: identificador, usuario_id: id });
            if (transaction < 1) {
                return res.status(404).json({ mensagem: " Não existe transação para o id enviado como parâmetro na rota ou esta transação não pertence ao usuário logado." });
            }
            const category = await knex('categorias').where({ id: categoria_id });
            if (category < 1) {
                return res.status(404).json({ mensagem: "Não existe categoria para o categoria_id enviado no corpo (body) da requisição" })
            }
            const update = await knex('transacoes').update({ descricao, valor, data: dataValida, categoria_id, tipo }).where({ id: identificador });
            return res.status(204).send();
        } catch (error) {
            res.status(500).json({ mensagem: `${error}` })
        }
    },

    deleteTransactions: async (req, res) => {
        const { id } = req.usuario;
        const identificador = Number(req.params.id);
        try {
            const transaction = await knex('transacoes').where({ id: identificador, usuario_id: id });
            if (transaction < 1) {
                return res.status(404).json({ mensagem: "Transação não encontrada" });
            }
            const drop = await knex('transacoes').del().where({ id: identificador });
            return res.status(204).send();
        } catch (error) {
            return res.status(500).json({ mensagem: `${error}` })
        }
    }
}
