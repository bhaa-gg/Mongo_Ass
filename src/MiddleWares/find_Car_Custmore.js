import { db } from "../../DB/Connection.js"
import { ObjectId } from 'mongodb';

export const car_Customer_Exists = async (req, res, next) => {
    const { car_id, customer_id, rental_date, return_date } = req.body
    try {
        const get_custmore = await db.collection('customers').findOne({ _id: new ObjectId(customer_id) })
        if (!get_custmore) return res.json({ message: "Custmore Not Found" })
        const get_car = await db.collection('cars').findOne({ _id: new ObjectId(car_id) })
        if (!get_car) return res.json({ message: "Car Not Found" })
        if (get_car.rental_status != "available") return res.json({ message: "Car Not available" })
        const rent_car = await db.collection('cars').updateOne({ _id: new ObjectId(car_id) }, { $set: { rental_status: "rented" } })
        return next();
    } catch (error) {
        res.json({ message: "Error while processing", error: error.message })
    }
}