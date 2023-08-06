import { string } from "joi";
import { Category } from "./noteTypes";

interface NoteBody {
    name: string;
    content: string;
    category: Category;
    dates: [string];
    archived: boolean;
}

type Message = { [key: string]: string };

export { NoteBody, Message };
