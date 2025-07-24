

import Image from "next/image";
import { ImagePreviewModal } from "@/components/common/ImagePreviewModal";
import { useGetMembersQuery, useGetCategoriesQuery } from "@/services/api";

interface TeamMember {
  _id: string;
  name: string;
  designation?: string;
  avatar: string;
  published: boolean;
  categoryId: string;
  order: number;
}

interface Category {
  _id: string;
  name: string;
  order: number;
}

// Leadership category IDs to exclude
const LEADERSHIP_CATEGORIES = [
  "6881c954d1ddcce4780ce19a", // Founder
  "6881ca05d1ddcce4780ce19d", // CEO
  "6881ca11d1ddcce4780ce1a0", // CFO
];

export default function TeamGrid() {
  const { data: members = [], isLoading: membersLoading, error: membersError } = useGetMembersQuery(undefined);
  const { data: categories = [], isLoading: categoriesLoading } = useGetCategoriesQuery(undefined);

  // Get category name by ID
  const getCategoryName = (categoryId: string) => {
    const category = categories.find((cat: Category) => cat._id === categoryId);
    return category?.name || "Team Member";
  };

  // Filter out leadership team and get only published members
  const teamMembers = members
    .filter((member: TeamMember) => 
      member.published && !LEADERSHIP_CATEGORIES.includes(member.categoryId)
    )
    .sort((a: TeamMember, b: TeamMember) => {
      // First sort by order
      return a.order - b.order;
    });

  // Loading state
  if (membersLoading || categoriesLoading) {
    return (
      <section className="py-16 md:py-24 bg-background">
        <div className="container max-w-7xl">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-primary">Loading Team Members...</h2>
            <p className="mt-4 text-lg text-foreground/70">Please wait while we fetch the team data.</p>
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (membersError) {
    return (
      <section className="py-16 md:py-24 bg-background">
        <div className="container max-w-7xl">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-primary">Oops! Something went wrong</h2>
            <p className="mt-4 text-lg text-foreground/70">We're having trouble loading the team data.</p>
          </div>
        </div>
      </section>
    );
  }

  // No data state
  if (teamMembers.length === 0) {
    return (
      <section className="py-16 md:py-24 bg-background">
        <div className="container max-w-7xl">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-primary">Our Team</h2>
            <p className="mt-4 text-lg text-foreground/70">Team member information will be available soon.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary">Our Team</h2>
          <p className="mt-4 text-lg text-foreground/70 max-w-2xl mx-auto">
            Meet the talented individuals who make our vision a reality.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {teamMembers.map((member: TeamMember) => (
            <div key={member._id} className="group relative flex flex-col items-center text-center">
              <ImagePreviewModal imgSrc={member.avatar} alt={member.name}>
                <div className="relative w-44 h-44 cursor-pointer">
                  <Image
                    src={member.avatar}
                    alt={member.name}
                    width={176}
                    height={176}
                    className="rounded-full object-cover border-4 border-background shadow-lg transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
              </ImagePreviewModal>
              <div className="mt-4">
                <h3 className="text-xl font-bold text-primary">{member.name}</h3>
                <p className="text-sm text-accent font-semibold">{getCategoryName(member.categoryId)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
