import { api } from "./api";

export const uploadApi = api.injectEndpoints({
  endpoints: (builder) => ({
    uploadImage: builder.mutation({
      query: (image) => ({
        url: "images/create",
        method: "POST",
        body: image,
      }),
    }),
  }),
});

export const { useUploadImageMutation } = uploadApi;
