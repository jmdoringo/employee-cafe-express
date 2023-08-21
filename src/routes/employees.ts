import express, { Request, Response } from 'express'
import dotenv from 'dotenv'
import {
    getAllEmployees,
    getEmployeeById,
    getEmployeesByCafeName
} from '../controllers/employees'
import { addNewEmployee } from '../controllers/employees/post'
import { Employee } from '../models/Employee'
import { updateEmployee } from '../controllers/employees/patch'

dotenv.config()

const router = express.Router()
const app = express();

router.get('/', (request: Request, response: Response) => {
    const { cafe } = request.query

    if (cafe) {
        getEmployeesByCafeName(cafe as string, response)
    } else {
        getAllEmployees(response)
    }
})

router.get('/:employeeId', (request: Request, response: Response) => {
    const { employeeId } = request.params

    if (employeeId) {
        getEmployeeById(employeeId, response)
    }
})

router.post('/', (request: Request, response: Response) => {
    const {
        firstName,
        lastName,
        emailAddress,
        phoneNumber,
        gender,
    }: Employee = request.body

    const currentDate = new Date().toISOString().slice(0, 10)

    const id = (Math.random() + 1).toString(36).substring(5)
    const employeeId = `UI${id}`.toUpperCase()

    // TODO: Add field validator - implement yup
    if (firstName && lastName && emailAddress && phoneNumber && gender) {
        addNewEmployee(
            {
                ...request.body,
                id: employeeId,
                startDate: currentDate
            },
            response
        )
    } else {
        console.log('Missing a parameter')
        response.status(400).send('Missing a parameter.')
    }
})

router.patch('/:employeeId', (request: Request, response: Response) => {
    const { employeeId } = request.params
    const body = request.body

    if (!employeeId) {
        response.status(400).send('Please provide employeeId.')
    }

    // TODO: Add field validator - implement yup
    if (body && employeeId) {
        updateEmployee(
            { ...request.body, id: employeeId },
            response
        )
    } else {
        console.log('Missing a body')
        response.status(400).send('Missing a body.')
    }
})

app.use(router)

export default router