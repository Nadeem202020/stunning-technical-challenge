// models/idea.schema.ts
import { Schema } from 'mongoose';

const SectionSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true }
});

export const IdeaSchema = new Schema({
  idea: { type: String, required: true },
  sections: { type: [SectionSchema], default: [] },
  createdAt: { type: Date, default: Date.now }
});
