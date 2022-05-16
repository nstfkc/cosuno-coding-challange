import { useState } from "react";
import useDebounce from "react-use/lib/useDebounce";
import { useURLSearchParams } from "../hooks/useURLSearchParams";

export const SearchInput = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { replace } = useURLSearchParams();

  // We don't want;
  // - update the browser history
  // - fetch data
  // on every key stroke, therefore we debounce
  useDebounce(() => replace("searchTerm", searchTerm), 300, [searchTerm]);

  return (
    <div className="p-4">
      <input
        className="w-full h-10 rounded-md border-2 border-gray-100 shadow-xl focus:shadow-md px-2 outline-1 outline-gray-400"
        placeholder="Search"
        type="text"
        name="searchTerm"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
};
