"use client";
"use client";

import { useQuery } from "@tanstack/react-query";
import { gql, request } from "graphql-request";
import { Address } from "~~/components/scaffold-eth";

const url = "https://api.studio.thegraph.com/query/1713875/buidlguidl-batch-21/version/latest";

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

interface BuildersListProps {
  buildersPages: string[];
}

export default function BuildersList({ buildersPages }: BuildersListProps) {
  // the data is already pre-fetched on the server and immediately available here,
  // without an additional network call
  const { data } = useQuery({
    queryKey: ["data"],
    async queryFn() {
      return await request(url, query, {});
    },
  });

  console.log(buildersPages);

  return (
    <div className="flex items-center justify-center h-screen">
      <ul>
        {data["checkedIns"].map((item: any, index: any) => (
          <li key={index}>
            <div>
              <Address onlyEnsOrAddress={true} address={item["builder"]} />
              {item["builder"]}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
