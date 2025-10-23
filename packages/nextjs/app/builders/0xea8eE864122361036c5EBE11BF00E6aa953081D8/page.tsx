import { Profile } from "./Profile";
import type { Metadata, NextPage } from "next";

export const metadata: Metadata = {
  title: "jopoepl — Builder",
  description: "Terminal-style builder page for jopoepl",
};

const JopoeplPage: NextPage = () => {
  return (
    <main>
      <Profile />
    </main>
  );
};

export default JopoeplPage;
