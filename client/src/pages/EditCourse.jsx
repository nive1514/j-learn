import { FormRow, FormRowSelect, SubmitBtn } from '../components';
import Wrapper from '../assets/wrappers/DashboardFormPage';
import { useLoaderData, useParams } from 'react-router-dom';
import { LANGUAGE, COURSE_TYPE } from '../../../utils/constants';
import { Form, redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import customFetch from '../utils/customFetch';
import { useQuery } from '@tanstack/react-query';

const singleCourseQuery = (id) => {
  return {
    queryKey: ['course', id],
    queryFn: async () => {
      const { data } = await customFetch.get(`/courses/${id}`);
      return data;
    },
  };
};

export const loader =
  (queryClient) =>
  async ({ params }) => {
    try {
      await queryClient.ensureQueryData(singleCourseQuery(params.id));
      return params.id;
    } catch (error) {
      toast.error(error?.response?.data?.msg);
      return redirect('/dashboard/all-courses');
    }
  };
export const action =
  (queryClient) =>
  async ({ request, params }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    try {
      await customFetch.patch(`/courses/${params.id}`, data);
      queryClient.invalidateQueries(['courses']);

      toast.success('Course edited successfully');
      return redirect('/dashboard/all-courses');
    } catch (error) {
      toast.error(error?.response?.data?.msg);
      return error;
    }
  };

const EditCourse = () => {
  const id = useLoaderData();

  const {
    data: { course },
  } = useQuery(singleCourseQuery(id));

  return (
    <Wrapper>
      <Form method='post' className='form'>
        <h4 className='form-title'>edit course</h4>
        <div className='form-center'>
          <FormRow type='text' name='author' defaultValue={course.author} />
          <FormRow type='text' name='title' defaultValue={course.title} />
          <FormRow
            type='text'
            name='location'
            labelText='course location'
            defaultValue={course.location}
          />
          <FormRowSelect
            name='language'
            labelText='course status'
            defaultValue={course.language}
            list={Object.values(LANGUAGE)}
          />
          <FormRowSelect
            name='courseType'
            labelText='course type'
            defaultValue={course.courseType}
            list={Object.values(COURSE_TYPE)}
          />
          <SubmitBtn formBtn />
        </div>
      </Form>
    </Wrapper>
  );
};
export default EditCourse;
