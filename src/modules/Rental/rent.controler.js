import { ObjectId } from "mongodb";
import { db } from "../../../DB/Connection.js";

export const Create_Rental = async (req, res) => {
    const { car_id, customer_id, rental_date, return_date } = req.body
    const rental_date_ = new Date(rental_date);
    const return_date_ = new Date(return_date);
    try {
        const create_Rent = await db.collection("rentals").insertOne({
            car_id: new ObjectId(car_id),
            customer_id: new ObjectId(customer_id),
            rental_date: rental_date_,
            return_date: return_date_,
        })
        res.json({ message: "Success", create_Rent })

    } catch (error) {
        res.json({ message: "Error: ", error: error.message })
    }
}

export const Update_Rental = async (req, res) => {
    const { id } = req.params
    const { rental_date, return_date } = req.body
    const rental_date_ = new Date(rental_date);
    const return_date_ = new Date(return_date);
    try {
        const update_Rent = await db.collection("rentals").updateOne({ _id: new ObjectId(id) }, { $set: { rental_date: rental_date_, return_date: return_date_ } })
        return res.json({ message: "Success", update_Rent })
    } catch (error) {
        res.json({ message: "Error: ", error: error.message })
    }
}

export const delete_Rental = async (req, res) => {
    const { id } = req.params
    try {
        const del_Rent = await db.collection("rentals").deleteOne({ _id: new ObjectId(id) })
        return !del_Rent.deletedCount ? res.json({ message: "Delete Not Succes" }) : res.json({ message: "Success", del_Rent })

    } catch (error) {
        res.json({ message: "Error: ", error: error.message })
    }
}

export const get_Rents = async (req, res) => {
    try {
        const all_rents = await db.collection("rentals").find().toArray();
        return all_rents.length == 0 ? res.json({ message: "No Rents" }) : res.json({ message: "Success", all_rents })
    } catch (error) {
        res.json({ message: "Error: ", error: error.message })
    }
}

export const specific_Rental = async (req, res) => {
    const { id } = req.params
    try {
        const specific_rent = await db.collection("rentals").findOne({ _id: new ObjectId(id) })
        return specific_rent ? res.json({ message: "Success", specific_rent }) : res.json({ message: "No Found" })
    } catch (error) {
        res.json({ message: "Error: ", error: error.message })
    }
}