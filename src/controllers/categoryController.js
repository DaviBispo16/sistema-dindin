const knex = require('../database/connection')

module.exports = {
    listCategories: async (req, res) => {
        try {
            const categories = await knex('categorias');
            return res.status(200).json(categories);
        } catch (error) {
            return res.status(500).json({ mensagem: `${error}` })
        }
    }
}
