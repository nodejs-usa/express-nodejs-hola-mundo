const express = require('express');
const morgan = require('morgan')
const app = express();

// Settings
app.set('appName','Marlon Node')
app.set('port', 3000)
app.set('view engine', 'ejs')

// Middleware
function logger(req, res, next) {
    console.log('Request recived');
    next();
}
app.use(express.json());
app.use(morgan('dev'));
app.use(logger);



// Routes
app.get('/', (req, res)=>{
    const data = [{ name: 'john' }, { name: 'joe' }, { name: 'cameron' }]
    res.render('index.ejs', {people: data});
});

app.use(express.static('public'));



app.get('/user', (req, res)=>{
    res.json({
        username: 'Cameron',
        lastname: 'Howe'
    })
});

app.post('/user:id', (req, res)=>{
    console.log(req.body);
    console.log(req.params)
    res.send('POST REQUEST RECEIVED');
});

app.get('/about', (req, res)=>{
    res.send('About me')
});

app.get('/contact', (req, res)=>{
    res.send('Contact')
});

app.get('/test', (req, res)=>{
    res.send('<h1>Test</h1>')
});

app.listen(app.get('port'), ()=>{
    console.log(app.get('appName'));
    console.log('Server on port: ' + app.get('port'));
})