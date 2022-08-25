const express=require('express');
const http =require('http');
const path =require('path');
const app = express();
const cors =require('cors');
const {logger} = require('./middleware/logEvent')
const errorHandler = require('./middleware/errorHandler');
const PORT = process.env.PORT || 3500;

const whitelist=['https://www.w3schools.com','https://yoursite.com','http://127.0.0.1:5500','http://localhost:3500'];
const corsOptions ={
    origin: (origin, callback)=>{
        if(whitelist.indexOf(origin) !== -1){
            callback(null, true)
        }
        else{
            callback(new Error('Not Allow'));
        }
    },
    optionsSuccessStstus:200
}
 app.use(logger);

 app.use(cors());
// app.use((req, res, next)=>{
//     logEvents(`${req.method}\t${req.header.origin}\t${req.url}\t`, 'infor.text');
//     console.log(`${req.method}\t${req.path}`);
// });

app.use(express.urlencoded({extended: false}));

app.use(express.json());

// app.use(express.static(path.join(__dirname,'/public')));


// app.use('/subbir', require('./router/subdir'));
app.use('/',express.static(path.join(__dirname,'/public')));
app.use('/subbir',express.static(path.join(__dirname,'/public')));
app.use('/', require('./router/subdir'));
app.use('/subdir',require('./router/subdir'));
app.use('/info', require('./router/api/info'));

app.all('*',(req, res)=>{
    res.status(404);
    if(req.accepts('html')){
        res.sendFile(path.join(__dirname,'views','404.html'));
    }else if (req.accepts('json')){
        res.json({"error":"404 not foumd"});
    }else{
        res.type('txt').send("error");
    }
});
app.use(errorHandler);

app.listen(PORT,()=>console.log(`server port ${PORT}`));


