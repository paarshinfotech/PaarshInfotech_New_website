import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { use } from "react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }), // Adjust if your API is elsewhere
  tagTypes: ["Post", "User", "DBStatus", "TeamCategory"], // Define tags for caching
  endpoints: (builder) => ({
    // ================================================== DB Connection Endpoints ================================================== //

    getDbStatus: builder.query({
      query: () => "test-connection",
      providesTags: ["DBStatus"],
    }),
    getPosts: builder.query({
      query: () => "posts",
      providesTags: ["Post"],
    }),
    getPost: builder.query({
      query: (id) => `posts/${id}`,
      providesTags: (result, error, id) => [{ type: "Post", id }],
    }),

    // ================================================== Category Endpoints ================================================== //

    getCategories: builder.query({
      query: () => "/team-category",
      providesTags: ["TeamCategory"],
    }),
    addCategory: builder.mutation({
      query: (category) => ({
        url: "/team-category",
        method: "POST",
        body: category,
      }),
      invalidatesTags: ["TeamCategory"],
    }),
    updateCategory: builder.mutation({
      query: ({ _id, ...category }) => ({
        url: `/team-category`,
        method: "PUT",
        body: { _id, ...category },
      }),
      invalidatesTags: ["TeamCategory"],
    }),
    deleteCategory: builder.mutation({
      query: (_id) => ({
        url: `/team-category`,
        method: "DELETE",
        body: { _id },
      }),
      invalidatesTags: ["TeamCategory"],
    }),

    // ================================================== Team Member Endpoints ================================================== //

    getMembers: builder.query({
      query: () => "/team-member",
      providesTags: ["TeamMember"],
    }),
    addMember: builder.mutation({
      query: (member) => ({
        url: "/team-member",
        method: "POST",
        body: member,
      }),
      invalidatesTags: ["TeamMember"],
    }),
    updateMember: builder.mutation({
      query: ({ _id, ...member }) => ({
        url: `/team-member`,
        method: "PUT",
        body: { _id, ...member },
      }),
      invalidatesTags: ["TeamMember"],
    }),
    deleteMember: builder.mutation({
      query: (_id) => ({
        url: `/team-member`,
        method: "DELETE",
        body: { _id },
      }),
      invalidatesTags: ["TeamMember"],
    }),

    // ================================================== Client Endpoints ================================================== //

    getClients: builder.query({
      query: () => "/client",
      providesTags: ["Client"],
    }),
    addClient: builder.mutation({
      query: (client) => ({
        url: "/client",
        method: "POST",
        body: client,
      }),
      invalidatesTags: ["Client"],
    }),
    updateClient: builder.mutation({
      query: ({ _id, ...client }) => ({
        url: `/client`,
        method: "PUT",
        body: { _id, ...client },
      }),
      invalidatesTags: ["Client"],
    }),
    deleteClient: builder.mutation({
      query: (_id) => ({
        url: `/client`,
        method: "DELETE",
        body: { _id },
      }),
      invalidatesTags: ["Client"],
    }),

    // ================================================== Job Endpoints ================================================== //

    getJobs: builder.query({
      query: () => "/job",
      providesTags: ["Job"],
    }),
    addJob: builder.mutation({
      query: (job) => ({
        url: "/job",
        method: "POST",
        body: job,
      }),
      invalidatesTags: ["Job"],
    }),
    updateJob: builder.mutation({
      query: ({ _id, ...job }) => ({
        url: `/job`,
        method: "PUT",
        body: { _id, ...job },
      }),
      invalidatesTags: ["Job"],
    }),
    deleteJob: builder.mutation({
      query: (_id) => ({
        url: `/job`,
        method: "DELETE",
        body: { _id },
      }),
      invalidatesTags: ["Job", "Applicant"],
    }),

    // ================================================== Applicant Endpoints ================================================== //

    addApplicant: builder.mutation({
      query: ({ jobId, ...applicant }) => ({
        url: `/job/${jobId}/applicants`,
        method: "POST",
        body: applicant,
      }),
      invalidatesTags: ["Job", "Applicant"],
    }),

    getApplicantsByJob: builder.query({
      query: (jobId) => `/job?populateApplicants=true&id=${jobId}`,
      providesTags: ["Applicant"],
      transformResponse: (response) => {
        const job = Array.isArray(response) ? response[0] : response;
        return job?.applicants || [];
      },
    }),

    // ================================================== Social Post Endpoints ================================================== //

    getSocialPosts: builder.query({
      query: () => "/social-post",
      providesTags: ["SocialPost"],
    }),
    addSocialPost: builder.mutation({
      query: (post) => ({
        url: "/social-post",
        method: "POST",
        body: post,
      }),
      invalidatesTags: ["SocialPost"],
    }),
    updateSocialPost: builder.mutation({
      query: ({ _id, ...post }) => ({
        url: `/social-post/${_id}`,
        method: "PUT",
        body: { _id, ...post },
      }),
      invalidatesTags: ["SocialPost"],
    }),
    deleteSocialPost: builder.mutation({
      query: (_id) => ({
        url: `/social-post/${_id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["SocialPost"],
    }),

    // ================================================== Services Endpoints ================================================== //

    getServices: builder.query({
      query: () => "/services",
      providesTags: ["Service"],
    }),

    addService: builder.mutation({
      query: (serviceData) => ({
        url: "/services",
        method: "POST",
        body: serviceData,
      }),
      invalidatesTags: ["Service"],
    }),

    updateService: builder.mutation({
      query: ({ id, ...service }) => ({
        url: `/services`,
        method: "PUT",
        body: { id, ...service },
      }),
      invalidatesTags: ["Service"],
    }),

    deleteService: builder.mutation({
      query: (id) => ({
        url: `/services?_id=${id}`,
        method: "DELETE",
        body: id,
      }),
      invalidatesTags: ["Service"],
    }),

    fetchServiceById: builder.query({
      query: (id) => `/services/service?id=${id}`,
      providesTags: ["Service"],
    }),

    // ================================================== Product Endpoints ================================================== //

    addProduct: builder.mutation({
      query: (product) => ({
        url: "/products",
        method: "POST",
        body: product,
      }),
      invalidatesTags: ["Product"],
    }),

    updateProduct: builder.mutation({
      query: ({ _id, ...product }) => ({
        url: `/products`,
        method: "PUT",
        body: { _id , ...product },
      }),
      invalidatesTags: ["Product"],
    }),

    deleteProduct: builder.mutation({
      query: (_id) => ({
        url: `/products`,
        method: "DELETE",
        body: { _id },
      }),
      invalidatesTags: ["Product"],
    }),

    getProducts: builder.query({
      query: () => "/products",
      providesTags: ["Product"],
    }),

    getProductById: builder.query({
      query: (id) => `/products/${id}`,
      providesTags: ["Product"],
    })
  }),
});

export const {
  useGetDbStatusQuery,
  useGetPostsQuery,
  useGetPostQuery,

  useGetCategoriesQuery,
  useAddCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,

  useGetMembersQuery,
  useAddMemberMutation,
  useUpdateMemberMutation,
  useDeleteMemberMutation,

  useGetClientsQuery,
  useAddClientMutation,
  useUpdateClientMutation,
  useDeleteClientMutation,

  useGetJobsQuery,
  useAddJobMutation,
  useUpdateJobMutation,
  useDeleteJobMutation,

  useAddApplicantMutation,
  useGetApplicantsByJobQuery,

  useGetSocialPostsQuery,
  useAddSocialPostMutation,
  useUpdateSocialPostMutation,
  useDeleteSocialPostMutation,

  useGetServicesQuery,
  useAddServiceMutation,
  useUpdateServiceMutation,
  useDeleteServiceMutation,

  useFetchServiceByIdQuery,

  useGetProductsQuery,
  useGetProductByIdQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation
} = api;
