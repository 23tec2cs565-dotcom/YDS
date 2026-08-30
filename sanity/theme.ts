import { buildLegacyTheme } from "sanity";

export const younickTheme = buildLegacyTheme({
  /* Base theme colors */
  "--black": "#0B1220",
  "--white": "#FFFFFF",

  "--gray": "#94A3B8",
  "--gray-base": "#64748B",

  "--component-bg": "#0B1220",
  "--component-text-color": "#F8FAFC",

  /* Brand Colors (#C3D6E4 Serenity Ice Blue Accent) */
  "--brand-primary": "#C3D6E4",

  // Default button
  "--default-button-color": "#64748B",
  "--default-button-primary-color": "#C3D6E4",
  "--default-button-success-color": "#10B981",
  "--default-button-warning-color": "#F59E0B",
  "--default-button-danger-color": "#EF4444",

  /* State */
  "--state-info-color": "#C3D6E4",
  "--state-success-color": "#10B981",
  "--state-warning-color": "#F59E0B",
  "--state-danger-color": "#EF4444",

  /* Navbar */
  "--main-navigation-color": "#070D18",
  "--main-navigation-color--inverted": "#FFFFFF",

  "--focus-color": "#C3D6E4",
});
