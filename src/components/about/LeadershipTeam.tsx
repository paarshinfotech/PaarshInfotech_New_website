import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { ImagePreviewModal } from "@/components/common/ImagePreviewModal";
import { useGetMembersQuery, useGetCategoriesQuery } from "@/services/api";

interface TeamMember {
  _id: string;
  name: string;
  designation?: string;
  avatar: string;
  quote?: string;
  published: boolean;
  categoryId: string;
  order: number;
}

interface Category {
  _id: string;
  name: string;
  order: number;
}

// Leadership category IDs
const LEADERSHIP_CATEGORIES = [
  "6881c954d1ddcce4780ce19a", // Founder
  "6881ca05d1ddcce4780ce19d", // CEO
  "6881ca11d1ddcce4780ce1a0", // CFO
];

export default function LeadershipTeam() {
  const {
    data: members = [],
    isLoading: membersLoading,
    error: membersError,
  } = useGetMembersQuery(undefined);
  const { data: categories = [], isLoading: categoriesLoading } =
    useGetCategoriesQuery(undefined);

  // Get category name by ID
  const getCategoryName = (categoryId: string) => {
    const category = categories.find((cat: Category) => cat._id === categoryId);
    return category?.name || "Team Member";
  };

  // Filter leadership team based on category IDs
  const leadershipTeam = members
    .filter(
      (member: TeamMember) =>
        member.published && LEADERSHIP_CATEGORIES.includes(member.categoryId)
    )
    .sort(
      (a: TeamMember, b: TeamMember) =>
        LEADERSHIP_CATEGORIES.indexOf(a.categoryId) -
        LEADERSHIP_CATEGORIES.indexOf(b.categoryId)
    );

  // Loading state
  if (membersLoading || categoriesLoading) {
    return (
      <section className="py-16 md:py-24 bg-secondary">
        <div className="container max-w-7xl">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-primary">
              Loading Leadership Team...
            </h2>
            <p className="mt-4 text-lg text-foreground/70">
              Please wait while we fetch the team data.
            </p>
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (membersError) {
    return (
      <section className="py-16 md:py-24 bg-secondary">
        <div className="container max-w-7xl">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-primary">
              Oops! Something went wrong
            </h2>
            <p className="mt-4 text-lg text-foreground/70">
              We're having trouble loading the leadership team data.
            </p>
          </div>
        </div>
      </section>
    );
  }

  // No data state
  if (leadershipTeam.length === 0) {
    return (
      <section className="py-16 md:py-24 bg-secondary">
        <div className="container max-w-7xl">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-primary">
              Leadership Team
            </h2>
            <p className="mt-4 text-lg text-foreground/70">
              Our leadership team information will be available soon.
            </p>
          </div>
        </div>
      </section>
    );
  }

  const [founder, ceo, cfo] = leadershipTeam;

  return (
    <section className="py-16 md:py-24 bg-secondary">
      <div className="container max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary">
            Meet Our Leaders
          </h2>
          <p className="mt-4 text-lg text-foreground/70 max-w-2xl mx-auto">
            The driving force behind our innovation and success.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Founder Card - Spanning full width */}
          {founder && (
            <Card
              key={founder._id}
              className="group grid md:grid-cols-3 items-center gap-8 p-8 bg-background shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 lg:col-span-2"
            >
              <div className="flex justify-center md:col-span-1">
                <ImagePreviewModal
                  imgSrc={founder.avatar}
                  alt={`Portrait of ${founder.name}`}
                >
                  <div className="relative w-48 h-48 cursor-pointer">
                    <Image
                      src={founder.avatar}
                      alt={`Portrait of ${founder.name}`}
                      fill
                      className="object-cover rounded-full border-4 border-primary/10 transition-all duration-300 group-hover:border-accent"
                    />
                  </div>
                </ImagePreviewModal>
              </div>
              <div className="md:col-span-2 text-center md:text-left">
                <h3 className="text-3xl font-bold text-primary">
                  {founder.name}
                </h3>
                <p className="text-base text-accent font-semibold mb-4">
                  {getCategoryName(founder.categoryId)}
                </p>
                <blockquote className="text-lg text-foreground/80 italic border-l-4 border-accent pl-4">
                  "
                  {founder.quote ||
                    `Every legacy begins with a vision and the courage to pursue it. This journey was never just about building a company—it was about creating lasting impact, inspiring growth, and leading with purpose.`}
                  "
                </blockquote>
              </div>
            </Card>
          )}

          {/* CEO Card */}
          {ceo && (
            <Card
              key={ceo._id}
              className="group flex flex-col items-center gap-6 p-8 bg-background shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-center"
            >
              <ImagePreviewModal
                imgSrc={ceo.avatar}
                alt={`Portrait of ${ceo.name}`}
              >
                <div className="relative w-40 h-40 cursor-pointer">
                  <Image
                    src={ceo.avatar}
                    alt={`Portrait of ${ceo.name}`}
                    fill
                    className="object-cover rounded-full border-4 border-primary/10 transition-all duration-300 group-hover:border-accent"
                  />
                </div>
              </ImagePreviewModal>
              <div className="flex-grow">
                <h3 className="text-2xl font-bold text-primary">{ceo.name}</h3>
                <p className="text-sm text-accent font-semibold mb-3">
                  {getCategoryName(ceo.categoryId)}
                </p>
                <blockquote className="text-base text-foreground/80 italic">
                  "
                  {ceo.quote ||
                    `A true leader doesn’t just guide—they inspire belief in a better future. As CEO, my purpose is to turn bold ideas into impact and lead with vision that uplifts everyone around us.`}
                  "
                </blockquote>
              </div>
            </Card>
          )}

          {/* CFO Card */}
          {cfo && (
            <Card
              key={cfo._id}
              className="group flex flex-col items-center gap-6 p-8 bg-background shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-center"
            >
              <ImagePreviewModal
                imgSrc={cfo.avatar}
                alt={`Portrait of ${cfo.name}`}
              >
                <div className="relative w-40 h-40 cursor-pointer">
                  <Image
                    src={cfo.avatar}
                    alt={`Portrait of ${cfo.name}`}
                    fill
                    className="object-cover rounded-full border-4 border-primary/10 transition-all duration-300 group-hover:border-accent"
                  />
                </div>
              </ImagePreviewModal>
              <div className="flex-grow">
                <h3 className="text-2xl font-bold text-primary">{cfo.name}</h3>
                <p className="text-sm text-accent font-semibold mb-3">
                  {getCategoryName(cfo.categoryId)}
                </p>
                <blockquote className="text-base text-foreground/80 italic">
                  "
                  {cfo.quote ||
                    `Behind every strong vision is a foundation of trust and foresight. As CFO, I turn numbers into strategy, ensuring every step we take is grounded, clear, and future-ready.`}
                  "
                </blockquote>
              </div>
            </Card>
          )}
        </div>
      </div>
    </section>
  );
}
