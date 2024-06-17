import { ObjectId } from "mongodb";
import { db } from "../../DB/Connection.js";

export const update_rented_after_delete = async (req, res, next) => {
    const { id } = req.params
    try {
        const get_rented = await db.collection("rentals").findOne({ _id: new ObjectId(id) })
        if (!get_rented) return res.json({ message: "Rental Not Found" })
        const updates_car = await db.collection("cars").updateOne({ _id: new ObjectId(get_rented.car_id) }, { $set: { rental_status: "available" } })
        return next();
    } catch (error) {
        res.json({ message: "Error: ", error: error.message })
    }
}