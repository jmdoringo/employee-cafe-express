import express, {
  json, urlencoded,
  Request,
  Response,
  NextFunction,
} from 'express'
import createError from 'http-errors'
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import dotenv from 'dotenv'

import indexRouter from './routes/index'
import cafes from './routes/cafes'
import employees from './routes/employees'

dotenv.config()

const app = express()
const port = process.env.PORT

app.use(logger('dev'))
app.use(json())
app.use(urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static('dist'))

app.use('/', indexRouter)
app.use('/cafes', cafes)
app.use('/employees', employees)

// catch 404 and forward to error handler
app.use((req: Request, res: Response, next: NextFunction) => {
  next(createError(404))
})

// error handler
app.use((err: { message: any, status: any }, req: Request, res: Response) => {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`)
})

export default app
