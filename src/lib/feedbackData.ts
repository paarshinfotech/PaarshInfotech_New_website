
export interface Feedback {
  id: number;
  name: string;
  source: 'Customer' | 'Team Member' | 'Student';
  content: string;
  date: string;
  status: 'New' | 'Read' | 'Archived';
}

export const initialFeedbacks: Feedback[] = [
  { 
    id: 1, 
    name: "Aarav Sharma", 
    source: "Customer", 
    content: "The new dashboard feature is fantastic! It's much more intuitive than the previous version. However, it would be great if we could export the reports to CSV format. Keep up the great work!", 
    date: "2024-07-25", 
    status: "New" 
  },
  { 
    id: 2, 
    name: "Priya Patel", 
    source: "Team Member", 
    content: "The weekly sync meetings are becoming a bit too long. Can we consider having a more focused agenda or splitting them into smaller, more targeted sessions? It would help maintain productivity.", 
    date: "2024-07-24", 
    status: "Read" 
  },
  { 
    id: 3, 
    name: "Rohan Verma", 
    source: "Student", 
    content: "The internship program has been an amazing learning experience. The mentorship is top-notch. I would suggest adding a session on DevOps and CI/CD pipelines to make it even more comprehensive.", 
    date: "2024-07-23", 
    status: "Read" 
  },
  { 
    id: 4, 
    name: "Isha Gupta", 
    source: "Customer", 
    content: "I've noticed a minor bug on the mobile app's login screen where the 'Remember Me' checkbox doesn't always work on Android. It's a small issue, but fixing it would improve the user experience.", 
    date: "2024-07-22", 
    status: "Archived" 
  },
   { 
    id: 5, 
    name: "Sameer Singh", 
    source: "Team Member", 
    content: "The new coffee machine in the pantry is a great addition! Thank you to whoever made that happen. It's the little things that make the office a better place.", 
    date: "2024-07-21", 
    status: "Archived" 
  },
];
