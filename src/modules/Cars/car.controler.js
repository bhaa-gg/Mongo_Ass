import { ObjectId } from "mongodb";
import { db } from "../../../DB/Connection.js";

export const Add_car = async (req, res) => {
    const { name, model, rental_status } = req.body;
    try {
        const insertCar = await db.collection("cars").insertOne({ name, model, rental_status: rental_status == "" ? "available" : rental_status })
        res.json({ message: "Success", insertCar });
    } catch (error) {
        res.json({ message: "Error", error });
    }
}

export const Get_specific_car = async (req, res) => {
    const { id } = req.params;
    try {
        const car = await db.collection("cars").findOne({ _id: new ObjectId(id) });
        return car ? res.json({ message: "Success", car }) : res.json({ message: "Car Not Found" })
    } catch (error) {
        res.json({ message: "Error", error });
    }
}

export const Get_Cars = async (req, res) => {
    try {
        const car = await db.collection("cars").find({}).toArray();
        return res.json({ message: "Success", car })
    } catch (error) {
        res.json({ message: "Error", error });
    }
}

export const Update_Cars = async (req, res) => {
    const { id } = req.params;
    const { name, model, rental_status } = req.body;
    try {
        const updates = await db.collection("cars").updateOne({ _id: new ObjectId(id) }, { $set: { name, model, rental_status } })
        return updates.modifiedCount && updates.matchedCount ? res.json({ message: "Success", updates }) : res.json({ message: "Same Value" })
    } catch (error) {
        res.json({ message: "Error", error });
    }
}
export const Delete_Cars = async (req, res) => {
    const { id } = req.params;
    try {
        const deletes = await db.collection("cars").deleteOne({ _id: new ObjectId(id) }, {})
        return deletes.deletedCount ? res.json({ message: "Success", deletes }) : res.json({ message: "Delete Not Success" })
    } catch (error) {
        res.json({ message: "Error", error: error.message });
    }
}


export const get_Honda_Toyota = async (req, res) => {
    const { car1, car2 } = req.query
    try {
        const finds = await db.collection("cars").aggregate([
            { $match: { $or: [{ name: car1 }, { name: car2 }] } }
        ]).toArray();
        res.json({ message: "Success", finds });
    } catch (error) {
        res.json({ message: "Error", error: error.message });
    }

}


export const Available_Specific_Model = async (req, res) => {
    const { model } = req.body;
    try {
        const finds = await db.collection("cars").aggregate([
            { $match: { $and: [{ model: model }, { rental_status: "available" }] } }
        ]).toArray();
        return !(finds.length) ? res.json({ message: "Not Found" }) : res.json({ message: "Success", finds });

    } catch (error) {
        res.json({ message: "Error", error: error.message });
    }

}

export const rented_Specific_Model = async (req, res) => {
    const { model } = req.body;
    try {
        const finds = await db.collection("cars").aggregate([
            { $match: { $and: [{ model: model }, { rental_status: "rented" }] } }
        ]).toArray();
        return !(finds.length) ? res.json({ message: "Not Found" }) : res.json({ message: "Success", finds });

    } catch (error) {
        res.json({ message: "Error", error: error.message });
    }

}

export const Available_Rented_Specific_Model = async (req, res) => {
    const { model, rental_status } = req.body;
    try {
        const finds = await db.collection("cars").aggregate([
            { $match: { $and: [{ model }, { rental_status }] } }
        ]).toArray();
        return !(finds.length) ? res.json({ message: "Not Found" }) : res.json({ message: "Success", finds });
        res.json({ message: "Success", finds });
    } catch (error) {
        res.json({ message: "Error", error: error.message });
    }

}