"use client";
"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { gql, request } from "graphql-request";
import { Address } from "~~/components/scaffold-eth";

const url = "https://api.studio.thegraph.com/query/1713875/buidlguidl-batch-21/version/latest";

const query = gql`
  {
    checkedIns {
      builder
    }
  }
`;

interface BuildersListProps {
  buildersPages: Set<string>;
}

interface BuilderQueryResponse {
  builder: string;
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

  return (
    <div className="flex items-center justify-center h-screen">
      <ul className="list bg-base-100 rounded-box shadow-md">
        <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">Checked-In Builders</li>

        {data["checkedIns"].map((item: BuilderQueryResponse, index: number) => (
          <li key={index} className="list-row">
            <div className="text-4xl font-thin opacity-30 tabular-nums">{index + 1}</div>

            <div className="list-col-grow">
              <Address onlyEnsOrAddress={true} address={item["builder"]} />
            </div>

            {buildersPages.has(item["builder"]) ? (
              <Link className="btn btn-secondary btn-sm self-end" href={`/builders/${item["builder"]}`}>
                <p>Builder Page</p>
              </Link>
            ) : (
              <div className="btn btn-secondary btn-sm btn-disabled self-end">
                <p> Builder Page</p>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
