import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";

  
const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  const onSubmit = (event) => {
    event.preventDefault();
    setSearchParams((searchParams) => {
      searchParams.set("search", searchQuery);
      return searchParams
    });
  };
  return (
    <div className=" flex w-[250px] px-4 py-2 bg-white">
      <form onSubmit={onSubmit} className="flex">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
    </div>
  );
};

export default Search;
