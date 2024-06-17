import { db } from "../../DB/Connection.js"
import bcrypt from "bcrypt";

export const checkMail = async (req, res, next) => {
    const { name, email, password, phone } = req.body
    const findMail = await db.collection("customers").findOne({ $or: [{ phone }, { email }] })
    if (findMail == null) {
        const hashPass = bcrypt.hashSync(password, 8)
        req.password = hashPass;
        next();
        return;
    }
    res.json("Mail or Phone is  is Exists")
    return;
}
export const Hash_Password = async (req, res, next) => {
    const { password } = req.body

    const hashPass = bcrypt.hashSync(password, 8)
    req.password = hashPass;
    next();
}
