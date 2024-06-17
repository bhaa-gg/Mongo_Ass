import bcrypt from "bcrypt";
import { db } from "../../../DB/Connection.js";
import { ObjectId } from "mongodb";

export const Signup = async (req, res) => {
    const { name, email, phone } = req.body
    try {
        const inserUser = await db.collection("customers").insertOne({
            name,
            password: req.password,
            email: email,
            phone,
        })
        return res.json({ message: "Success", inserUser })
    } catch (error) {
        return res.json({ message: "Erorr", error });
    }
}

export const Login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const getUser = await db.collection("customers").findOne({ email })
        if (!getUser) {
            return res.json("user not found");
        }
        const comparePass = bcrypt.compareSync(password, getUser.password)
        return comparePass ? res.json({ message: "Success", getUser }) : res.json("Check mail or password");

    } catch (error) {
        res.json({ message: "Erorr", error });
        return;
    }
}


export const specific_user = async (req, res) => {
    const { id } = req.params;
    const options = {
        projection: { name: 1, phone: 1, email: 1 }
    };
    try {
        const user = await db.collection("customers").findOne({ "_id": new ObjectId(id) }, options)
        return user ? res.json({ message: "Success", user }) : res.json({ message: "User Not Found" })
    } catch (error) {
        res.json({ message: "Erorr", error });
        return;
    }
}

export const Get_all_users = async (req, res) => {
    try {
        const user = await db.collection("customers").find({}).toArray()
        res.json({ message: "Success", user });
        return
    } catch (error) {
        res.json({ message: "Erorr", error });
        return;
    }
}
export const Update_user = async (req, res) => {
    const user = req.headers.id
    const { name, email, phone } = req.body
    try {
        const Update_Query = await db.collection("customers").updateOne
            (
                { _id: new ObjectId(user) },
                { $set: { name: name, email, phone, password: req.password } },
            )
        return Update_Query.modifiedCount && Update_Query.matchedCount ? res.json({ message: "Success", Update_Query }) : res.json({ message: "No Update " })
    } catch (error) {
        res.json({ message: "Erorr", error });
        return;
    }
}

export const Delete_user = async (req, res) => {
    const user = req.headers.id
    try {
        const Update_Query = await db.collection("customers").deleteOne({ _id: new ObjectId(user) })
        return Update_Query.deletedCount ? res.json({ message: "Success", Update_Query }) : res.json({ message: "No Deleted" })
    } catch (error) {
        res.json({ message: "Erorr", error });
        return;
    }
}






