import { apiSlice } from "./apiSlice";
import { INTRO_URL } from "../constants";

export const introApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getIntro: builder.query({
      query: () => `${INTRO_URL}`,
    }),
    upsertIntro: builder.mutation({
      query: (newIntro) => ({
        url: `${INTRO_URL}`,
        method: "POST",
        body: newIntro,
      }),
    }),
    deleteIntro: builder.mutation({
      query: (id) => ({
        url: `${INTRO_URL}/${id}`,
        method: "DELETE",
      }),
    }),
    uploadImage: builder.mutation({
      query: (formData) => ({
        url: `${INTRO_URL}`,
        method: "POST",
        body: formData,
      }),
    }),
  }),
});

export const {
  useGetIntroQuery,
  useUpsertIntroMutation,
  useUploadImageMutation,
  useDeleteIntroMutation,
} = introApiSlice;
