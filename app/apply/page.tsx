import type { Metadata } from "next";
import { createMetadata } from "@/lib/metadata";
import ApplyForm from "./ApplyForm";

export const metadata: Metadata = createMetadata({
  title: "Apply for Hard Money Loans | Get a Quote Fast",
  description:
    "Apply for fix and flip, DSCR rental, bridge, or construction financing. Submit your deal and get a hard money loan quote from AssetLift Lending fast.",
  path: "/apply",
});

export default function ApplyPage() {
  return <ApplyForm />;
}
