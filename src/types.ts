export interface User {
  username: string;
  isAuthenticated: boolean;
}

export interface Event {
  id: string;
  title: string;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  description: string;
}

export interface Task {
  id: string;
  text: string;
  completed: boolean;
}

export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
}

export interface Guide {
  id: string;
  title: string;
  content: string;
  category: string;
}