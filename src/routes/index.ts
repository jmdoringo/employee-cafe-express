import express, { Request, Response } from 'express'
import dotenv from 'dotenv'

dotenv.config()

const router = express.Router()
const app = express();
const port = process.env.PORT

router.get('/', (request: Request, response: Response) => {
    response.send('Express + Typescript Server is running.')
})

app.use(router)

export default router