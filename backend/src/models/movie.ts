import mongoose, { Schema, Document } from "mongoose";
import { Genre, GENRES } from "./genre";

export interface IMovie extends Document {
    key: string;
    name: string;
    description: string;
    genres: Genre[];
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
        enum: GENRES,
        required: true,
    },
    rate: { type: Number, required: true, min: 0, max: 10 },
    length: { type: Number, required: true },
    img: { type: String, required: true },
});

// INDEXES (allows for much faster searching)
MovieSchema.index({ name: "text" });
MovieSchema.index({ genres: 1 });

export default mongoose.model<IMovie>("Movie", MovieSchema);
