import Wrapper from '../assets/wrappers/CourseInfo';

const CourseInfo = ({ icon, text }) => {
  return (
    <Wrapper>
      <span className='course-icon'>{icon}</span>
      <span className='course-text'>{text}</span>
    </Wrapper>
  );
};
export default CourseInfo;
