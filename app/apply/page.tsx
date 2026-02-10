import type { Metadata } from "next";
import ApplyForm from "./ApplyForm";

export const metadata: Metadata = {
  title: "Apply for Funding",
  description:
    "Submit your real estate deal for fast funding. Get a soft-quote within 60 minutes. Fix & flip, ground-up construction, DSCR rental, and bridge loans available.",
  openGraph: {
    title: "Apply for Funding | AssetLift Lending",
    description:
      "Submit your real estate deal for fast funding. Get a soft-quote within 60 minutes.",
  },
};

export default function ApplyPage() {
  return <ApplyForm />;
}
