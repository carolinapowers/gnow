export interface GolfCourse {
  id: string;
  name: string;
  location: {
    address: string;
    city: string;
    state: string;
    zipCode: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  rating: number;
  reviewCount: number;
  image: string;
  images: string[];
  description: string;
  holes: number;
  par: number;
  yardage: number;
  difficulty: 'Easy' | 'Moderate' | 'Difficult';
  amenities: string[];
  phoneNumber: string;
  website?: string;
  priceRange: {
    min: number;
    max: number;
  };
  deals?: Deal[];
}

export interface Deal {
  id: string;
  title: string;
  description: string;
  originalPrice: number;
  dealPrice: number;
  discount: number;
  validUntil: string;
  restrictions?: string;
}

export interface TeeTime {
  id: string;
  courseId: string;
  date: string;
  time: string;
  price: number;
  originalPrice?: number;
  players: number;
  maxPlayers: number;
  available: boolean;
  deal?: boolean;
}

export interface SearchFilters {
  location: string;
  date: string;
  time: string;
  players: number;
  priceRange: [number, number];
  radius: number;
  holes: number[];
  amenities: string[];
  difficulty: string[];
}