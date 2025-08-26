import type { GolfCourse, TeeTime } from '../types/golf';

export const mockCourses: GolfCourse[] = [
  {
    id: '1',
    name: 'Pebble Beach Golf Links',
    location: {
      address: '1700 17 Mile Drive',
      city: 'Pebble Beach',
      state: 'CA',
      zipCode: '93953',
      coordinates: { lat: 36.5697, lng: -121.9473 }
    },
    rating: 4.8,
    reviewCount: 2341,
    image: 'https://images.pexels.com/photos/1325662/pexels-photo-1325662.jpeg',
    images: [
      'https://images.pexels.com/photos/1325662/pexels-photo-1325662.jpeg',
      'https://images.pexels.com/photos/1409004/pexels-photo-1409004.jpeg',
      'https://images.pexels.com/photos/1325662/pexels-photo-1325662.jpeg'
    ],
    description: 'One of the most beautiful and challenging golf courses in the world, featuring stunning ocean views.',
    holes: 18,
    par: 72,
    yardage: 7040,
    difficulty: 'Difficult',
    amenities: ['Pro Shop', 'Restaurant', 'Cart Rental', 'Driving Range', 'Putting Green', 'Caddie Service'],
    phoneNumber: '(831) 624-3811',
    website: 'https://pebblebeach.com',
    priceRange: { min: 450, max: 650 },
    deals: [
      {
        id: 'd1',
        title: 'Twilight Special',
        description: '25% off tee times after 3 PM',
        originalPrice: 650,
        dealPrice: 487,
        discount: 25,
        validUntil: '2024-12-31',
        restrictions: 'Valid Monday-Thursday only'
      }
    ]
  },
  {
    id: '2',
    name: 'Augusta National Golf Club',
    location: {
      address: '2604 Washington Road',
      city: 'Augusta',
      state: 'GA',
      zipCode: '30904',
      coordinates: { lat: 33.5031, lng: -82.0197 }
    },
    rating: 4.9,
    reviewCount: 1876,
    image: 'https://images.pexels.com/photos/424195/pexels-photo-424195.jpeg',
    images: [
      'https://images.pexels.com/photos/424195/pexels-photo-424195.jpeg',
      'https://images.pexels.com/photos/1325662/pexels-photo-1325662.jpeg'
    ],
    description: 'Home of the Masters Tournament, this exclusive course is known for its pristine conditions.',
    holes: 18,
    par: 72,
    yardage: 7475,
    difficulty: 'Difficult',
    amenities: ['Pro Shop', 'Restaurant', 'Cart Rental', 'Driving Range', 'Putting Green'],
    phoneNumber: '(706) 667-6000',
    priceRange: { min: 300, max: 500 }
  },
  {
    id: '3',
    name: 'Torrey Pines Golf Course',
    location: {
      address: '11480 N Torrey Pines Rd',
      city: 'La Jolla',
      state: 'CA',
      zipCode: '92037',
      coordinates: { lat: 32.8977, lng: -117.2563 }
    },
    rating: 4.6,
    reviewCount: 3102,
    image: 'https://images.pexels.com/photos/1409004/pexels-photo-1409004.jpeg',
    images: [
      'https://images.pexels.com/photos/1409004/pexels-photo-1409004.jpeg',
      'https://images.pexels.com/photos/424195/pexels-photo-424195.jpeg'
    ],
    description: 'A municipal golf course with two 18-hole courses overlooking the Pacific Ocean.',
    holes: 18,
    par: 72,
    yardage: 7698,
    difficulty: 'Moderate',
    amenities: ['Pro Shop', 'Restaurant', 'Cart Rental', 'Driving Range'],
    phoneNumber: '(858) 452-3226',
    priceRange: { min: 120, max: 280 },
    deals: [
      {
        id: 'd2',
        title: 'Weekend Warriors',
        description: '15% off weekend morning tee times',
        originalPrice: 280,
        dealPrice: 238,
        discount: 15,
        validUntil: '2024-12-31'
      }
    ]
  },
  {
    id: '4',
    name: 'Whistling Straits',
    location: {
      address: 'N8501 County Road LS',
      city: 'Sheboygan',
      state: 'WI',
      zipCode: '53083',
      coordinates: { lat: 43.6392, lng: -87.7712 }
    },
    rating: 4.7,
    reviewCount: 1543,
    image: 'https://images.pexels.com/photos/1325662/pexels-photo-1325662.jpeg',
    images: [
      'https://images.pexels.com/photos/1325662/pexels-photo-1325662.jpeg'
    ],
    description: 'A links-style course along Lake Michigan, known for its challenging winds and stunning views.',
    holes: 18,
    par: 72,
    yardage: 7790,
    difficulty: 'Difficult',
    amenities: ['Pro Shop', 'Restaurant', 'Cart Rental', 'Driving Range', 'Putting Green'],
    phoneNumber: '(920) 565-6000',
    priceRange: { min: 200, max: 400 }
  },
  {
    id: '5',
    name: 'Pinehurst Resort',
    location: {
      address: '1 Carolina Vista Dr',
      city: 'Pinehurst',
      state: 'NC',
      zipCode: '28374',
      coordinates: { lat: 35.1951, lng: -79.4689 }
    },
    rating: 4.5,
    reviewCount: 2789,
    image: 'https://images.pexels.com/photos/424195/pexels-photo-424195.jpeg',
    images: [
      'https://images.pexels.com/photos/424195/pexels-photo-424195.jpeg'
    ],
    description: 'Historic resort with multiple championship courses, including the famous Course No. 2.',
    holes: 18,
    par: 72,
    yardage: 7588,
    difficulty: 'Moderate',
    amenities: ['Pro Shop', 'Restaurant', 'Cart Rental', 'Driving Range', 'Putting Green', 'Spa'],
    phoneNumber: '(910) 295-6811',
    priceRange: { min: 180, max: 350 },
    deals: [
      {
        id: 'd3',
        title: 'Stay & Play Package',
        description: 'Book 2+ nights and save 20% on golf',
        originalPrice: 350,
        dealPrice: 280,
        discount: 20,
        validUntil: '2024-12-31',
        restrictions: 'Must book hotel accommodation'
      }
    ]
  },
  {
    id: '6',
    name: 'St. Andrews Links',
    location: {
      address: 'Pilmour House',
      city: 'St Andrews',
      state: 'Scotland',
      zipCode: 'KY16 9SF',
      coordinates: { lat: 56.3498, lng: -2.8024 }
    },
    rating: 4.9,
    reviewCount: 4256,
    image: 'https://images.pexels.com/photos/1409004/pexels-photo-1409004.jpeg',
    images: [
      'https://images.pexels.com/photos/1409004/pexels-photo-1409004.jpeg'
    ],
    description: 'The "Home of Golf" - the oldest golf course in the world, steeped in tradition and history.',
    holes: 18,
    par: 72,
    yardage: 7297,
    difficulty: 'Difficult',
    amenities: ['Pro Shop', 'Restaurant', 'Cart Rental', 'Driving Range', 'Putting Green', 'Museum'],
    phoneNumber: '+44 1334 466666',
    priceRange: { min: 250, max: 450 }
  }
];

export const mockTeeTimes: TeeTime[] = [
  { id: 'tt1', courseId: '1', date: '2024-08-28', time: '07:00', price: 450, players: 1, maxPlayers: 4, available: true },
  { id: 'tt2', courseId: '1', date: '2024-08-28', time: '07:30', price: 487, originalPrice: 650, players: 2, maxPlayers: 4, available: true, deal: true },
  { id: 'tt3', courseId: '1', date: '2024-08-28', time: '08:00', price: 450, players: 0, maxPlayers: 4, available: true },
  { id: 'tt4', courseId: '2', date: '2024-08-28', time: '09:00', price: 350, players: 1, maxPlayers: 4, available: true },
  { id: 'tt5', courseId: '3', date: '2024-08-28', time: '10:00', price: 238, originalPrice: 280, players: 0, maxPlayers: 4, available: true, deal: true },
  { id: 'tt6', courseId: '4', date: '2024-08-28', time: '11:00', price: 250, players: 3, maxPlayers: 4, available: true },
];