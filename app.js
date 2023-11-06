const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors =require('cors');


const app = express();

const personelRouter = require('./app/api/v1/personel/router');
const pangkatRouter = require('./app/api/v1/pangkat/router');
const roleRouter = require('./app/api/v1/role/router');
const korpsRouter = require('./app/api/v1/korps/router');
const kotamaRouter = require('./app/api/v1/kotama/router');
const satminkalRouter = require('./app/api/v1/satminkal/router');
const imageRouter = require('./app/api/v1/image/router');
const statusPersRouter = require('./app/api/v1/status_pers/router');
const tamuRouter = require('./app/api/v1/tamu/router');
const userRouter = require('./app/api/v1/user/router');
const authRouter = require('./app/api/v1/auth/router');
const qrcodeRouter = require('./app/api/v1/qrcode/router');
const logRouter = require('./app/api/v1/log/router');

const v1 = '/api/v1/cms'

const notFoundMiddleware = require('./app/middlewares/not-found');
const errorHandlerMiddleware = require('./app/middlewares/handler-error');



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.get('/', (req,res) => {
    res.status(200).json({message: "Welcome To API db_secret"})
});

app.use(v1, pangkatRouter);
app.use(v1,roleRouter);
app.use(v1,korpsRouter);
app.use(v1,kotamaRouter);
app.use(v1,satminkalRouter);
app.use(v1,imageRouter);
app.use(v1,statusPersRouter);
app.use(v1, personelRouter);
app.use(v1, tamuRouter);
app.use(v1, userRouter)
app.use(v1, authRouter);
app.use(v1, qrcodeRouter)
app.use(v1, logRouter)

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

module.exports = app;
