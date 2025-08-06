
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

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
              {category.replace(/_/g, ' ')}
            </Button>
          ))}
        </div>
      </div>
    </section>
  );
}
