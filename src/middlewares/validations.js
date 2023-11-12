module.exports = {
    validationRegisterUser: (req, res, next) => {
        const { nome, email, senha } = req.body;
        if (!nome) {
            return res.status(400).json({ mensagem: 'Campo nome está vazio' });
        }
        if (!email) {
            return res.status(400).json({ mensagem: 'Campo email está vazio' });
        }
        if (!senha) {
            return res.status(400).json({ mensagem: 'Campo senha está vazio' });
        }
        return next();
    },

    validationLoginUser: (req, res, next) => {
        const { email, senha } = req.body
        if (!email) {
            return res.status(400).json({ mensagem: 'Campo email esta vazio' })
        }
        if (!senha) {
            return res.status(400).json({ mensagem: 'Campo senha está vazio' })
        }
        return next();
    },

    validationRegisterTransactions: (req, res, next) => {
        const { tipo, descricao, valor, data } = req.body;
        if (!descricao || !valor || !data) {
            return res.status(400).json({ mensagem: "Todos os campos obrigatórios devem ser informados." });
        }
        if (tipo !== "entrada" && tipo !== "saida") {
            return res.status(400).json({ mensagem: "O tipo enviado no corpo (body) da requisição não corresponde a palavra entrada ou saida" });
        }
        return next();
    },

    validationUpdateTransactions: (req, res, next) => {
        const { descricao, valor, data, categoria_id, tipo } = req.body;
        if (!descricao || !valor || !data || !categoria_id || !tipo) {
            return res.status(400).json({ mensagem: "Todos os campo obrigatórios devem ser informados." })
        }
        if (tipo !== "entrada" && tipo !== "saida") {
            return res.status(400).json({ mensagem: "O tipo enviado no corpo (body) da requisição não corresponde a palavra entrada ou saida" })
        }
        return next();
    }
}
