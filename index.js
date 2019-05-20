const expressEdge = require('express-edge');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');



const createPostController = require('./controllers/createPost');
const homePageController = require('./controllers/homePage');
const storePostController = require('./controllers/storePost');
const getPostController = require('./controllers/getPost');
const aboutMeController = require('./controllers/aboutMe');



const app = new express();


//MongoDB Local DB Connection
//mongoose.connect('mongodb://localhost/blog',{ useNewUrlParser: true });
//MondoDB+Server Cloud Atlas Connection
mongoose.connect('mongodb+srv://bjfabian11:Bj11mongodb!@yodakod-4ntpf.azure.mongodb.net/test?retryWrites=true',{ useNewUrlParser: true});



app.use(fileUpload());
app.use(express.static('public'));
app.use(expressEdge);



app.set('views', `${__dirname}/views`);



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));



const storePost = require('./middleware/storePost');
app.use('/posts/store', storePost);



app.get('/', homePageController);
app.get('/about', aboutMeController);
app.get('/post/:id', getPostController);
app.get('/posts/new', createPostController);
app.post('/posts/store', storePostController);
app.use((req, res)=> res.render('not-found'));



app.listen(3000, () => {
	console.log("app is listening on port 3000");	
});