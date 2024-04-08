import { FormRow, FormRowSelect, SubmitBtn } from '../components';
import Wrapper from '../assets/wrappers/DashboardFormPage';
import { useOutletContext } from 'react-router-dom';
import { LANGUAGE, COURSE_TYPE } from '../../../utils/constants';
import { Form, redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import customFetch from '../utils/customFetch';

export const action =
  (queryClient) =>
  async ({ request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    try {
      await customFetch.post('/courses', data);
      queryClient.invalidateQueries(['courses']);
      toast.success('Course added successfully ');
      return redirect('all-courses');
    } catch (error) {
      toast.error(error?.response?.data?.msg);
      return error;
    }
  };

const AddCourse = () => {
  const { user } = useOutletContext();

  return (
    <Wrapper>
      <Form method='post' className='form'>
        <h4 className='form-title'>add course</h4>
        <div className='form-center'>
          <FormRow type='text' name='author' />
          <FormRow type='text' name='title' />
          <FormRow
            type='text'
            labelText='location'
            name='location'
            defaultValue={user.location}
          />
          <FormRowSelect
            labelText='language'
            name='language'
            defaultValue={LANGUAGE.PENDING}
            list={Object.values(LANGUAGE)}
          />
          <FormRowSelect
            labelText='course type'
            name='courseType'
            defaultValue={COURSE_TYPE.FULL_TIME}
            list={Object.values(COURSE_TYPE)}
          />
          <SubmitBtn formBtn />
        </div>
      </Form>
    </Wrapper>
  );
};
export default AddCourse;
