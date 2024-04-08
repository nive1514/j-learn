import Course from './Course';
import Wrapper from '../assets/wrappers/CourseContainer';
import { useAllCoursesContext } from '../pages/AllCourses';
import PageBtnContainer from './PageBtnContainer';
const CourseContainer = () => {
  const { data } = useAllCoursesContext();

  const { courses, totalCourses, numOfPages } = data;
  if (courses.length === 0) {
    return (
      <Wrapper>
        <h2>No courses to display...</h2>
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <h5>
        {totalCourses} course{courses.length > 1 && 's'} found
      </h5>
      <div className='courses'>
        {courses.map((course) => {
          return <Course key={course._id} {...course} />;
        })}
      </div>
      {numOfPages > 1 && <PageBtnContainer />}
    </Wrapper>
  );
};
export default CourseContainer;
