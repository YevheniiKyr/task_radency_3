import Joi, { ObjectSchema } from "joi";
import { NextFunction, Request, Response } from "express";
import { Category } from "../types/taskTypes";

export const ValidateTask = (schema: ObjectSchema) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await schema.validateAsync(req.body);
            next();
        } catch (err) {
            return res.status(422).json({ err });
        }
    };
};

export const Schemas = {
    task: {
        create: Joi.object({
            name: Joi.string().required().min(1),
            category: Joi.string().valid("Task", "Random Thought", "Idea").required(),
            content: Joi.string().required().min(1),
            dates: Joi.array()
                .items(Joi.string().regex(/\b(\d{1,2}\/\d{1,2}\/\d{4})\b/))
                .required(),
            archived: Joi.boolean(),
        }),
    },
};
