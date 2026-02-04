export interface Testimonial {
  id: string
  quote: string
  author: string
  location?: string
  rating: number
}

export const testimonials: Testimonial[] = [
  {
    id: '1',
    quote: "I drive 20 minutes past 3 Starbucks just for their honey lavender latte. My coworkers think I'm crazy until they try it.",
    author: 'Sarah M.',
    location: 'Foothill',
    rating: 5,
  },
  {
    id: '2',
    quote: "My golden retriever literally pulls me toward the door when we walk past. The pup cups are his favorite part of our Saturday routine.",
    author: 'Michael T.',
    location: 'Highland',
    rating: 5,
  },
  {
    id: '3',
    quote: "The barista remembered my name AND my order on my third visit. I asked for oat milk once and now they just know. That's customer service.",
    author: 'Jessica L.',
    location: 'State Street',
    rating: 5,
  },
  {
    id: '4',
    quote: "I've done the math — I've spent $847 here this year. Zero regrets. The cardamom cold brew alone is worth moving to SLC for.",
    author: 'David K.',
    location: 'Foothill',
    rating: 5,
  },
  {
    id: '5',
    quote: "Found out they donate to Best Friends Animal Society. Now I feel good about my 3-latte-a-week habit. It's basically charity, right?",
    author: 'Emily R.',
    location: 'Highland',
    rating: 5,
  },
]
