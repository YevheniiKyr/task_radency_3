import { Note, StatsObject } from "../types/noteTypes";
import { NoteBody } from "../types/ApiTypes";
import NotFoundException from "../Exceptions/NotFoundException";
import { getNotes, setNotes } from "../store/notes";
import {
    countAllStats,
    makeTaskForCreation,
    makeTaskUpdate,
} from "../Services/taskService";

const addNote = (note: NoteBody): Note => {
    let notes = getNotes();
    const id = notes.length + 1;
    const newNote = makeTaskForCreation(note, id);
    notes.push(newNote);
    setNotes(notes);
    return newNote;
};
const editNote = (id: number, note: Partial<NoteBody>): Note => {
    let notes = getNotes();

    let noteToUpdate = notes.find((note) => note.id === id);
    if (!noteToUpdate) {
        throw new NotFoundException("Not found");
    }
    makeTaskUpdate(noteToUpdate, note);
    setNotes(notes);
    return noteToUpdate;
};
const removeNote = (id: number) => {
    let notes = getNotes();
    if (!notes.find((note) => note.id === id))
        throw new NotFoundException("Not found");
    notes = notes.filter((note) => note.id !== id);
    setNotes(notes);
};

const readNotes = (): Note[] => {
    let notes = getNotes();
    return notes;
};

const getNoteById = (id: number): Note => {
    let notes = getNotes();
    let note = notes.find((note) => note.id === id);
    if (note) {
        return note;
    }
    throw new NotFoundException("Not found");
};

const countStats = (): StatsObject => {
    let notes = getNotes();
    return countAllStats(notes);
};

export { addNote, editNote, removeNote, readNotes, getNoteById, countStats };
