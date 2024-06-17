import { Router } from "express";
import { Delete_user, Get_all_users, Login, Signup, Update_user, specific_user } from "./custmore.controler.js";
import { db } from "../../../DB/Connection.js";
import { Hash_Password, checkMail } from "../../MiddleWares/Email_Exists.js";
const routes = Router();
routes.post("/Signup", checkMail, Signup);
routes.get("/Login", Login);
routes.get("/specific_user/:id", specific_user);
routes.get("/Get_all_users", Get_all_users);
routes.put("/Update_user", Hash_Password, Update_user);
routes.delete("/Delete_user", Delete_user);



export default routes;