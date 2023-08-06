import { NextFunction, Response, Request, RequestHandler } from "express";
import { Category, Statistics, StatsObject, Note } from "../types/noteTypes";
import { string } from "joi";
import { addNote, countStats, editNote, getNoteById, readNotes, removeNote } from "../repositories/noteRepository";
import { Message, NoteBody } from "../types/ApiTypes";
import NotFoundException from "../Exceptions/NotFoundException";

const createNote: RequestHandler<{ id: string }, {}, NoteBody> = (
    req,
    res: Response<Note | { [key: string]: string }>,
    next: NextFunction,
) => {
    try {
        const note: NoteBody = req.body;
        let newNote: Note = addNote(note);
        return res.status(201).json(newNote);
    } catch (ex) {
        if (ex instanceof Error) {
            return res.status(500).json({ error: ex.message });
        }
        return res.status(500).json({ error: "An unknown error occurred." });
    }
};

const updateNote: RequestHandler<{ id: string }, {}, Partial<NoteBody>> = (
    req,
    res: Response<Note | Message>,
    next: NextFunction,
) => {
    try {
        const note = req.body;
        const id = parseInt(req.params.id);
        let updatedNote: Note = editNote(id, note);
        return res.status(201).json(updatedNote);
    } catch (ex) {
        if (ex instanceof NotFoundException) {
            return res.status(404).json({ message: "Not found" });
        }
        if (ex instanceof Error) {
            return res.status(500).json({ error: ex.message });
        }
        return res.status(500).json({ error: "An unknown error occurred." });
    }
};

const deleteNote: RequestHandler<{ id: string }, {}, {}> = (req, res: Response<Note | Message>, next: NextFunction) => {
    try {
        const id = parseInt(req.params.id);
        removeNote(id);
        return res.status(201).json({ message: `${id} deleted` });
    } catch (ex) {
        if (ex instanceof Error) {
            return res.status(500).json({ error: ex.message });
        }
        return res.status(500).json({ error: "An unknown error occurred." });
    }
};

const getNotes: RequestHandler<{}, {}, {}> = (req, res: Response<Note[] | Message>, next: NextFunction) => {
    try {
        let notes: Note[] = readNotes();
        return res.status(200).json(notes);
    } catch (ex) {
        if (ex instanceof Error) {
            return res.status(500).json({ error: ex.message });
        }
        return res.status(500).json({ error: "An unknown error occurred." });
    }
};

const getNote: RequestHandler<{ id: string }, {}, {}> = (req, res: Response<Note | Message>, next: NextFunction) => {
    try {
        const id = parseInt(req.params.id);
        let note = getNoteById(id);
        if (!note) {
            return res.status(404).json({ message: "Not found" });
        }
        return res.status(200).json(note);
    } catch (ex) {
        if (ex instanceof Error) {
            return res.status(500).json({ error: ex.message });
        }
        return res.status(500).json({ error: "An unknown error occurred." });
    }
};

const getStats: RequestHandler<{}, {}, {}> = (req, res: Response<StatsObject | Message>, next: NextFunction) => {
    try {
        const statsObject: StatsObject = countStats();
        return res.status(200).json(statsObject);
    } catch (ex) {
        if (ex instanceof Error) {
            return res.status(500).json({ error: ex.message });
        }
        return res.status(500).json({ error: "An unknown error occurred." });
    }
};

export default { createNote, getNote, getNotes, deleteNote, updateNote, getStats };
