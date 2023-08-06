import express from "express";
import controller from "../controllers/noteController";
import { Schemas, ValidateTask } from "../middlewares/ValidateTask";

const router = express.Router();

router.post("/", ValidateTask(Schemas.task.create), controller.createNote);
router.get("/stats", controller.getStats);
router.get("/:id", controller.getNote);
router.get("/", controller.getNotes);
router.patch("/:id", ValidateTask(Schemas.task.create), controller.updateNote);
router.delete("/:id", controller.deleteNote);
export = router;
