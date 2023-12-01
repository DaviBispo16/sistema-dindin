const route = require("express").Router();
const user = require("./controllers/userController");
const login = require('./controllers/loginController');
const authenticationJWT = require("./middlewares/authenticationJWT");
const transaction = require("./controllers/transactionsController");
const category = require("./controllers/categoryController");
const requestValidations = require('./middlewares/requestsValidations');
const { schemaUser, schemaLogin, schemaTransactions } = require('./schema/squema');

route.post('/usuario', requestValidations(schemaUser), user.registerUser);
route.post('/login', requestValidations(schemaLogin), login.loginUser);
route.use(authenticationJWT.tokenValidation);
route.get('/usuario', user.obtainUser);
route.put('/usuario', requestValidations(schemaUser), user.updateUser);
route.get('/categoria', category.listCategories);
route.get('/transacao', transaction.listTransactions);
route.get('/transacao/extrato', transaction.getExtract);
route.get('/transacao/:id', transaction.obtainTransactions);
route.post('/transacao', requestValidations(schemaTransactions), transaction.registerTransactions);
route.put('/transacao/:id', requestValidations(schemaTransactions), transaction.updateTransactions);
route.delete('/transacao/:id', transaction.deleteTransactions);

module.exports = route;