import { Response } from 'express'
import { Employee } from '../../models/Employee';
import connection from '../../services/dbConfig';

const queryEmployeeTable = (statement: string, response: Response) => {
    connection.connect(() => {
        connection.query(
            statement,
            (err, results) => {
                if (err) {
                    console.log('err:: ', err)
                    response.send(err)
                } else if (results.length !== 0) {
                    console.log('results:: ', results)
                    response.send(results)
                } else {
                    response.status(500).send('Internal Server Error.');
                }
            })
    })
}

export const addNewEmployee = (body: Employee, response: Response) => {
    const {
        id,
        firstName,
        lastName,
        emailAddress,
        phoneNumber,
        gender,
        cafeId = null,
        startDate
    } = body

    const statement = `INSERT INTO employees VALUES (`
        + `"${id}",`
        + `"${firstName}",`
        + `"${lastName}",`
        + `"${emailAddress}",`
        + `"${phoneNumber}",`
        + `"${gender}",`
        + `${cafeId},`
        + `"${startDate}")`

    queryEmployeeTable(statement, response)
}
