import { Router } from "express";
import { addUser, deleteUser, getUser, getUsers, updateUser } from "./user.controller.js";
import { checkEmail } from "../../middleware/checkEmail.js";
/*import { validate } from "../../middleware/validate.js";
import { addUserValidSchema, updateUserValidSchema } from "./user.validation.js";*/


const userRoutes = Router()
userRoutes.route('/')
.post(/*validate(addUserValidSchema),*/ checkEmail, addUser)
.get(getUsers)
userRoutes.route('/:id')
.get(getUser)
.put(/*validate(updateUserValidSchema),*/ updateUser)
.delete(deleteUser)

export default userRoutes