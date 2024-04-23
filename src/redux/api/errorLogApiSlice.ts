import {apiSlice} from "./apiSlice";
import {ERROR_URL} from "../constants";

export const errorLogApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getErrorLog: builder.query({
            query: ({ fromDate, toDate }) => ({
                url: ERROR_URL,
                method: 'GET',
                params: { fromDate, toDate },
            }),
        }),
    }),
});

export const {
    useGetErrorLogQuery,
} = errorLogApiSlice;
