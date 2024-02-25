import React, { useState, useCallback } from "react";
import Month from "./month";
import Search from "./search";


const Filter = ({months}) => {
  

  return (
    <div className="flex  flex-col md:items-center justify-between md:flex-row">
      <div>
        <Search />
      </div>
      <div className="relative flex   my-2 rounded-2xl">
        <Month months= {months}/>
      </div>
    </div>
  );
};

export default Filter;
