import Joi, { ObjectSchema, ValidationError } from "joi";
import { NextFunction, Request, Response } from "express";
import { Category } from "../types/noteTypes";
import ValidationException from "../Exceptions/ValidationException";

export const ValidateTask = (schema: ObjectSchema) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const { error, value } = await schema.validateAsync(req.body);
        if (error) throw new ValidationException(error.message);
    };
};

export const Schemas = {
    task: {
        create: Joi.object({
            name: Joi.string().required().min(1),
            category: Joi.string()
                .valid("Task", "Random Thought", "Idea")
                .required(),
            content: Joi.string().required().min(1),
            dates: Joi.array()
                .items(Joi.string().regex(/\b(\d{1,2}\/\d{1,2}\/\d{4})\b/))
                .required(),
            archived: Joi.boolean().required(),
        }),
        update: Joi.object({
            name: Joi.string().min(1),
            category: Joi.string().valid("Task", "Random Thought", "Idea"),
            content: Joi.string().min(1),
            dates: Joi.array().items(
                Joi.string().regex(/\b(\d{1,2}\/\d{1,2}\/\d{4})\b/),
            ),
            archived: Joi.boolean(),
        }),
    },
};
