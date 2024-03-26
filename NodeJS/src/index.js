//-----------------------------------#5-----------------------------------
// const http = require('http')

// const requestListen = (req, res) => {
//     console.log('res', res)
//     console.log('req', req)
//     res.end('hello world')
// }

// const server = http.createServer(requestListen)
// console.log('http', http)
// const port = 3000

// server.listen(port, (err) => {
//     if(err){
//         console.log('Server is err', err)
//     } else{
//         console.log('Server is running', port)
//     }
// })

//-----------------------------------#6-----------------------------------
// const express = require('express')

// const app = express()

// const port = 3000

// //get: yeu cau lay du lieu
// //post: tao moi hoac du lieu
// //put: update du lieu, muon update thi phai truyen day du cac field cua bang, neu khong truyen thi se la undefinded
// //patch: update du lieu, muon update field nao thi chi can truyen field do
// //delete: xoa du lieu
// app.get('/', (req, res) => {
//     res.send('hello world')
// })

// app.get('/user', (req, res) => {
//     res.send('hello world user')
// })

// app.get('/user:id', (req, res) => {
//     res.send('hello world user')
// })

// app.listen(port, () => {
//     console.log('Server is running port', port)
// })


//-----------------------------------#7-----------------------------------
// import express from 'express';
// import { engine } from 'express-handlebars';

// const port = 3000
// const app = express()

// //goi duong dan src/public
// app.use(express.static('src/public'))

// // app.engine('handlebars', engine());
// // app.set('view engine', 'handlebars');
// // rename file name from .handlebars to .hbs
// app.engine('.hbs', engine({extname: '.hbs'}));
// app.set('view engine', '.hbs');
// app.set('views', './src/views');

// app.get('/', (req, res) => {
//     // res.send('hello world')
//     // res.render('home', {layout: false});// khong su dung layout template (main.handlebar)
//     res.render('home', 
//     {
//         showTitle: true,
//         helpers: {
//             mess() {return 'LAP TRINH THAT DE';},
//             noti() {return 'ERROR';}
//         }
//     });//showTitle la bien ben trang Home, dung de an hien Title
// })

// app.listen(port, () => {
//     console.log('Server is running port', port)
// })

//-----------------------------------#10-----------------------------------
import express from 'express';
import { engine } from 'express-handlebars';
import routes from './routes/index.js'
import mongoose from 'mongoose';
import * as dotenv from 'dotenv'
dotenv.config()

const port = process.env.PORT
const app = express()

//goi duong dan src/public
app.use(express.static('src/public'))
app.use(express.json())

// app.engine('handlebars', engine());
// app.set('view engine', 'handlebars');
// rename file name from .handlebars to .hbs
app.engine('.hbs', engine({extname: '.hbs'}));
app.set('view engine', '.hbs');
app.set('views', './src/views');

// console.log('dotenv', process.env.MONGO_DB)

mongoose.connect(process.env.MONGO_DB)
.then(() => {
    console.log('Connected DB success')
})
.catch((err) => {
    console.log(err)
})

routes(app)

app.listen(port, () => {
    console.log('Server is running port', port)
})