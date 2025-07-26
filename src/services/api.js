
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { add } from "date-fns";
import { use } from "react";

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
    "Media",
    "SiteImage",
    "Service",
    "Testimonial",
    "Project",
    "JourneyMilestone",
    "CultureMoment",
    "Partner",
    "Program",
    
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
    
    // ================================================== Site Image Endpoints ================================================== //

    getSiteImages: builder.query({
      query: () => '/site-images',
      providesTags: ['SiteImage'],
    }),
    
    addSiteImage: builder.mutation({
      query: (imageData) => ({
        url: '/site-images',
        method: 'POST',
        body: imageData,
      }),
      invalidatesTags: ['SiteImage'],
    }),
    updateSiteImage: builder.mutation({
      query: (imageData) => ({
        url: `/site-images`,
        method: 'PUT',
        body: imageData,
      }),
      invalidatesTags: ['SiteImage'],
    }),
    deleteSiteImage: builder.mutation({
      query: (_id) => ({
        url: '/site-images',
        method: 'DELETE',
        body: { _id },
      }),
      invalidatesTags: ['SiteImage'],
    }),

    // ================================================== Testimonial Endpoints ================================================== //

    getTestimonials: builder.query({
      query: () => '/testimonial',
      providesTags: ['Testimonial'],
    }),

    addTestimonial: builder.mutation({
      query: (testimonial) => ({
        url: '/testimonial',
        method: 'POST',
        body: testimonial,
      }),
      invalidatesTags: ['Testimonial'],
    }),

    updateTestimonial: builder.mutation({
      query: (testimonial) => ({
        url: '/testimonial',
        method: 'PATCH',
        body: testimonial,
      }),
      invalidatesTags: ['Testimonial'],
    }),

    deleteTestimonial: builder.mutation({
      query: (id) => ({
        url: `/testimonial?id=${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Testimonial'],
    }),
    // ================================================== Journey Milestone Endpoints ================================================== //

    getJourneyMilestones: builder.query({
      query: (activeOnly = false) => `/journey-milestone${activeOnly ? '?activeOnly=true' : ''}`,
      providesTags: ["JourneyMilestone"],
    }),
    addJourneyMilestone: builder.mutation({
      query: (milestone) => ({
        url: "/journey-milestone",
        method: "POST",
        body: milestone,
      }),
      invalidatesTags: ["JourneyMilestone"],
    }),
    updateJourneyMilestone: builder.mutation({
      query: ({ _id, ...milestone }) => ({
        url: `/journey-milestone`,
        method: "PUT",
        body: { _id, ...milestone },
      }),
      invalidatesTags: ["JourneyMilestone"],
    }),
    deleteJourneyMilestone: builder.mutation({
      query: (_id) => ({
        url: `/journey-milestone`,
        method: "DELETE",
        body: { _id },
      }),
      invalidatesTags: ["JourneyMilestone"],
    }),
    reorderJourneyMilestones: builder.mutation({
      query: (milestones) => ({
        url: "/journey-milestone",
        method: "PATCH",
        body: { milestones },
      }),
      invalidatesTags: ["JourneyMilestone"],
    }),

    // ================================================== Culture Moment Endpoints ================================================== //

    getCultureMoments: builder.query({
      query: (activeOnly = false) => `/culture-moment${activeOnly ? '?activeOnly=true' : ''}`,
      providesTags: ["CultureMoment"],
    }),
    addCultureMoment: builder.mutation({
      query: (moment) => ({
        url: "/culture-moment",
        method: "POST",
        body: moment,
      }),
      invalidatesTags: ["CultureMoment"],
    }),
    updateCultureMoment: builder.mutation({
      query: ({ _id, ...moment }) => ({
        url: `/culture-moment`,
        method: "PUT",
        body: { _id, ...moment },
      }),
      invalidatesTags: ["CultureMoment"],
    }),
    deleteCultureMoment: builder.mutation({
      query: (_id) => ({
        url: `/culture-moment`,
        method: "DELETE",
        body: { _id },
      }),
      invalidatesTags: ["CultureMoment"],
    }),
    reorderCultureMoments: builder.mutation({
      query: (moments) => ({
        url: "/culture-moment",
        method: "PATCH",
        body: { moments },
      }),
      invalidatesTags: ["CultureMoment"],
    }),

    // ================================================== Testimonial Endpoints ================================================== //

    getTestimonials: builder.query({
      query: (activeOnly = false) => `/testimonial${activeOnly ? '?activeOnly=true' : ''}`,
      providesTags: ["Testimonial"],
    }),
    addTestimonial: builder.mutation({
      query: (testimonial) => ({
        url: "/testimonial",
        method: "POST",
        body: testimonial,
      }),
      invalidatesTags: ["Testimonial"],
    }),
    updateTestimonial: builder.mutation({
      query: ({ _id, ...testimonial }) => ({
        url: `/testimonial`,
        method: "PUT",
        body: { _id, ...testimonial },
      }),
      invalidatesTags: ["Testimonial"],
    }),
    deleteTestimonial: builder.mutation({
      query: (_id) => ({
        url: `/testimonial`,
        method: "DELETE",
        body: { _id },
      }),
      invalidatesTags: ["Testimonial"],
    }),
    reorderTestimonials: builder.mutation({
      query: (testimonials) => ({
        url: "/testimonial",
        method: "PATCH",
        body: { testimonials },
      }),
      invalidatesTags: ["Testimonial"],
    }),

    // ================================================== Excellence Center Endpoints ================================================== //

    getPartners: builder.query({
      query: () => "/ec-partner",
      providesTags: ["Partner"],
    }),
    addPartner: builder.mutation({
      query: (partner) => ({ url: "/ec-partner", method: "POST", body: partner }),
      invalidatesTags: ["Partner"],
    }),
    updatePartner: builder.mutation({
      query: (partner) => ({ url: "/ec-partner", method: "PUT", body: partner }),
      invalidatesTags: ["Partner"],
    }),
    deletePartner: builder.mutation({
      query: (body) => ({ url: "/ec-partner", method: "DELETE", body }),
      invalidatesTags: ["Partner"],
    }),
    reorderPartners: builder.mutation({
      query: (body) => ({ url: "/ec-partner", method: "PATCH", body }),
      invalidatesTags: ["Partner"],
    }),

    getPrograms: builder.query({
      query: () => "/ec-program",
      providesTags: ["Program"],
    }),
    addProgram: builder.mutation({
      query: (program) => ({ url: "/ec-program", method: "POST", body: program }),
      invalidatesTags: ["Program"],
    }),
    updateProgram: builder.mutation({
      query: (program) => ({ url: "/ec-program", method: "PUT", body: program }),
      invalidatesTags: ["Program"],
    }),
    deleteProgram: builder.mutation({
      query: (body) => ({ url: "/ec-program", method: "DELETE", body }),
      invalidatesTags: ["Program"],
    }),
    reorderPrograms: builder.mutation({
      query: (body) => ({ url: "/ec-program", method: "PATCH", body }),
      invalidatesTags: ["Program"],
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

  useGetServicesQuery,
  useAddServiceMutation,
  useUpdateServiceMutation,
  useDeleteServiceMutation,

  useFetchServiceByIdQuery,

  useGetProductsQuery,
  useGetProductByIdQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
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
  
  // Site Images
  useGetSiteImagesQuery,
  useAddSiteImageMutation,
  useUpdateSiteImageMutation,
  useDeleteSiteImageMutation,

  // Journey Milestones
  useGetJourneyMilestonesQuery,
  useAddJourneyMilestoneMutation,
  useUpdateJourneyMilestoneMutation,
  useDeleteJourneyMilestoneMutation,
  useReorderJourneyMilestonesMutation,

  // Culture Moments
  useGetCultureMomentsQuery,
  useAddCultureMomentMutation,
  useUpdateCultureMomentMutation,
  useDeleteCultureMomentMutation,
  useReorderCultureMomentsMutation,

  // Testimonials
  useGetTestimonialsQuery,
  useAddTestimonialMutation,
  useUpdateTestimonialMutation,
  useDeleteTestimonialMutation,

  // Excellence Center
  useGetPartnersQuery,
  useAddPartnerMutation,
  useUpdatePartnerMutation,
  useDeletePartnerMutation,
  useReorderPartnersMutation,

  useGetProgramsQuery,
  useAddProgramMutation,
  useUpdateProgramMutation,
  useDeleteProgramMutation,
  useReorderProgramsMutation,

} = api;
