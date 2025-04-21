import { config } from 'dotenv'
import express, { Express, NextFunction, Request, Response } from 'express'
import { ErrorApp, errorHandler } from './src/utils'
import { AuthRoutes, CategoryRoutes, ProductRoutes, UserRoutes } from './src/module'
import cors from 'cors'


export const main = async () => {

    config()



    const app: Express = express()
    const port = process.env.PORT || 3000


    app.use(cors());
    app.use(express.json());
    
    
    app.get('/', (req: Request, res: Response): any => res.json({ message: 'Hello World!' }))
    app.use("/auth", AuthRoutes)
    app.use("/user", UserRoutes)
    app.use("/category", CategoryRoutes)
    app.use("/product", ProductRoutes)

    app.use((req: Request, res: Response, next: NextFunction): any => next(new ErrorApp("Page not found", 404)))

    app.use((err: ErrorApp, req: Request, res: Response, next: NextFunction): any => errorHandler(err, req, res, next))

    app.listen(port, (err: Error | undefined) => console.log(err ? err : `Example app listening on port ${port}!`))


}