export interface User {
  id: string;
  name: string;
  role: 'requester' | 'tasker';
  avatar: string;
  rating: number;
  completedTasks: number;
}

export interface ChoreRequest {
  id: string;
  title: string;
  description: string;
  category: string;
  price: number;
  location: string;
  status: 'open' | 'accepted' | 'in_progress' | 'completed';
  requesterId: string;
  taskerId?: string;
  postedAt: string;
  scheduledDate: string;
}

export const MOCK_USERS: User[] = [
  { id: 'r1', name: 'Alice Johnson', role: 'requester', avatar: 'AJ', rating: 4.8, completedTasks: 12 },
  { id: 'r2', name: 'Bob Smith', role: 'requester', avatar: 'BS', rating: 4.5, completedTasks: 8 },
  { id: 't1', name: 'Carlos Rivera', role: 'tasker', avatar: 'CR', rating: 4.9, completedTasks: 45 },
  { id: 't2', name: 'Diana Park', role: 'tasker', avatar: 'DP', rating: 4.7, completedTasks: 32 },
  { id: 't3', name: 'Ethan Brooks', role: 'tasker', avatar: 'EB', rating: 4.6, completedTasks: 18 },
];

export const MOCK_CHORES: ChoreRequest[] = [
  {
    id: 'c1',
    title: 'Lawn Mowing',
    description: 'Front and back yard need mowing. Roughly 1500 sq ft total. Mower provided.',
    category: 'Yard Work',
    price: 45,
    location: '123 Maple St',
    status: 'open',
    requesterId: 'r1',
    postedAt: '2 hours ago',
    scheduledDate: 'Apr 2, 2026',
  },
  {
    id: 'c2',
    title: 'Deep Kitchen Clean',
    description: 'Full kitchen deep clean including oven, fridge interior, and grout scrubbing.',
    category: 'Cleaning',
    price: 80,
    location: '456 Oak Ave',
    status: 'open',
    requesterId: 'r2',
    postedAt: '5 hours ago',
    scheduledDate: 'Apr 3, 2026',
  },
  {
    id: 'c3',
    title: 'Furniture Assembly',
    description: 'IKEA bookshelf and desk need assembling. Tools provided.',
    category: 'Assembly',
    price: 60,
    location: '789 Pine Rd',
    status: 'accepted',
    requesterId: 'r1',
    taskerId: 't1',
    postedAt: '1 day ago',
    scheduledDate: 'Apr 1, 2026',
  },
  {
    id: 'c4',
    title: 'Garage Organization',
    description: 'Sort, organize, and clean a two-car garage. Dispose of junk as needed.',
    category: 'Organization',
    price: 100,
    location: '321 Elm Blvd',
    status: 'open',
    requesterId: 'r2',
    postedAt: '3 hours ago',
    scheduledDate: 'Apr 5, 2026',
  },
  {
    id: 'c5',
    title: 'Window Washing',
    description: '12 windows, interior and exterior. Two-story house, ladder provided.',
    category: 'Cleaning',
    price: 70,
    location: '654 Birch Ln',
    status: 'in_progress',
    requesterId: 'r1',
    taskerId: 't2',
    postedAt: '2 days ago',
    scheduledDate: 'Mar 31, 2026',
  },
  {
    id: 'c6',
    title: 'Snow Shoveling',
    description: 'Driveway and walkway need clearing after snowfall. Salt provided.',
    category: 'Yard Work',
    price: 35,
    location: '987 Cedar Ct',
    status: 'completed',
    requesterId: 'r2',
    taskerId: 't3',
    postedAt: '3 days ago',
    scheduledDate: 'Mar 29, 2026',
  },
];

export const CATEGORIES = ['All', 'Cleaning', 'Yard Work', 'Assembly', 'Organization', 'Moving', 'Repairs'];
