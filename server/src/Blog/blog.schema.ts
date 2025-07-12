import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose"

export type BlogDocument = Document & Blog;

@Schema({ timestamps: true })
export class Blog {
    @Prop({ required: true })
    title: string;

    @Prop()
    subTitle: string;

    @Prop({ required: true })
    description: string;

    @Prop({ required: true })
    category: string;

    @Prop({ required: true })
    image: string;

    @Prop({ required: true })
    isPublished: boolean;
}

export const BlogSchema = SchemaFactory.createForClass(Blog); 