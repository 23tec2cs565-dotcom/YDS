import { useState, useEffect } from "react";
import { sanityClient, isSanityConfigured } from "../lib/sanity";
import { projects as defaultProjects, type Project } from "../data/projects";
import { services as defaultServices, type Service } from "../data/services";
import { teamMembers as defaultTeam, type TeamMember } from "../data/team";
import { testimonials as defaultTestimonials, type Testimonial } from "../data/testimonials";

// In-memory caching to avoid redundant re-fetches
let cachedProjects: Project[] | null = null;
let cachedServices: Service[] | null = null;
let cachedTeam: TeamMember[] | null = null;
let cachedTestimonials: Testimonial[] | null = null;

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
