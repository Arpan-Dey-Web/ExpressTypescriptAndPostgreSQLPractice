import express, { Request, Response } from 'express';
import initDB, { pool } from './config/db';
import config from './config';
import logger from './middleware/logger';
import { userRoutes } from './module/user/user.routes';
import { userServices } from './module/user/user.service';

const app = express();
const port = config.port;


//  <-----------------------MiddelWare------------------------> 

// json diye j request gula asbe oigula direct parse korte parbe na tai  json e parse korar jonno   app.use(express.json()) use korte hobe
app.use(express.json())
// form data handle korar jonno 
// app.use(express.urlencoded())


// database connection function
initDB()


app.get('/', logger, (req: Request, res: Response) => {
    res.send('Hello Next Level Developers!!!')
})


// user data post (name , email)
app.use("/user", userRoutes)

app.use("/todos",  )







// Todos post


app.post("/todos", async (req: Request, res: Response) => {
    const { user_id, title } = req.body;
    try {
        const result = await pool.query(`INSERT INTO todos(user_id, title) VALUES($1, $2) RETURNING *`, [user_id, title]);
        res.status(201).json({ sucess: true, message: "Todo Created ", data: result.rows[0] });
    } catch (error: any) {
        res.status(500).json({
            sucess: false,
            message: error.message

        })
    }
})


// not found route 
app.use((req: Request, res: Response) => {
    res.status(404).json(
        {
            sucessful: false,
            message: "Route Not Found",
            path: req.path
        }
    )


})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
