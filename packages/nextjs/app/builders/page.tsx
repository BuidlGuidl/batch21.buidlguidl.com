import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";
import fs from "fs/promises";
import { gql, request } from "graphql-request";
import path from "path";
import BuildersList from "~~/components/BuildersList";

const query = gql`
  {
    checkedIns {
      id
      first
      builder
      checkInContract
    }
  }
`;
const url = "https://api.studio.thegraph.com/query/1713875/buidlguidl-batch-21/version/latest";

async function BuildersPage() {
  const buildersPath = path.join(process.cwd(), "app", "builders");
  const files = await fs.readdir(buildersPath, { withFileTypes: true });
  const buildersPages = files.filter(file => file.isDirectory()).map(dir => dir.name);

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["data"],
    async queryFn() {
      return await request(url, query, {});
    },
  });

  return (
    <div className="flex justify-center align-middle flex-col ">
      <h1 className="text-center my-5 text-xl font-bold">Batch 21 Builders</h1>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <BuildersList buildersPages={buildersPages} />
      </HydrationBoundary>
    </div>
  );
}

export default BuildersPage;
