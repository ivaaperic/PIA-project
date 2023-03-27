import express from 'express';
import cors from 'cors'
import mongoose from 'mongoose'
import userRouter from './routers/user.router';
import knjigaRouter from './routers/knjiga.router';
import zaduzenaKnjigaRuter from './routers/zaduzenaKnjiga.router';
import komentarRuter from './routers/komentar.routes';
import ocenaRuter from './routers/ocena.routes';
//import newsRouter from './routers/news.routes';

const app = express();
app.use(cors())
//app.use(express.json())
app.use(express.json({limit: '50mb'}));


mongoose.connect('mongodb://localhost:27017/iva')
const connection=mongoose.connection
connection.once('open',() => {console.log('db connected')})

const router=express.Router();
router.use('/user',userRouter)
router.use('/book',knjigaRouter)
router.use('/zaduzene',zaduzenaKnjigaRuter)
router.use('/komentari',komentarRuter)
router.use('/ocene',ocenaRuter)
//router.use('/news',newsRouter)

app.use('/',router)
app.listen(4000, () => console.log(`Express server running on port 4000`));