import { Router } from "express";
import { Create_Rental, Update_Rental, delete_Rental, get_Rents, specific_Rental } from "./rent.controler.js";
import { car_Customer_Exists } from "../../MiddleWares/find_Car_Custmore.js";
import { update_rented_after_delete } from "../../MiddleWares/del_rented.js";
const routes = Router();

routes.post("/Create_Rental", car_Customer_Exists, Create_Rental)
routes.put("/Update_Rental/:id", Update_Rental)
routes.delete("/delete_Rental/:id", update_rented_after_delete, delete_Rental)
routes.get("/get_Rents", get_Rents)
routes.get("/specific_Rental/:id", specific_Rental)

export default routes;