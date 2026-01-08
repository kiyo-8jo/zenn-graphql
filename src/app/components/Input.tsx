"use client";

import { useState } from "react";
import { gql } from "../../../apollo/__generated__/client";
import { useMutation } from "@apollo/client";

const POST = gql(`mutation post($url: String!, description: String!) {
post(url: $url, description:$description) {
  id
  url
  description
}
}`);

const Input = () => {
  const [textValue, setTextValue] = useState<string>("");
  // const [post] = useMutation(POST);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTextValue(e.target.value);
  };
  const handleClick = async () => {
    await post();
  };
  return (
    <div>
      <input
        type="text"
        placeholder="task"
        value={textValue}
        onChange={handleChange}
      />
      <button onClick={handleClick}>決定</button>
    </div>
  );
};

export default Input;
