import { Author } from "./author.model";
import { Comment } from "./comment.model";
import { Topic } from "./topic.model";

export interface Post {
    id: number;
    title: string;
    description: string;
    topic: Topic;
    author: Author;
    comments: Comment[];
    createdAt: Date;
    updatedAt: Date;
}