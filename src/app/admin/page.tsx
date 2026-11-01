import type { Metadata } from "next";
import AdminRedirect from "@/views/Admin";

export const metadata: Metadata = {
  title: "Redirecting to Sanity Studio | Younick Design Studio",
  description: "Cloud Content Management Studio for Younick Design Studio.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminPage() {
  return <AdminRedirect />;
}
