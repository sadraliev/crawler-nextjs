"use client";
import React, { useState } from "react";

import { List } from "./List";
import { SearchIcon } from "@/shared/components/Icons";
import { TextField } from "@/shared/components/TextField/TextField";
import { SEARCH_BY_CODE, SELF_GRAY_COLOR } from "@/shared/consts/main";
import { useAutoFocus } from "@/shared/hooks/useAutoFocus";
import { useFetchCodes } from "@/shared/hooks/useFetchOKVEDs";

const FilterList = () => {
  const searchRef = useAutoFocus();
  const [query, setQuery] = useState<string>("");
  const { scrapedData, isLoading, isError } = useFetchCodes(query);

  return (
    <>
      <TextField
        ref={searchRef}
        value={query}
        onChange={e => setQuery(e.target.value)}
        labelText={SEARCH_BY_CODE}
        leftIcon={<SearchIcon color={SELF_GRAY_COLOR} />}
      />
      <List list={scrapedData} isError={isError} isLoading={isLoading} />
    </>
  );
};

export default FilterList;
