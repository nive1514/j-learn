import { FormRow, FormRowSelect, SubmitBtn } from '.';
import Wrapper from '../assets/wrappers/DashboardFormPage';
import { Form, useSubmit, Link } from 'react-router-dom';
import { COURSE_TYPE, LANGUAGE, COURSE_SORT_BY } from '../../../utils/constants';
import { useAllCoursesContext } from '../pages/AllCourses';

const SearchContainer = () => {
  const { searchValues } = useAllCoursesContext();
  const { search, language, courseType, sort } = searchValues;
  const submit = useSubmit();

  const debounce = (onChange) => {
    let timeout;
    return (e) => {
      const form = e.currentTarget.form;
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        onChange(form);
      }, 2000);
    };
  };
  return (
    <Wrapper>
      <Form className='form'>
        <h5 className='form-title'>search form</h5>
        <div className='form-center'>
          <FormRow
            type='search'
            name='search'
            defaultValue={search}
            onChange={debounce((form) => {
              submit(form);
            })}
          />

          <FormRowSelect
            labelText='language'
            name='language'
            list={['all', ...Object.values(LANGUAGE)]}
            defaultValue={language}
            onChange={(e) => {
              submit(e.currentTarget.form);
            }}
          />
          <FormRowSelect
            labelText='course type'
            name='courseType'
            list={['all', ...Object.values(COURSE_TYPE)]}
            defaultValue={courseType}
            onChange={(e) => {
              submit(e.currentTarget.form);
            }}
          />
          <FormRowSelect
            name='sort'
            defaultValue={sort}
            list={[...Object.values(COURSE_SORT_BY)]}
            onChange={(e) => {
              submit(e.currentTarget.form);
            }}
          />
          <Link to='/dashboard/all-courses' className='btn form-btn delete-btn'>
            Reset Search Values
          </Link>
        </div>
      </Form>
    </Wrapper>
  );
};
export default SearchContainer;
