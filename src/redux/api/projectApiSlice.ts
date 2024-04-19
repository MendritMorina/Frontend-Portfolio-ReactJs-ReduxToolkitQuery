import { apiSlice } from "./apiSlice";
import { PROJECT_URL } from "../constants";

export const projectApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllProjects: builder.query({
      query: () => `${PROJECT_URL}`,
    }),
    createProject: builder.mutation({
      query: (newProject) => ({
        url: `${PROJECT_URL}`,
        method: "POST",
        body: newProject,
      }),
    }),
    updateProject: builder.mutation({
      query: ({ id, updateProject }) => ({
        url: `${PROJECT_URL}/${id}`,
        method: "PUT",
        body: updateProject,
      }),
    }),
    deleteProject: builder.mutation({
      query: (id) => ({
        url: `${PROJECT_URL}/${id}`,
        method: "DELETE",
      }),
    }),
    uploadImage: builder.mutation({
      query: (formData) => ({
        url: `${PROJECT_URL}`,
        method: "POST",
        body: formData,
      }),
    }),
  }),
});

export const {
  useGetAllProjectsQuery,
  useCreateProjectMutation,
  useUpdateProjectMutation,
  useUploadImageMutation,
  useDeleteProjectMutation,
} = projectApiSlice;
