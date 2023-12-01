const joi = require('joi');

module.exports = {
    schemaUser: joi.object({
        nome: joi.string().required().messages({
            'any.required': 'O campo nome é obrigatório',
            'string.empty': 'O campo nome é obrigatório',
            'string.base': 'O campo nome deve ser do tipo string'
        }),
        email: joi.string().email().required().messages({
            'any.required': 'O campo email é obrigatório',
            'string.email': 'O email deve ser escrito na forma correta',
            'string.empty': "O campo email é obrigatório",
            'string.base': 'O campo email deve ser do tipo string'
        }),
        senha: joi.string().min(8).required().messages({
            'any.required': 'O campo senha é obrigatório',
            'string.min': 'A senha deve ter no mínimo 8 caracteres',
            'string.empty': 'O campo senha é obrigatório',
            'string.base': 'O campo senha deve ser do tipo string'
        })
    }),

    schemaLogin: joi.object({
        email: joi.string().required().messages({
            'any.required': 'O campo email é obrigatório',
            'string.empty': 'O campo email é obrigatório',
            'string.base': 'O campo email deve ser do tipo string'
        }),
        senha: joi.string().required().messages({
            'any.required': 'O campo senha é obrigatório',
            'string.empty': 'O campo senha é obrigatório',
            'string.base': 'O campo senha deve ser do tipo string'
        })
    }),

    schemaTransactions: joi.object({
        descricao: joi.string().required().messages({
            'any.required': 'O campo descrição é obrigatório',
            'string.base': 'O campo descricao deve ser do tipo string'
        }),
        valor: joi.number().positive().required().messages({
            'any.required': 'O campo valor é obrigatório',
            'number.positive': 'O valor deve ser positivo',
            'number.base': 'O campo valor deve ser number'
        }),
        data: joi.string().required().messages({
            'any.required': 'A data é obrigatória',
            'string.base': 'O campo data deve ser do tipo string'
        }),
        categoria_id: joi.number().required().messages({
            'any.required': 'O campo categoria_id é obrigatório',
            'number.base': 'O campo categoria_id deve ser do tipo string'
        }),
        tipo: joi.string().valid('entrada', 'saida').required().messages({
            'any.required': 'O campo tipo é obrigatório',
            'string.empty': 'O campo tipo é obrigatório',
            'any.only': 'O tipo deve corresponder a palavra entrada ou saida',
            'string.base': 'O campo tipo deve ser do tipo string'
        })
    })
}