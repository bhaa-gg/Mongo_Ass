import express from 'express'
import { db } from './DB/Connection.js'
import carRouters from './src/modules/Cars/car.routes.js'
import custmoreRouters from './src/modules/Custmores/custmore.routes.js'
import rentalRouters from './src/modules/Rental/rent.routes.js'
import cors from 'cors'
const app = express()
const port = process.env.PORT || 3000
app.use(cors())
app.use(express.json())
app.use("/car", carRouters)
app.use("/user", custmoreRouters)
app.use("/rent", rentalRouters)





app.get('/', (req, res) => res.send('Hello World!'))
app.get('/*', (req, res) => res.send(404))
app.post('/*', (req, res) => res.send(404))
app.delete('/*', (req, res) => res.send(404))
app.put('/*', (req, res) => res.send(404))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))

// const date = new Date();
// console.log(date.toLocaleDateString());