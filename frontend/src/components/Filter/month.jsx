import React, { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Listbox, Transition } from "@headlessui/react";
import { RiArrowDropDownLine } from "react-icons/ri";

const Month = ({ months }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedMonth, setSelectedMonth] = useState({
    id: 0,
    name: "Select Month",
  });

  const handleChange = (selectedMonth) => {
    console.log("called");

    setSearchParams({ month: selectedMonth.id });
  };
  useEffect(() => {
    if (searchParams.get("month") != null) {
      const id = searchParams.get("month");
      const found = months.find((month) => month.id == id);

      setSelectedMonth(found);
    }
  }, [searchParams.get("month")]);
  return (
    <div className="">
      <Listbox as="div" value={selectedMonth} onChange={handleChange}>
        {({ open }) => (
          <>
            <div className="relative  ">
              <span className="flex bg-white">
                <Listbox.Button className="px-4 py-2 flex gap-3 items-center justify-between w-[150px] text-left focus:outline-none relative  ">
                  <span className="block truncate">{selectedMonth.name}</span>
                  <span className={open ? " rotate-180" : ""}>
                    <RiArrowDropDownLine />
                  </span>
                </Listbox.Button>
              </span>
              <Transition
                show={open}
                leave="transition ease-in-out duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options
                  static
                  className="mt-1 bg-white rounded-lg w-full absolute z-10 "
                >
                  {months.map((month) => (
                    <Listbox.Option
                      key={month.id}
                      className="px-6 py-2 "
                      value={month}
                    >
                      {month.name}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </>
        )}
      </Listbox>
    </div>
  );
};

export default Month;
