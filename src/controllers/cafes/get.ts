import { Response } from 'express'
import connection from '../../services/dbConfig';

export const queryCafeTable = (query: string, response: Response) => {
    connection.connect(() => {
        connection.query(
            query,
            (err, results) => {
                if (err) {
                    console.log('err:: ', err)
                    response.status(500).send(err)
                } else if (results.length !== 0) {
                    console.log('results:: ', results)
                    response.status(200).send(results)
                } else {
                    response.status(404).send('Sorry, no cafe is available.')
                }
            })
    })
}

export const getAllCafes = (response: Response) => {
    const query = `SELECT * FROM cafe`
    queryCafeTable(query, response)
}

export const getCafeByLocation = (location: string, response: Response) => {
    const query = `SELECT * FROM cafe WHERE location_id=${location}`
    queryCafeTable(query, response)
}

export const getByCafeId = (id: number | string, response: Response) => {
    const query = `SELECT * FROM cafe WHERE cafe_id=${id}`
    queryCafeTable(query, response)
}

export const getCafeByName = (name: string, response: Response) => {
    const query = `SELECT * FROM cafe WHERE name LIKE "%${name}%"`
    queryCafeTable(query, response)
}