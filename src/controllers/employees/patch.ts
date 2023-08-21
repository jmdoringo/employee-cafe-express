import { Response } from 'express'
import { Employee } from '../../models/Employee';
import connection from '../../services/dbConfig';

const queryEmployeeTable = (statement: string, data: [any, string], response: Response) => {
    connection.connect(() => {
        connection.query(
            statement,
            data,
            (err, results) => {
                if (err) {
                    console.log('err:: ', err)
                    response.send(err)
                } else if (results.changedRows !== 0) {
                    console.log('results:: ', results.affectedRows)
                    response.status(200).send(results)
                } else if (results.changedRows === 0) {
                    response.status(200).send('No rows has been updated')
                } else {
                    response.status(500).send('Internal Server Error.');
                }
            })
    })
}

export const updateEmployee = (body: Employee, response: Response) => {
    const {
        id = '',
        firstName,
        lastName,
        emailAddress,
        phoneNumber,
        gender,
        cafeId = null,
        startDate
    } = body

    // TODO: Create a mapper
    const params = {
        first_name: firstName,
        last_name: lastName,
        email_address: emailAddress,
        phone_number: phoneNumber,
        gender_name: gender,
        cafe_id: cafeId,
        start_date: startDate
    }

    const statement = `UPDATE employees SET ? WHERE employee_id=?;`
    queryEmployeeTable(statement, [params, id], response)
}
