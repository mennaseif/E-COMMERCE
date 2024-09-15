import express from "express";
import { changeUserPassword, signin, signup } from "./auth.controller.js";
import { checkEmail } from "../../middleware/checkEmail.js";
/*import { validate } from "../../middleware/validate.js";
import { changeUserPasswordValidSchema, signinValidSchema, signupValidSchema} from "./auth.validation.js";*/



const authRouter = express.Router()

authRouter.post('/signup', /*validate(signupValidSchema),*/ checkEmail, signup)
authRouter.post('/signin', /*validate(signinValidSchema),*/signin)
authRouter.patch('/change-password',/*validate(changeUserPasswordValidSchema),*/ changeUserPassword)


export default authRouter