import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }), // Adjust if your API is elsewhere
  tagTypes: [
    "Post",
    "User",
    "DBStatus",
    "TeamCategory",
    "Contact",
    "SocialPost",
    "Job",
    "Applicant",
    "Client",
    "TeamMember",
    "Category",
    "Media", // Add Media tag
  ], // Define tags for caching
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

    reorderCategories: builder.mutation({
      query: (categories) => ({
        url: "/team-category",
        method: "PATCH",
        body: { categories },
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
    reorderMembers: builder.mutation({
      query: (members) => ({
        url: "/team-member",
        method: "PATCH",
        body: { members },
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
    reorderClients: builder.mutation({
      query: (clients) => ({
        url: "/client",
        method: "PATCH",
        body: { clients },
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
        url: `/social-post`,
        method: "PUT",
        body: { _id, ...post },
      }),
      invalidatesTags: ["SocialPost"],
    }),
    deleteSocialPost: builder.mutation({
      query: (_id) => ({
        url: `/social-post`,
        method: "DELETE",
        body: { _id },
      }),
      invalidatesTags: ["SocialPost"],
    }),

    // ================================================== Contact Endpoints ================================================== //

    getContacts: builder.query({
      query: () => "/contact",
      providesTags: ["Contact"],
    }),
    addContact: builder.mutation({
      query: (contact) => ({
        url: "/contact",
        method: "POST",
        body: contact,
      }),
      invalidatesTags: ["Contact"],
    }),
    updateContactStatus: builder.mutation({
      query: ({ _id, status }) => ({
        url: `/contact`,
        method: "PUT",
        body: { _id, status },
      }),
      invalidatesTags: ["Contact"],
    }),
    deleteContact: builder.mutation({
      query: (_id) => ({
        url: `/contact`,
        method: "DELETE",
        body: { _id },
      }),
      invalidatesTags: ["Contact"],
    }),

    // ================================================== Media Endpoints ================================================== //

    getMediaItems: builder.query({
      query: (type) => `/media?type=${type}`,
      providesTags: ["Media"],
    }),

    addMediaItem: builder.mutation({
      query: (data) => ({
        url: "/media",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Media"],
    }),

    updateMediaItem: builder.mutation({
      query: (data) => ({
        url: "/media",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Media"],
    }),

    deleteMediaItem: builder.mutation({
      query: (data) => ({
        url: "/media",
        method: "DELETE",
        body: data,
      }),
      invalidatesTags: ["Media"],
    }),

    reorderMediaItems: builder.mutation({
      query: (data) => ({
        url: "/media",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Media"],
    }),
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
  useReorderCategoriesMutation,

  useGetMembersQuery,
  useAddMemberMutation,
  useUpdateMemberMutation,
  useDeleteMemberMutation,
  useReorderMembersMutation,

  useGetClientsQuery,
  useAddClientMutation,
  useUpdateClientMutation,
  useDeleteClientMutation,
  useReorderClientsMutation,

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

  useGetContactsQuery,
  useAddContactMutation,
  useUpdateContactStatusMutation,
  useDeleteContactMutation,

  // Media exports
  useGetMediaItemsQuery,
  useAddMediaItemMutation,
  useUpdateMediaItemMutation,
  useDeleteMediaItemMutation,
  useReorderMediaItemsMutation,
} = api;
