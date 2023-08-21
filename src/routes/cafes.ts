import express, { Request, Response } from 'express'
import dotenv from 'dotenv'
import {
    addNewCafe,
    getAllCafes,
    getByCafeId,
    getCafeByLocation,
    getCafeByName
} from '../controllers/cafes';
import { updateCafe } from '../controllers/cafes/patch';

dotenv.config()

const router = express.Router()
const app = express();

router.get('/', (request: Request, response: Response) => {
    const { location } = request.query

    if (location) {
        getCafeByLocation(location as string, response)
    } else {
        getAllCafes(response)
    }
})

/** Use this to get by Id or get by Name */
router.get('/:cafe', (request: Request, response: Response) => {
    const { cafe } = request.params

    if (!isNaN(Number(cafe))) {
        getByCafeId(cafe, response)
    } else {
        getCafeByName(cafe, response)
    }
})

router.post('/', (request: Request, response: Response) => {
    const { name, description, locationId } = request.body

    // TODO: Add field validator - implement yup
    if (name && description && locationId) {
        addNewCafe(request.body, response)
    } else {
        console.log('Missing a parameter')
        response.status(400).send('Missing a parameter.')
    }
})

router.patch('/:cafeId', (request: Request, response: Response) => {
    const { cafeId } = request.params
    const body = request.body

    if (!cafeId) {
        response.status(400).send('Please provide cafeId.')
    }

    // TODO: Add field validator - implement yup
    if (body && cafeId) {
        updateCafe(
            { ...request.body, id: cafeId },
            response
        )
    } else {
        console.log('Missing a body')
        response.status(400).send('Missing a body.')
    }
})

app.use(router)

export default router