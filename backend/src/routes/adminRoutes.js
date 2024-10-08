import { Router } from "express";
import validateToken from "../middleware/auth.middleware.js";
import createEmployee from "../controllers/createEmployee.controller.js";
import upload from "../uploads/multerConfig.js";
import searchEmployees from "../controllers/searchEmployee.controller.js";
import updateEmployee from "../controllers/updateEmployee.controller.js";
import displayEmployees from "../controllers/displayEmployee.controller.js";
import { login, logout, verifyToken } from "../controllers/auth.controller.js";
import getEmployeeById from "../controllers/getEmployeeById.controller.js";
import deleteEmployee from "../controllers/deleteEmployee.controller.js";

const Routes= Router(); 


Routes.post("/create",validateToken, upload.single('profilePicture'), createEmployee ); 
Routes.get("/search", validateToken, searchEmployees );
Routes.put("/update/:employeeId", validateToken,upload.single('profilePicture'), updateEmployee); 
Routes.get("/employees", validateToken, displayEmployees)
Routes.get("/employees/:employeeId", validateToken, getEmployeeById)
Routes.get("/validate-token", validateToken, verifyToken)
Routes.delete("/employees/:employeeId", validateToken, deleteEmployee); 


export default Routes ;