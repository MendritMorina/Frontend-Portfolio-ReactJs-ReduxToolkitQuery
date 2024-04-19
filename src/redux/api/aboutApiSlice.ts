import { apiSlice } from "./apiSlice";
import { ABOUT_URL } from "../constants";

export const aboutApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAbout: builder.query({
      query: () => `${ABOUT_URL}`,
    }),
    upsertAbout: builder.mutation({
      query: (newAbout) => ({
        url: `${ABOUT_URL}`,
        method: "POST",
        body: newAbout,
      }),
    }),
    deleteAbout: builder.mutation({
      query: (id) => ({
        url: `${ABOUT_URL}/${id}`,
        method: "DELETE",
      }),
    }),
    uploadImage: builder.mutation({
      query: (formData) => ({
        url: `${ABOUT_URL}`,
        method: "POST",
        body: formData,
      }),
    }),
  }),
});

export const {
  useGetAboutQuery,
  useUpsertAboutMutation,
  useUploadImageMutation,
  useDeleteAboutMutation,
} = aboutApiSlice;
