const expressEdge = require('express-edge');
const express = require('express');
const edge = require("edge.js");
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const expressSession = require('express-session');
const connectMongo = require('connect-mongo');
const connectFlash = require('connect-flash');

const createPostController = require('./controllers/createPost');
const createUserprofileController = require('./controllers/createUserprofile');
const feedController = require('./controllers/feed');
const storePostController = require('./controllers/storePost');
const storeUserprofileController = require('./controllers/storeUserprofile');
const getPostController = require('./controllers/getPost');
const welcomeController = require('./controllers/welcome');
const profileController = require('./controllers/profile');
const createUserController = require('./controllers/createUser');
const storeUserController = require('./controllers/storeUser');
const loginController = require('./controllers/login');
const loginUserController = require('./controllers/loginUser');
const logoutController = require("./controllers/logout");



const app = new express();

mongoose.set('useCreateIndex', true);
//MongoDB Local DB Connection
// mongoose.connect('mongodb://localhost/blog',{ useNewUrlParser: true })
//MondoDB+Server Cloud Atlas Connection
mongoose.connect('mongodb+srv://bjfabian11:Bj11mongodb!@yodakod-4ntpf.azure.mongodb.net/test?retryWrites=true',{ useUnifiedTopology: true, useNewUrlParser: true})
	.then(() => console.log('You are now connected to Mongo!'))
	.catch(err => console.error('Something went wrong', err));

app.use(connectFlash());	

const mongoStore = connectMongo(expressSession);

app.use(expressSession({
	secret: 'secret',
	resave: true,
	saveUninitialized: true,
	store: new mongoStore({
		mongooseConnection: mongoose.connection

	})
}));

app.use(fileUpload());
app.use(express.static('public'));
app.use(expressEdge);
app.set('views', `${__dirname}/views`);

app.use('*', (req, res, next) => {
    edge.global('auth', req.session.userId)
    next()
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

const storeUserprofile = require('./middleware/storeUserprofile');
const storePost = require('./middleware/storePost');
const auth = require("./middleware/auth");
const redirectIfAuthenticated = require('./middleware/redirectIfAuthenticated')
const logoutClearcache = require("./middleware/logoutClearcache");

app.use('/posts/store', storePost);
app.use('/userprofile/store', storeUserprofile);

app.get('/feed', auth, logoutClearcache, feedController);
app.get('/', redirectIfAuthenticated, welcomeController);
app.get('/profile', auth, logoutClearcache, profileController);
app.get('/post/:id', auth, getPostController);
app.get('/posts/new', auth, logoutClearcache, createPostController);
app.get('/userprofile/new', auth, logoutClearcache, createUserprofileController);
app.post('/posts/store', auth, storePost, storePostController);
app.post('/userprofile/store', auth, storeUserprofile, storeUserprofileController);
app.get('/auth/login', redirectIfAuthenticated, loginController);
app.post('/users/login', redirectIfAuthenticated, loginUserController);
app.get('/auth/register', redirectIfAuthenticated, createUserController);
app.post('/users/register', redirectIfAuthenticated, storeUserController);
app.get("/auth/logout", logoutController);
app.use((req, res)=> res.render('not-found'));

app.listen(process.env.PORT || 5500, () => {
	console.log("app is listening on port 3000");	
});