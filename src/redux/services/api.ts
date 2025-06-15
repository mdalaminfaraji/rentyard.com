import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    prepareHeaders: (headers) => {
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODQ0NGFjOTMyZGM2NzFlNDM0M2U1MGUiLCJyb2xlIjoidXNlciIsImlhdCI6MTc0OTkwMzQ2OSwiZXhwIjoxNzUyNDk1NDY5fQ.NwFd33xc8EVR7A9jN3_oC47-q-_iHTSaO2bDwZOY-JE";

      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  tagTypes: ["Condominium"],
  endpoints: () => ({}),
});
