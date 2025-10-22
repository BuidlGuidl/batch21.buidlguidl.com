import type { Metadata, NextPage } from "next";
import ProfileClient from "./ProfileClient"; 
export const metadata: Metadata = {
  title: "jopoepl — Builder",
  description: "Terminal-style builder page for jopoepl",
};

export default function Page():NextPage  {
  return (
    <main>
      <ProfileClient /> 
    </main>
  );
}
