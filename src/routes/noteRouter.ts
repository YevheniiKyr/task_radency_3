import express from "express";
import controller from "../controllers/noteController";
import { Schemas, ValidateTask } from "../middlewares/ValidateTask";
import { tryCatch } from "../utils/tryCatch";
const router = express.Router();

router.post(
    "/",
    tryCatch(ValidateTask(Schemas.task.create)),
    tryCatch(controller.createNote),
);
router.get("/stats", tryCatch(controller.getStats));
router.get("/:id", tryCatch(controller.getNote));
router.get("/", tryCatch(controller.getNotes));
router.patch(
    "/:id",
    tryCatch(ValidateTask(Schemas.task.update)),
    tryCatch(controller.updateNote),
);
router.delete("/:id", tryCatch(controller.deleteNote));
export = router;
