import { NextFunction, Response, Request, RequestHandler } from "express";
import { Category, Statistics, StatsObject, Task } from "../types/taskTypes";

let notes: Task[] = [
    {
        name: "djdjdjd",
        id: 1,
        createdAt: new Date(),
        content: "dweddede",
        category: "Task",
        dates: ["2/3/2000"],
        archived: false,
    },
    {
        name: "djdjdjd",
        id: 2,
        createdAt: new Date(),
        content: "dweddede",
        category: "Task",
        dates: ["2/3/2000"],
        archived: false,
    },
    {
        name: "djdjdjd",
        id: 3,
        createdAt: new Date(),
        content: "dweddede",
        category: "Task",
        dates: ["2/3/2000"],
        archived: false,
    },
    {
        name: "djdjdjd",
        id: 4,
        createdAt: new Date(),
        content: "dweddede",
        category: "Task",
        dates: ["2/3/2000"],
        archived: false,
    },
    {
        name: "djdjdjd",
        id: 5,
        createdAt: new Date(),
        content: "dweddede",
        category: "Task",
        dates: ["2/3/2000"],
        archived: false,
    },
    {
        name: "djdjdjd",
        id: 6,
        createdAt: new Date(),
        content: "dweddede",
        category: "Task",
        dates: ["2/3/2000"],
        archived: true,
    },
    {
        name: "djdjdjd",
        id: 7,
        createdAt: new Date(),
        content: "dweddede",
        category: "Task",
        dates: ["2/3/2000"],
        archived: true,
    },
];

interface NoteBody {
    name: string;
    content: string;
    category: Category;
    dates: [string];
    archived: boolean;
}

interface Empty {}

const createNote: RequestHandler<{ id: string }, {}, NoteBody> = (req, res: Response<Task>, next: NextFunction) => {
    try {
        const note = req.body;

        const newNote: Task = {
            name: note.name,
            archived: note.archived,
            category: note.category,
            content: note.content,
            createdAt: new Date(),
            dates: note.dates,
            id: notes.length + 1,
        };

        notes.push(newNote);

        return res.status(201).json(newNote);
    } catch (ex) {
        return res.status(500).json(ex);
    }
};

const updateNote: RequestHandler<{ id: string }, {}, NoteBody> = (
    req,
    res: Response<Task | { [key: string]: string }>,
    next: NextFunction,
) => {
    try {
        const note = req.body;
        const id = req.params.id;
        let noteToUpdate = notes.find((note) => note.id === parseInt(id));

        if (noteToUpdate) {
            noteToUpdate.name = note.name;
            noteToUpdate.dates = note.dates;
            noteToUpdate.content = note.content;
            noteToUpdate.archived = note.archived;
            noteToUpdate.category = note.category;

            return res.status(201).json(noteToUpdate);
        }
        return res.status(404).json({ message: "Not found" });
    } catch (ex) {
        return res.status(500).json(ex);
    }
};

const deleteNote: RequestHandler<{ id: string }> = (
    req,
    res: Response<Task | { [key: string]: string }>,
    next: NextFunction,
) => {
    try {
        const id = parseInt(req.params.id);
        notes = notes.filter((note) => note.id !== id);
        return res.status(201).json({ message: `${id} deleted` });
    } catch (ex) {
        return res.status(404).json(ex);
    }
};

const getNotes = (req: Request, res: Response<Task[]>, next: NextFunction) => {
    try {
        return res.status(200).json(notes);
    } catch (ex) {
        return res.status(404).json(ex);
    }
};

const getNote: RequestHandler<{ id: string }> = (
    req,
    res: Response<Task | { [key: string]: string }>,
    next: NextFunction,
) => {
    try {
        const id = parseInt(req.params.id);
        let note = notes.find((note) => note.id === id);
        if (!note) {
            return res.status(404).json({ message: "Not found" });
        }
        return res.status(200).json(note);
    } catch (ex) {
        return res.status(404).json(ex);
    }
};

const getStats = (req: Request<{}>, res: Response<StatsObject>, next: NextFunction) => {
    try {
        let stats: Statistics = new Map<Category, { active: number; archived: number }>([
            ["Task", { active: 0, archived: 0 }],
            ["Random Thought", { active: 0, archived: 0 }],
            ["Idea", { active: 0, archived: 0 }],
        ]);

        notes.forEach((note) => {
            if (note.archived) {
                const categoryStats = stats.get(note.category);
                if (categoryStats) {
                    categoryStats.archived += 1;
                }
            } else {
                const categoryStats = stats.get(note.category);
                if (categoryStats) {
                    categoryStats.active += 1;
                }
            }
        });

        const statsObject: StatsObject = {};

        stats.forEach((value, key) => {
            statsObject[key] = value;
        });
        console.log(statsObject);
        return res.status(200).json(statsObject);
    } catch (ex) {
        return res.status(500).json({ message: ex });
    }
};

export default { createNote, getNote, getNotes, deleteNote, updateNote, getStats };
