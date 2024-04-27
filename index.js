import 'dotenv/config'
import express from 'express'
import router from './routes/image.router.js';
import { engine } from 'express-handlebars';

export const app = express()

const __dirname = import.meta.dirname

app.engine('.hbs', engine({ extname: '.hbs' }));
app.set('view engine', '.hbs');
app.set('views', __dirname + '/views');

app.use(express.urlencoded({ extended: true }))

// middleware archivos estáticos
app.use(express.static(__dirname + '/public'))
app.use('/assets/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'))
app.use('/assets/js', express.static(__dirname + '/node_modules/bootstrap/dist/js'))

app.use('/', router)


const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log('FUNCIONANDO SERVIDOR...', PORT)
})