import express, { Request, Response } from 'express';
import initDB  from './config/db';
import config from './config';
import logger from './middleware/logger';
import { userRoutes } from './module/user/user.routes';
import { todoRoutes } from './module/todo/todo.routes';
import { authRoutes } from './module/auth/auth.routes';

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


// user data 
app.use("/user", userRoutes)

// todo data 
app.use("/todos",todoRoutes)


// auth routes
app.use("/auth", authRoutes )




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
