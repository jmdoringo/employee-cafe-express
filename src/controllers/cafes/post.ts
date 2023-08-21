import { Response } from 'express'
import { Cafe } from '../../models/Cafe';
import connection from '../../services/dbConfig';

const queryCafeTable = (statement: string, response: Response) => {
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

export const addNewCafe = (body: Cafe, response: Response) => {
    const {
        name,
        description,
        locationId
    } = body

    const statement = `
        INSERT INTO cafe (name, description, location_id)
            VALUES ("${name}", "${description}", "${locationId}")
    `

    queryCafeTable(statement, response)
}
