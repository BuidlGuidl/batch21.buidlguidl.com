import ProfileClient from "./ProfileClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "jopoepl — Builder",
  description: "Terminal-style builder page for jopoepl",
};

export default function Page() {
  return (
    <main>
      <ProfileClient />
    </main>
  );
}
