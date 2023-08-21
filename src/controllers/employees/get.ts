import { Response } from 'express'
import connection from '../../services/dbConfig';

export const queryEmployeesTable = (query: string, response: Response) => {
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
                    response.status(404).send('Sorry, no cafe is available.');
                }
            })
    })
}

export const getAllEmployees = (response: Response) => {
    const query = `SELECT * FROM employees`
    queryEmployeesTable(query, response)
}

export const getEmployeesByCafeName = (cafeName: string, response: Response) => {
    const query = `
            SELECT 
                e.*,
                c.name as cafe_name,
                c.description,
                c.logo,
                c.location_id
            FROM employees as e
                INNER JOIN cafe as c
                ON e.cafe_id=c.cafe_id
            WHERE c.name LIKE "%${cafeName}%";
    `
    queryEmployeesTable(query, response)
}

export const getEmployeeById = (id: number | string, response: Response) => {
    const query = `
            SELECT 
                e.*,
                c.*
            FROM employees as e
                INNER JOIN cafe as c
                ON e.cafe_id=c.cafe_id
            WHERE e.employee_id=${id};
    `
    queryEmployeesTable(query, response)
}