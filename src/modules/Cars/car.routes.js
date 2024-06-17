import { Router } from "express";
import { Add_car, Available_Rented_Specific_Model, Available_Specific_Model, Delete_Cars, Get_Cars, Get_specific_car, Update_Cars, get_Honda_Toyota, rented_Specific_Model } from "./car.controler.js";
const route = Router();

route.post("/Add_car", Add_car)
route.get("/Get_specific_car/:id", Get_specific_car)
route.get("/Get_Cars", Get_Cars)
route.put("/Update_Cars/:id", Update_Cars)
route.delete("/Delete_Cars/:id", Delete_Cars)
route.get("/get_Honda_Toyota", get_Honda_Toyota)
route.get("/Available_Specific_Model", Available_Specific_Model)
route.get("/Available_Rented_Specific_Model", Available_Rented_Specific_Model)
route.get("/rented_Specific_Model", rented_Specific_Model)

export default route;