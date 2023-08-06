import { NextFunction, Response, RequestHandler } from "express";
import { StatsObject, Note } from "../types/noteTypes";
import {
    addNote,
    countStats,
    editNote,
    getNoteById,
    readNotes,
    removeNote,
} from "../repositories/noteRepository";
import { Message, NoteBody } from "../types/ApiTypes";
import NotFoundException from "../Exceptions/NotFoundException";

const createNote: RequestHandler<{ id: string }, {}, NoteBody> = (
    req,
    res: Response<Note | { [key: string]: string }>,
    next: NextFunction,
) => {
    const note: NoteBody = req.body;
    let newNote: Note = addNote(note);
    return res.status(201).json(newNote);
};

const updateNote: RequestHandler<{ id: string }, {}, Partial<NoteBody>> = (
    req,
    res: Response<Note | Message>,
    next: NextFunction,
) => {
    const note = req.body;
    const id = parseInt(req.params.id);
    let updatedNote: Note = editNote(id, note);
    return res.status(201).json(updatedNote);
};

const deleteNote: RequestHandler<{ id: string }, {}, {}> = (
    req,
    res: Response<Note | Message>,
    next: NextFunction,
) => {
    const id = parseInt(req.params.id);
    removeNote(id);
    return res.status(201).json({ message: `${id} deleted` });
};

const getNotes: RequestHandler<{}, {}, {}> = (
    req,
    res: Response<Note[] | Message>,
    next: NextFunction,
) => {
    let notes: Note[] = readNotes();
    return res.status(200).json(notes);
};

const getNote: RequestHandler<{ id: string }, {}, {}> = (
    req,
    res: Response<Note | Message>,
    next: NextFunction,
) => {
    const id = parseInt(req.params.id);
    let note = getNoteById(id);
    if (!note) {
        throw new NotFoundException("Not found");
    }
    return res.status(200).json(note);
};

const getStats: RequestHandler<{}, {}, {}> = (
    req,
    res: Response<StatsObject | Message>,
    next: NextFunction,
) => {
    const statsObject: StatsObject = countStats();
    return res.status(200).json(statsObject);
};

export default {
    createNote,
    getNote,
    getNotes,
    deleteNote,
    updateNote,
    getStats,
};
