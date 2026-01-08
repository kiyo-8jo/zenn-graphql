"use client";

import React from "react";

const List = (props: {
  id: string | undefined;
  description: string | undefined;
}) => {
  return (
    <div className="bg-amber-50">

      <li key={String(props.id)}>{props.description}</li>
    </div>
  );
};

export default List;
