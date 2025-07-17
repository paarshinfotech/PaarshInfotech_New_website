
export interface TeamCategory {
  id: number;
  name: string;
  allowMultiple: boolean;
}

export interface TeamMember {
  id: number;
  name: string;
  categoryId: number;
  avatar: string;
  published: boolean;
}

export const teamCategories: TeamCategory[] = [
  { id: 1, name: "Founder & Chairman", allowMultiple: false },
  { id: 2, name: "Chief Executive Officer", allowMultiple: false },
  { id: 3, name: "Chief Financial Officer", allowMultiple: false },
  { id: 4, name: "HR Manager", allowMultiple: true },
  { id: 5, name: "Lead Developer", allowMultiple: true },
  { id: 6, name: "Developer", allowMultiple: true },
  { id: 7, name: "UI/UX Designer", allowMultiple: true },
  { id: 8, name: "Project Manager", allowMultiple: true },
];

export const teamMembers: TeamMember[] = [
  { id: 1, name: "Kantilal Pagare", categoryId: 1, avatar: "https://placehold.co/40x40.png", published: true },
  { id: 2, name: "Tushar Pagare", categoryId: 2, avatar: "https://placehold.co/40x40.png", published: true },
  { id: 3, name: "Pratiksha Baviskar", categoryId: 3, avatar: "https://placehold.co/40x40.png", published: true },
  { id: 4, name: "Priya Sharma", categoryId: 4, avatar: "https://placehold.co/40x40.png", published: true },
  { id: 5, name: "Rajesh Kumar", categoryId: 5, avatar: "https://placehold.co/40x40.png", published: false },
];
