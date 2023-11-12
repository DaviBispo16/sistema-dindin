const pool = require("../database/connection");

module.exports = {
    listCategories: async (req, res) => {
        try {
            const { rows } = await pool.query('select * from categorias');
            return res.status(200).json(rows);
        } catch (error) {
            return res.status(500).json({ mensagem: `${error}` })
        }
    }
}
