import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose"
import { timestamp } from "rxjs";

export type BlogDocument = Document & Blog;

@Schema()
export class Blog {
    @Prop({ required: true, type: String })
    title: string;
    @Prop({ type: String })
    subTitle: string;
    @Prop({ required: true, type: String })
    description: string;
    @Prop({ required: true, type: String })
    category: string;
    @Prop({ required: true, type: String })
    image: string;
    @Prop({ required: true, type: Boolean })
    isPublished: boolean;
    @Prop({ default: Date.now })
    createdAt: string;
    @Prop({ default: Date.now })
    updatedAt:string;

}
export const BlogSchema = SchemaFactory.createForClass(Blog); 