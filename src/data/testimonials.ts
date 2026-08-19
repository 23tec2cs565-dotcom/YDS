export interface Testimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
  avatarUrl: string;
  rating?: number;
  location?: string;
  project?: string;
}

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Arpit agarwal",
    role: "Client",
    quote: "Nikhil ji, everything came out really beautiful and elegant, thank you so much for all your efforts and to the team also.. looking forward to working in future also..",
    avatarUrl:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=512&auto=format&fit=crop",
    rating: 5,
    location: "Jaipur"
  },
  {
    id: "t2",
    name: "Riya Kapoor",
    role: "Interior Designer",
    quote: "Great process, clear communication and beautiful finishes.",
    avatarUrl:
      "https://images.unsplash.com/photo-1545996124-5b9c9b3dd7a9?q=80&w=512&auto=format&fit=crop",
    rating: 5,
    location: "Jaipur"
  }
];

export default testimonials;
