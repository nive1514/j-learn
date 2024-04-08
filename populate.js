import { readFile } from 'fs/promises';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

import Course from './models/CourseModel.js';
import User from './models/UserModel.js';

try {
  await mongoose.connect(process.env.MONGO_URL);
  const user = await User.findOne({ email: 'john@gmail.com' });
  const jsonCourses = JSON.parse(
    await readFile(new URL('./utils/mockData.json', import.meta.url))
  );
  const courses = jsonCourses.map((course) => {
    return { ...course, createdBy: user._id };
  });
  await Course.deleteMany({ createdBy: user._id });
  await Course.create(courses);
  console.log('Success!!!');
  process.exit(0);
} catch (error) {
  console.log(error);
  process.exit(1);
}
