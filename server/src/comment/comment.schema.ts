import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose"

export type BlogDocument = Document & commentSchema;

@Schema({ timestamps: true })
export class commentSchema {
    @Prop({ ref: "blog", required: true })
    blog: mongoose.Schema.Types.ObjectId;
    @Prop({ required: true })
    name: string;
    @Prop({ required: true })
    content: string;
    @Prop({ default: false })
    isApproved: false;
}

export const Comment = SchemaFactory.createForClass(commentSchema); 