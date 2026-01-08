"use client";

import { gql } from "../../../apollo/__generated__/client";

import { useQuery } from "@apollo/client";
import List from "./List";
import Input from "./Input";

const ALL_Descriptions = gql(`query ALL_Descriptions {
  feed {
    id
    description
  }
}`);

const Container = () => {
  const { data, loading, error } = useQuery(ALL_Descriptions);
  if (loading) {
    return <div>読み込み中</div>;
  }
  return (
    <div className="h-screen flex items-center justify-center">
      {error && <div>{error.message}</div>}
      <Input />
      <ul>
        {data &&
          data.feed.map((data) => (
            <List
              key={data?.id}
              id={data?.id}
              description={data?.description}
            />
          ))}
      </ul>
    </div>
  );
};

export default Container;
