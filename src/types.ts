export interface SiteConfig {
  heroTitle: string;
  heroSubtitle: string;
  accentColor: string;
  contactEmail: string;
  instagramUrl: string;
  blogUrl: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface Stat {
  id: string;
  label: string;
  value: number;
  suffix: string;
  description: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  description: string;
}

export interface Message {
  id: string;
  name: string;
  email: string;
  subject: string;
  content: string;
  createdAt: string;
}

export interface UserProfile {
  uid: string;
  email: string;
  role: 'admin' | 'user';
}
