import { File } from "node:buffer";

export interface AddBlogType {
    title: string;
    subTitle: string;
    description: string;
    category: string;
    isPublished: string;
    imageFile: any;
}