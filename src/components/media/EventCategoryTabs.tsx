import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {useGetMediaItemsQuery} from "@/services/api";

interface EventCategoryTabsProps {
  categories: readonly string[];
  activeCategory: string;
  setActiveCategory: (category: string) => void;
}



export default function EventCategoryTabs({
  categories,
  activeCategory,
  setActiveCategory,
}: EventCategoryTabsProps) {

  const { data: mediaItems, isLoading } = useGetMediaItemsQuery(undefined);
  console.log("Media Items : ", mediaItems);

  return (
    <section className="py-8 bg-secondary border-b">
      <div className="container max-w-7xl">
        <div className="flex flex-wrap justify-center gap-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={activeCategory === category ? "default" : "outline"}
              onClick={() => setActiveCategory(category)}
              className="capitalize"
            >
              {category.toLowerCase()}
            </Button>
          ))}
        </div>
      </div>
    </section>
  );
}
