import { apiSlice } from "./apiSlice";
import { EXPERIENCE_URL } from "../constants";

export const experienceApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllExperiences: builder.query({
      query: () => `${EXPERIENCE_URL}`,
      providesTags: ['Experience'],
    }),
    createExperience: builder.mutation({
      query: (newExperience) => ({
        url: `${EXPERIENCE_URL}`,
        method: "POST",
        body: newExperience,
      }),
    }),
    updateExperience: builder.mutation({
      query: ({ id, updateExperience }) => ({
        url: `${EXPERIENCE_URL}/${id}`,
        method: "PUT",
        body: updateExperience,
      }),
    }),
    deleteExperience: builder.mutation({
      query: (id) => ({
        url: `${EXPERIENCE_URL}/${id}`,
        method: "DELETE",
      }),
    }),
    uploadImage: builder.mutation({
      query: (formData) => ({
        url: `${EXPERIENCE_URL}`,
        method: "POST",
        body: formData,
      }),
    }),
  }),
});

export const {
  useGetAllExperiencesQuery,
  useCreateExperienceMutation,
  useUpdateExperienceMutation,
  useUploadImageMutation,
  useDeleteExperienceMutation,
} = experienceApiSlice;
