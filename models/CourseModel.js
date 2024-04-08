import mongoose from 'mongoose';
import { LANGUAGE, COURSE_TYPE } from '../utils/constants.js';
const CourseSchema = new mongoose.Schema(
  {
    title: String,
    author: String,
    language: {
      type: String,
      enum: Object.values(LANGUAGE),
      default: LANGUAGE.JAVASCRIPT,
    },
    courseType: {
      type: String,
      enum: Object.values(COURSE_TYPE),
      default: COURSE_TYPE.FULL_TIME,
    },
    location: {
      type: String,
      default: 'my city',
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
);

export default mongoose.model('Course', CourseSchema);
