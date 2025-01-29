import { Author } from "./author.model";

export interface Comment {
    id: number;
    content: string;
    author: Author;
}