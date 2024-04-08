import { toast } from 'react-toastify';
import { CourseContainer, SearchContainer } from '../components';
import customFetch from '../utils/customFetch';
import { useLoaderData } from 'react-router-dom';
import { useContext, createContext } from 'react';
import { useQuery } from '@tanstack/react-query';

const allCoursesQuery = (params) => {
  const { search, language, courseType, sort, page } = params;
  return {
    queryKey: [
      'courses',
      search ?? '',
      language ?? 'all',
      courseType ?? 'all',
      sort ?? 'newest',
      page ?? 1,
    ],
    queryFn: async () => {
      const { data } = await customFetch.get('/courses', {
        params,
      });
      return data;
    },
  };
};

export const loader =
  (queryClient) =>
  async ({ request }) => {
    const params = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ]);

    await queryClient.ensureQueryData(allCoursesQuery(params));
    return { searchValues: { ...params } };
  };

const AllCoursesContext = createContext();
const AllCourses = () => {
  const { searchValues } = useLoaderData();
  const { data } = useQuery(allCoursesQuery(searchValues));
  return (
    <AllCoursesContext.Provider value={{ data, searchValues }}>
      <SearchContainer />
      <CourseContainer />
    </AllCoursesContext.Provider>
  );
};

export const useAllCoursesContext = () => useContext(AllCoursesContext);

export default AllCourses;
