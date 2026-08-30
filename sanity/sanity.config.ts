import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schemas";
import { younickTheme } from "./theme";
import { StudioLogo } from "./components/StudioLogo";
import { StudioNavbar } from "./components/StudioNavbar";

export default defineConfig({
  name: "younick-design-studio",
  title: "Younick Design Studio — Admin CMS",

  projectId: "b0rnzdhr",
  dataset: "production",

  theme: younickTheme,

  studio: {
    components: {
      logo: StudioLogo,
      navbar: StudioNavbar,
    },
  },

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
});
