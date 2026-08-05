// Shared category & location badge style utilities
// Extracted from ProjectCard, ProjectModal, and Projects page

export const getCategoryStyles = (category?: string): string => {
  const key = (category || "").toLowerCase();
  if (key.includes("interior")) return "bg-[#F6E7C5] text-[#6B4E16] border-[#E9C982]";
  if (key.includes("construction")) return "bg-[#E3ECF8] text-[#1F3B5B] border-[#BBD1EE]";
  if (key.includes("renovation")) return "bg-[#F5E0D1] text-[#6B3E1E] border-[#E9BFA0]";
  if (key.includes("3d")) return "bg-[#EAE3F7] text-[#3F2B6B] border-[#CDBEF0]";
  if (key.includes("consult")) return "bg-[#E2F0E6] text-[#1F5133] border-[#B7D9C1]";
  return "bg-[#F5F0E8] text-[#493E25] border-[#E6B566]/30";
};

export const getLocationStyles = (): string =>
  "bg-[#EEF2F6] text-[#425466] border-[#D7E0EA]";

/** Pill-style category colors for dark backgrounds (modal) */
export const getCategoryStylesDark = (category?: string): string => {
  const key = (category || "").toLowerCase();
  if (key.includes("interior")) return "bg-[#6B4E16]/20 text-[#F6E7C5] border-[#E9C982]/30";
  if (key.includes("construction")) return "bg-[#1F3B5B]/20 text-[#BBD1EE] border-[#BBD1EE]/30";
  if (key.includes("renovation")) return "bg-[#6B3E1E]/20 text-[#F5E0D1] border-[#E9BFA0]/30";
  if (key.includes("3d")) return "bg-[#3F2B6B]/20 text-[#CDBEF0] border-[#CDBEF0]/30";
  if (key.includes("consult")) return "bg-[#1F5133]/20 text-[#B7D9C1] border-[#B7D9C1]/30";
  return "bg-white/10 text-white/70 border-white/20";
};
