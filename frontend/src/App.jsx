import "./App.css";
import React from "react";
import Table from "./components/table";
import Stats from "./components/stats";
import Filter from "./components/Filter/Filter";


const months = [
  { id: 1, name: "January" },
  { id: 2, name: "February" },
  { id: 3, name: "March" },
  { id: 4, name: "April" },
  { id: 5, name: "May" },
  { id: 6, name: "June" },
  { id: 7, name: "July" },
  { id: 8, name: "August" },
  { id: 9, name: "September" },
  { id: 10, name: "October" },
  { id: 11, name: "November" },
  { id: 12, name: "December" },
];


function App() {

  return (
    <>
     <div className=" bg-blue-100">
      <div className=" w-11/12 mx-auto">
        <div className="flex justify-center items-center py-5">
          Transaction Dashboard
        </div>
        <Filter months = {months}/>
        <Table />
        <Stats months = {months} />
      </div>
    </div>
    </>
  );
}

export default App;
