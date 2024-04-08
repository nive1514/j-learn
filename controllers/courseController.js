import Course from '../models/CourseModel.js';
import { StatusCodes } from 'http-status-codes';


export const getAllCourses = async (req, res) => {
  const { search, language, courseType, sort } = req.query;

  const queryObject = {
    createdBy: req.user.userId,
  };

  if (search) {
    queryObject.$or = [
      { author: { $regex: search, $options: 'i' } },
      { title: { $regex: search, $options: 'i' } },
    ];
  }

  if (language && language !== 'all') {
    queryObject.language = language;
  }
  if (courseType && courseType !== 'all') {
    queryObject.courseType = courseType;
  }

  const sortOptions = {
    newest: '-createdAt',
    oldest: 'createdAt',
    'a-z': 'author',
    'z-a': '-author',
  };

  const sortKey = sortOptions[sort] || sortOptions.newest;

  // setup pagination

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const courses = await Course.find(queryObject)
    .sort(sortKey)
    .skip(skip)
    .limit(limit);

  const totalCourses = await Course.countDocuments(queryObject);
  const numOfPages = Math.ceil(totalCourses / limit);
  res
    .status(StatusCodes.OK)
    .json({ totalCourses, numOfPages, currentPage: page, courses });
};

export const createCourse = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const course = await Course.create(req.body);
  res.status(StatusCodes.CREATED).json({ course });
};

export const getCourse = async (req, res) => {
  const course = await Course.findById(req.params.id);
  res.status(StatusCodes.OK).json({ course });
};

export const updateCourse = async (req, res) => {
  const updatedCourse = await Course.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(StatusCodes.OK).json({ msg: 'course modified', course: updatedCourse });
};

export const deleteCourse = async (req, res) => {
  const removedCourse = await Course.findByIdAndDelete(req.params.id);
  res.status(StatusCodes.OK).json({ msg: 'course deleted', course: removedCourse });
};


