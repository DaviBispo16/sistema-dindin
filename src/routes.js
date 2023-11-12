const route = require("express").Router();
const userController = require("./controllers/userController");
const middlewareAuthentication = require("./middlewares/authentication");
const transactionsController = require("./controllers/transactionsController");
const categoryController = require("./controllers/categoryController")
const middlewareValidations = require("./middlewares/validations")

route.post('/usuario', middlewareValidations.validationRegisterUser, userController.registerUser);
route.post('/login', middlewareValidations.validationLoginUser, userController.loginUser);
route.use(middlewareAuthentication.tokenValidation);
route.get('/usuario', userController.detailUser);
route.put('/usuario', middlewareValidations.validationRegisterUser, userController.updateUser);
route.get('/categoria', categoryController.listCategories);
route.get('/transacao', transactionsController.listTransactions);
route.get('/transacao/extrato', transactionsController.getExtract);
route.get('/transacao/:id', transactionsController.detailTransactions);
route.post('/transacao', middlewareValidations.validationRegisterTransactions, transactionsController.registerTransactions);
route.put('/transacao/:id', middlewareValidations.validationUpdateTransactions, transactionsController.updateTransactions);
route.delete('/transacao/:id', transactionsController.deleteTransactions);

module.exports = route;