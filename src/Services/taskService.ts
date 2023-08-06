import { NoteBody } from "../types/ApiTypes";
import { Category, Note, Statistics, StatsObject } from "../types/noteTypes";

const makeTaskForCreation = (note: NoteBody, id: number) => {
    const newNote: Note = {
        name: note.name,
        archived: note.archived,
        category: note.category,
        content: note.content,
        createdAt: new Date(),
        dates: note.dates,
        id: id,
    };
    return newNote;
};
const makeTaskUpdate = (noteToUpdate: Note, updateBody: Partial<NoteBody>) => {
    noteToUpdate.name = updateBody.name ?? noteToUpdate.name;
    noteToUpdate.archived = updateBody.archived ?? noteToUpdate.archived;
    noteToUpdate.category = updateBody.category ?? noteToUpdate.category;
    noteToUpdate.content = updateBody.content ?? noteToUpdate.content;
    noteToUpdate.dates = updateBody.dates ?? noteToUpdate.dates;
    return noteToUpdate;
};
const countAllStats = (notes: Note[]) => {
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

    return statsObject;
};

export { countAllStats, makeTaskForCreation, makeTaskUpdate };
