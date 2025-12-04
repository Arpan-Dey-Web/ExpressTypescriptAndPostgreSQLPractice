import express, { Request, Response } from 'express';
import { Pool } from 'pg';
import dotenv from 'dotenv';
import path from 'path';
dotenv.config({path:path.join(process.cwd(), ".env")})


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



const initDB = async () => {
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

// app.post("/", (req: Request, res: Response) => {
//     console.log(req);
//     res.send(200).json({
//         "sucess": true,
//         "message": "api is working"
//     })

// })


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
