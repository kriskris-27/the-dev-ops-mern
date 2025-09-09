import  express  from "express";
import { addTodo, deleteTodo, getAll, toggleTodo } from "../controllers/todoContollers";

const router = express.Router();

router.get("/",getAll);

router.post("/",addTodo);

router.patch("/:id",toggleTodo);

router.delete("/id",deleteTodo);
