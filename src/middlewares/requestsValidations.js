const requestValidations = joiSchema => async (req, res, next) => {
    try {
        const value = await joiSchema.validateAsync(req.body);
        next();
    } catch (error) {
        return res.status(500).json({ mensagem: error.message });
    }
}

module.exports = requestValidations;
