import { useState, useEffect } from "react";
import { sanityClient, isSanityConfigured } from "../lib/sanity";
import { projects as defaultProjects, type Project } from "../data/projects";
import { services as defaultServices, type Service } from "../data/services";
import { teamMembers as defaultTeam, type TeamMember } from "../data/team";
import { testimonials as defaultTestimonials, type Testimonial } from "../data/testimonials";
import { blogs as defaultBlogs, type BlogPost } from "../data/blogs";

// In-memory caching to avoid redundant re-fetches
let cachedProjects: Project[] | null = null;
let cachedServices: Service[] | null = null;
let cachedTeam: TeamMember[] | null = null;
let cachedTestimonials: Testimonial[] | null = null;
let cachedBlogs: BlogPost[] | null = null;

export function useProjects() {
  const [data, setData] = useState<Project[]>(cachedProjects || defaultProjects);
  const [loading, setLoading] = useState<boolean>(!cachedProjects && isSanityConfigured);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!isSanityConfigured) {
      setData(defaultProjects);
      setLoading(false);
      return;
    }

    if (cachedProjects) {
      setData(cachedProjects);
      setLoading(false);
      return;
    }

    let isMounted = true;
    const query = `*[_type == "project"] | order(orderRank asc, _createdAt desc) {
      _id,
      "id": slug.current,
      "slug": slug.current,
      title,
      category,
      location,
      "image": image.asset->url,
      "images": images[].asset->url,
      videos,
      description,
      longDescription,
      outcome,
      workScope,
      clientContact,
      completionDate,
      area,
      budget,
      featured,
      subtitle,
      link,
      tech,
      seoTitle,
      seoDescription,
      seoKeywords,
      seoLocality,
      imageAlt
    }`;

    sanityClient
      .fetch(query)
      .then((res: any[]) => {
        if (!isMounted) return;
        if (res && res.length > 0) {
          const mapped: Project[] = res.map((p) => ({
            id: p.id || p._id,
            slug: p.slug || p.id || p._id,
            title: p.title || "Untitled Project",
            category: p.category || "Architecture",
            location: p.location || "Jaipur",
            image: p.image || "/assets/Placeholder/placeholder-rect.jpg",
            images: p.images && p.images.length > 0 ? p.images : [p.image || "/assets/Placeholder/placeholder-rect.jpg"],
            videos: p.videos || [],
            description: p.description || "",
            longDescription: p.longDescription,
            outcome: p.outcome,
            workScope: p.workScope || [],
            clientContact: p.clientContact,
            completionDate: p.completionDate,
            area: p.area,
            budget: p.budget,
            featured: Boolean(p.featured),
            subtitle: p.subtitle,
            link: p.link,
            tech: p.tech,
            seoTitle: p.seoTitle,
            seoDescription: p.seoDescription,
            seoKeywords: p.seoKeywords,
            seoLocality: p.seoLocality,
            imageAlt: p.imageAlt
          }));
          cachedProjects = mapped;
          setData(mapped);
        } else {
          setData(defaultProjects);
        }
      })
      .catch((err) => {
        console.warn("Sanity fetch projects fallback to static:", err);
        if (isMounted) {
          setError(err);
          setData(defaultProjects);
        }
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return { projects: data, loading, error };
}

export function useServices() {
  const [data, setData] = useState<Service[]>(cachedServices || defaultServices);
  const [loading, setLoading] = useState<boolean>(!cachedServices && isSanityConfigured);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!isSanityConfigured) {
      setData(defaultServices);
      setLoading(false);
      return;
    }

    if (cachedServices) {
      setData(cachedServices);
      setLoading(false);
      return;
    }

    let isMounted = true;
    const query = `*[_type == "service"] | order(orderRank asc, _createdAt asc) {
      _id,
      "id": slug.current,
      title,
      description,
      icon,
      "image": image.asset->url,
      video,
      features,
      keywords,
      timeline,
      seoTitle,
      seoDescription,
      seoKeywords
    }`;

    sanityClient
      .fetch(query)
      .then((res: any[]) => {
        if (!isMounted) return;
        if (res && res.length > 0) {
          const mapped: Service[] = res.map((s) => ({
            id: s.id || s._id,
            title: s.title,
            description: s.description,
            icon: s.icon || "Home",
            image: s.image || "/assets/Placeholder/placeholder-rect.jpg",
            video: s.video,
            features: s.features || [],
            keywords: s.keywords || [],
            timeline: s.timeline,
            seoTitle: s.seoTitle,
            seoDescription: s.seoDescription,
            seoKeywords: s.seoKeywords
          }));
          cachedServices = mapped;
          setData(mapped);
        } else {
          setData(defaultServices);
        }
      })
      .catch((err) => {
        console.warn("Sanity fetch services fallback to static:", err);
        if (isMounted) {
          setError(err);
          setData(defaultServices);
        }
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return { services: data, loading, error };
}

export function useTeam() {
  const [data, setData] = useState<TeamMember[]>(cachedTeam || defaultTeam);
  const [loading, setLoading] = useState<boolean>(!cachedTeam && isSanityConfigured);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!isSanityConfigured) {
      setData(defaultTeam);
      setLoading(false);
      return;
    }

    if (cachedTeam) {
      setData(cachedTeam);
      setLoading(false);
      return;
    }

    let isMounted = true;
    const query = `*[_type == "teamMember"] | order(orderRank asc, _createdAt asc) {
      _id,
      "id": slug.current,
      name,
      role,
      "image": image.asset->url,
      description,
      expertise,
      contact,
      social,
      isFounder,
      badge
    }`;

    sanityClient
      .fetch(query)
      .then((res: any[]) => {
        if (!isMounted) return;
        if (res && res.length > 0) {
          const mapped: TeamMember[] = res.map((m) => ({
            id: m.id || m._id,
            name: m.name,
            role: m.role,
            image: m.image || "/assets/team/Nikhil/Nikhil-1024.jpeg",
            description: m.description || "",
            expertise: m.expertise || [],
            contact: m.contact || {},
            social: m.social || {},
            isFounder: Boolean(m.isFounder),
            badge: m.badge
          }));
          cachedTeam = mapped;
          setData(mapped);
        } else {
          setData(defaultTeam);
        }
      })
      .catch((err) => {
        console.warn("Sanity fetch team fallback to static:", err);
        if (isMounted) {
          setError(err);
          setData(defaultTeam);
        }
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return { teamMembers: data, loading, error };
}

export function useTestimonials() {
  const [data, setData] = useState<Testimonial[]>(cachedTestimonials || defaultTestimonials);
  const [loading, setLoading] = useState<boolean>(!cachedTestimonials && isSanityConfigured);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!isSanityConfigured) {
      setData(defaultTestimonials);
      setLoading(false);
      return;
    }

    if (cachedTestimonials) {
      setData(cachedTestimonials);
      setLoading(false);
      return;
    }

    let isMounted = true;
    const query = `*[_type == "testimonial"] | order(_createdAt desc) {
      _id,
      name,
      role,
      quote,
      "avatarUrl": avatar.asset->url,
      rating,
      location,
      project
    }`;

    sanityClient
      .fetch(query)
      .then((res: any[]) => {
        if (!isMounted) return;
        if (res && res.length > 0) {
          const mapped: Testimonial[] = res.map((t) => ({
            id: t._id,
            name: t.name,
            role: t.role || "Client",
            quote: t.quote,
            avatarUrl: t.avatarUrl || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=512&auto=format&fit=crop",
            rating: t.rating || 5,
            location: t.location,
            project: t.project
          }));
          cachedTestimonials = mapped;
          setData(mapped);
        } else {
          setData(defaultTestimonials);
        }
      })
      .catch((err) => {
        console.warn("Sanity fetch testimonials fallback to static:", err);
        if (isMounted) {
          setError(err);
          setData(defaultTestimonials);
        }
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return { testimonials: data, loading, error };
}

export function useBlogPosts() {
  const [data, setData] = useState<BlogPost[]>(cachedBlogs || defaultBlogs);
  const [loading, setLoading] = useState<boolean>(!cachedBlogs && isSanityConfigured);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!isSanityConfigured) {
      setData(defaultBlogs);
      setLoading(false);
      return;
    }

    if (cachedBlogs) {
      setData(cachedBlogs);
      setLoading(false);
      return;
    }

    let isMounted = true;
    const query = `*[_type == "blogPost"] | order(publishedAt desc, _createdAt desc) {
      _id,
      "id": slug.current,
      "slug": slug.current,
      title,
      subtitle,
      category,
      excerpt,
      readingTime,
      featured,
      publishedAt,
      tags,
      content,
      faqs,
      seoTitle,
      seoDescription,
      seoKeywords,
      "coverImage": coalesce(coverImage.asset->url, coverImage)
    }`;

    sanityClient
      .fetch(query)
      .then((res: any[]) => {
        if (!isMounted) return;
        if (res && res.length > 0) {
          const mapped: BlogPost[] = res.map((b) => ({
            id: b.id || b._id,
            slug: b.slug || b.id || b._id,
            title: b.title || "Untitled Article",
            subtitle: b.subtitle || "",
            category: b.category || "Cost & Budgeting",
            excerpt: b.excerpt || "",
            readingTime: b.readingTime || "6 min read",
            featured: Boolean(b.featured),
            publishedAt: b.publishedAt || new Date().toISOString().split("T")[0],
            tags: b.tags || ["Architecture", "Interior Design"],
            content: b.content || "",
            faqs: b.faqs || [],
            seoTitle: b.seoTitle,
            seoDescription: b.seoDescription,
            seoKeywords: b.seoKeywords,
            coverImage: b.coverImage || "/assets/services/interior-design3.jpg",
            author: {
              name: "Nikhil Sain",
              role: "Lead Architect & Interior Designer",
              image: "/assets/team/Nikhil/Nikhil-480.jpeg",
            },
          }));

          // Merge: ensure local foundational guides are preserved if not yet entered into Sanity
          const sanitySlugs = new Set(mapped.map((p) => p.slug));
          const merged = [...mapped];
          for (const def of defaultBlogs) {
            if (!sanitySlugs.has(def.slug)) {
              merged.push(def);
            }
          }

          cachedBlogs = merged;
          setData(merged);
        } else {
          setData(defaultBlogs);
        }
      })
      .catch((err) => {
        console.warn("Sanity fetch blog posts fallback to static:", err);
        if (isMounted) {
          setError(err);
          setData(defaultBlogs);
        }
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return { posts: data, loading, error };
}

