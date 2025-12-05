import express, { Request, Response } from 'express';
import { Pool, Result } from 'pg';
import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.join(process.cwd(), ".env") })


const app = express();
const port = 5000;


console.log(process.env.CONNECTION_STR);
//  <-----------------------MiddelWare------------------------> 

// json diye j request gula asbe oigula direct parse korte parbe na tai  json e parse korar jonno   app.use(express.json()) use korte hobe
app.use(express.json())
// form data handle korar jonno 
// app.use(express.urlencoded())


// <-------------------------------Database-------------------------------->
// Database Connection Link
const pool = new Pool({
    connectionString: `${process.env.CONNECTION_STR}`
})


// <---------------------------------Database Table Create---------------------------------->

const initDB = async () => {

    // <---------------------------------User Table Create---------------------------------->

    await pool.query(`
        CREATE TABLE IF NOT EXISTS users(
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(150) UNIQUE NOT NULL,
        age INT,
        phone VARCHAR(15),
        address TEXT,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
        )
        `);

    // <---------------------------------Todos Table Create---------------------------------->

    await pool.query(`
            CREATE TABLE IF NOT EXISTS todos(
            id SERIAL PRIMARY KEY,
            user_id INT REFERENCES users(id) ON DELETE CASCADE,
            title VARCHAR(200) NOT NULL,
            description TEXT,
            completed BOOLEAN DEFAULT false,
            due_date DATE,
            created_at TIMESTAMP DEFAULT NOW(),
            updated_at TIMESTAMP DEFAULT NOW()
            )
            `);
};
initDB()


app.get('/', (req: Request, res: Response) => {
    res.send('Hello Next Level Developers!!!')
})


// user data post (name , email)
app.post("/users", async (req: Request, res: Response) => {
    const { name, email } = req.body;
    try {
        const result = await pool.query(`
            INSERT INTO users (name,email) VALUES ($1, $2) RETURNING *
            ` , [name, email])
        console.log(result);
        res.status(201).json({
            sucess: true,
            message: "Data inserted Sucessfully"
        })
    } catch (error: any) {
        res.status(500).json({
            sucess: false,
            message: error.message
        })


    }

})



// get all users data
app.get("/users", async (req: Request, res: Response) => {
    try {
        const result = await pool.query(`SELECT * FROM users`)
        res.status(200).json({
            sucess: true,
            message: 'users retrived sucessfully',
            data: result.rows
        })
    } catch (error: any) {
        res.status(500).json({
            sucess: false,
            message: error.message
        }
        )
    }


})


// get single user data

app.get("/user/:id", async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const result = await pool.query(`SELECT * FROM users WHERE id = $1`, [id])
        console.log(result.rows);
        if (result.rows.length === 0) {
            res.status(404).json({
                sucess: false,
                message: 'user not found'
            })
        } else {
            res.status(200).json({
                sucess: true,
                message: 'user found sucessfull',
                data: result.rows[0]

            })
        }
    } catch (error: any) {
        res.status(500).json({ sucess: false, message: error.message })


    }
})


// update user data 
app.put("/user/:id", async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, email } = req.body;
    try {
        const result = await pool.query(`
            UPDATE users SET name=$1, email=$2 WHERE id = $3 RETURNING *
            ` , [name, email, id])

        if (result.rows.length === 0) {
            res.status(404).json({ sucess: false, message: "user not found" })
        } else {
            res.status(200).json({ sucess: true, message: "User Updated Sucessfully", data: result.rows[0] })
        }


    } catch (error: any) {
        res.status(404).json({ sucess: false, message: error.message })
    }
})

// Delete User Details 

app.delete("/user/:id", async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const result = await pool.query(`DELETE FROM users WHERE id = $1`, [id])

        if (result.rowCount === 0) {
            res.status(404).json({
                sucess: false,
                message: 'user not found'
            })
        } else {
            res.status(200).json({
                sucess: true,
                message: 'user Deleted sucessfully',
                data: null,

            })
        }
    } catch (error: any) {
        res.status(500).json({ sucess: false, message: error.message })

    }
})













app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
