import mongoose, { Schema, Document } from "mongoose";
import { Genre } from "./genre";

export interface IMovie extends Document {
    key: string;
    name: string;
    description: string;
    genres: Genre[]; // ✅ Use enum
    rate: number;
    length: number;
    img: string;
}

const MovieSchema: Schema = new Schema({
    key: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    genres: {
        type: [String],
        enum: Object.values(Genre), // ✅ Validate against enum values
        required: true,
    },
    rate: { type: Number, required: true },
    length: { type: Number, required: true },
    img: { type: String, required: true },
});

export default mongoose.model<IMovie>("Movie", MovieSchema);
