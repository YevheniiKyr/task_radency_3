import { Note } from "../types/noteTypes";

export let notes: Note[] = [
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

export const getNotes = (): Note[] => notes;

export const setNotes = (newNotes: Note[]): void => {
    notes = newNotes;
};
