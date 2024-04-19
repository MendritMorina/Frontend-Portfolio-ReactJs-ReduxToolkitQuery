import { apiSlice } from "./apiSlice";
import {CONTACT_URL} from "../constants";

export const contactApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllEmails: builder.query({
      query: () => `${CONTACT_URL}`,
      providesTags: ['Contact'],
    }),
    sendEmail: builder.mutation({
      query: (newExperience) => ({
        url: `${CONTACT_URL}`,
        method: "POST",
        body: newExperience,
      }),
    }),
    deleteContact: builder.mutation({
      query: (id) => ({
        url: `${CONTACT_URL}/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetAllEmailsQuery,
  useSendEmailMutation,
  useDeleteContactMutation,
} = contactApiSlice;
