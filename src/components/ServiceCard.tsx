import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Dot,
  LayoutDashboard,
  Home,
  Building,
  Wrench,
  MessageCircle,
  Eye,
} from "lucide-react";
import { Service } from "../data/services";

interface ServiceCardProps {
  service: Service;
  variant?: "default" | "home";
  reverse?: boolean;
}

/**
 * ✅ ICON MAP — MUST MATCH services.ts EXACTLY
 */
const ICON_MAP: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Home,
  Building,
  Wrench,
  MessageCircle,
  Eye,
};

const ServiceCard: React.FC<ServiceCardProps> = ({
  service,
  variant = "default",
  reverse = false,
}) => {
  // ✅ Guaranteed icon (never blank)
  const ServiceIcon = ICON_MAP[service.icon] ?? LayoutDashboard;

  const handleImgError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const img = e.currentTarget as HTMLImageElement;
    img.onerror = null;
    img.src = "/assets/placeholder.jpg";
  };

  /* =========================
     SERVICE PAGE CARD
     ========================= */
  if (variant !== "home") {
    return (
      <article className="group relative bg-white rounded-xl shadow-lg overflow-hidden hover:-translate-y-2 hover:shadow-xl transition-transform duration-300">
        <div className="relative h-48 overflow-hidden">
          <img
            src={service.image}
            alt={service.title}
            loading="lazy"
            onError={handleImgError}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

          <div className="absolute bottom-4 left-4 flex items-center gap-2 text-white">
            <ServiceIcon size={26} />
            <h3 className="text-xl font-semibold">{service.title}</h3>
          </div>
        </div>

        <div className="p-6">
          <p className="text-gray-600 mb-4">{service.description}</p>

          <ul className="space-y-2 mb-6">
            {service.features.map((feature, i) => (
              <li key={i} className="flex items-center gap-2 text-sm text-gray-700">
                <Dot size={16} className="text-sky-300" />
                {feature}
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <Link
              to={`/projects?filter=${service.id}`}
              className="inline-flex items-center gap-2 px-4 py-3 rounded-lg bg-gray-900 text-[#E6B566]"
            >
              View Projects <ArrowRight size={16} />
            </Link>

            <Link
              to={`/services/${service.id}`}
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              Learn more →
            </Link>
          </div>
        </div>
      </article>
    );
  }

  /* =========================
     HOME VARIANT
     ========================= */
  const containerDirection = reverse ? "md:flex-row-reverse" : "md:flex-row";

  return (
    <article
      className={`group ${containerDirection} flex flex-col md:flex-row bg-white rounded-2xl overflow-hidden shadow-lg`}
      style={{ minHeight: 420 }}
    >
      {/* Image */}
      <div className="w-full md:w-1/2 bg-gray-100">
        <img
          src={service.image}
          alt={service.title}
          loading="lazy"
          onError={handleImgError}
          className="w-full h-[360px] md:h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="w-full md:w-1/2 p-6 md:p-16 flex flex-col justify-center">
        <div className="flex items-center gap-3 mb-4">
          {/* ✅ ICON NOW VISIBLE */}
          <div className="w-12 h-12 rounded-full bg-[#E6F9FC] text-[#0891b2] flex items-center justify-center">
            <ServiceIcon size={20} />
          </div>

          <h3 className="text-3xl md:text-4xl font-bold text-gray-900">
            {service.title}
          </h3>
        </div>

        <p className="text-gray-700 mb-6 max-w-[60ch]">
          {service.description}
        </p>

        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
          {service.features.map((feature, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-gray-700">
              <Dot size={16} className="mt-1 text-sky-300" />
              {feature}
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-4">
          <Link
            to={`/projects?filter=${service.id}`}
            className="px-5 py-3 bg-[#222831] text-[#E6B566] rounded-md inline-flex items-center gap-2"
          >
            View Projects <ArrowRight size={16} />
          </Link>

          <Link
            to={`/services/${service.id}`}
            className="text-sm text-gray-600 hover:text-gray-900"
          >
            Learn more →
          </Link>
        </div>
      </div>
    </article>
  );
};

export default ServiceCard;
