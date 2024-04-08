import { FaLocationArrow, FaBriefcase, FaCalendarAlt } from 'react-icons/fa';
import { Link, Form } from 'react-router-dom';
import Wrapper from '../assets/wrappers/Course';
import CourseInfo from './CourseInfo';
import day from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
day.extend(advancedFormat);

const Course = ({
  _id,
  author,
  title,
  location,
  courseType,
  createdAt,
  language,
}) => {
  const date = day(createdAt).format('MMM Do, YYYY');
  return (
    <Wrapper>
      <header>
        <div className='main-icon'>{title.charAt(0)}</div>
        <div className='info'>
          <h5>{author}</h5>
          <p>{title}</p>
        </div>
      </header>
      <div className='content'>
        <div className='content-center'>
          <CourseInfo icon={<FaLocationArrow />} text={location} />
          <CourseInfo icon={<FaCalendarAlt />} text={date} />
          <CourseInfo icon={<FaBriefcase />} text={courseType} />
          <div className={`status ${language}`}>{language}</div>
        </div>
        <footer className='actions'>
          <Link to={`../edit-course/${_id}`} className='btn edit-btn'>
            Edit
          </Link>
          <Form method='post' action={`../delete-course/${_id}`}>
            <button type='submit' className='btn delete-btn'>
              Delete
            </button>
          </Form>
        </footer>
      </div>
    </Wrapper>
  );
};
export default Course;
