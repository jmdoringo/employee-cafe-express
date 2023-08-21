import { Response } from 'express'
import { Cafe } from '../../models/Cafe'
import connection from '../../services/dbConfig'

const queryCafeTable = (statement: string, data: [Partial<Cafe>, string], response: Response) => {
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

export const updateCafe = (body: Cafe, response: Response) => {
    const { id, ...params } = body

    const statement = `UPDATE cafe SET ? WHERE cafe_id=?;`
    queryCafeTable(statement, [params, id], response)
}
