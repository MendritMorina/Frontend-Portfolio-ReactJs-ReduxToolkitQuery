import {apiSlice} from "./apiSlice";
import {INTRO_URL} from "../constants";

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
    }),
});

export const {
    useGetIntroQuery,
    useUpsertIntroMutation,
} = introApiSlice;
