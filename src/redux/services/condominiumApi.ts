import { api } from "./api";

export const condominiumApi = api.injectEndpoints({
  endpoints: (builder) => ({
    addCondominium: builder.mutation({
      query: (condominium) => ({
        url: "condominium/create-condominium",
        method: "POST",
        body: condominium,
      }),
      invalidatesTags: ["Condominium"],
    }),
  }),
});
export const { useAddCondominiumMutation } = condominiumApi;
