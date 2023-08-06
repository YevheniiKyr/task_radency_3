export type Task = {
    id: number;
    name: string;
    createdAt: Date;
    category: Category;
    content: string;
    //типізувати дату виразом регекс
    dates: [string];
    archived: boolean;
};
export type Statistics = Map<Category, { active: number; archived: number }>;

export type Category = "Task" | "Random Thought" | "Idea";
export type StatsObject = { [key: string]: { active: number; archived: number } };
