export interface Location {
  id: string
  name: string
  address: string
  city: string
  state: string
  zip: string
  phone: string
  hours: {
    weekday: string
    weekend: string
  }
  features: string[]
  image: string
  mapUrl: string
}

export const locations: Location[] = [
  {
    id: 'foothill',
    name: 'Foothill',
    address: '1847 Foothill Dr',
    city: 'Salt Lake City',
    state: 'UT',
    zip: '84108',
    phone: '(801) 883-8888',
    hours: {
      weekday: 'Mon-Fri: 6am - 7pm',
      weekend: 'Sat-Sun: 7am - 6pm',
    },
    features: ['Drive-thru', 'Patio', 'Dog-friendly'],
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&q=80',
    mapUrl: 'https://maps.google.com/?q=1847+Foothill+Dr+Salt+Lake+City+UT+84108',
  },
  {
    id: 'highland',
    name: 'Highland',
    address: '2954 Highland Dr',
    city: 'Salt Lake City',
    state: 'UT',
    zip: '84106',
    phone: '(801) 883-8889',
    hours: {
      weekday: 'Mon-Fri: 6am - 7pm',
      weekend: 'Sat-Sun: 7am - 6pm',
    },
    features: ['Indoor Seating', 'Wi-Fi', 'Dog-friendly'],
    image: 'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=800&q=80',
    mapUrl: 'https://maps.google.com/?q=2954+Highland+Dr+Salt+Lake+City+UT+84106',
  },
  {
    id: 'state-street',
    name: 'State Street',
    address: '1720 S State St',
    city: 'Salt Lake City',
    state: 'UT',
    zip: '84115',
    phone: '(801) 883-8890',
    hours: {
      weekday: 'Mon-Fri: 6am - 8pm',
      weekend: 'Sat-Sun: 7am - 7pm',
    },
    features: ['Drive-thru', 'Patio', 'Indoor Seating', 'Dog-friendly'],
    image: 'https://images.unsplash.com/photo-1453614512568-c4024d13c247?w=800&q=80',
    mapUrl: 'https://maps.google.com/?q=1720+S+State+St+Salt+Lake+City+UT+84115',
  },
]
