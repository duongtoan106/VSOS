import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "./baseRequest";
import endpoints from "../consts/endpoints";

const Api = createApi({
  reducerPath: "Api",
  baseQuery: axiosBaseQuery(), // Adjust base URL as needed
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: endpoints.LOGIN,
        method: "POST",
        data: credentials,
      }),
    }),
  }),
});

export const { useLoginMutation } = Api;

export default Api;
