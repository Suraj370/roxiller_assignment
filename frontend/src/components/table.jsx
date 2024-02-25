import React, { useState, useCallback, useEffect } from "react";
import { Card,
  Typography,
 } from "@material-tailwind/react";
 import { useSearchParams } from "react-router-dom";

 import axios from "axios";
const TABLE_HEAD = [
  "ID",
  "Title",
  "Description",
  "Price",
  "Catgeory",
  "Sold",
  "Image",
];

const Table = () => {
  const [searchParams] = useSearchParams();
  
  const [currentPage, setCurrentPage] = useState(1);
  const [TableRow, setRows] = useState();
  useEffect(() => {
    fetchTransactions();
  },[searchParams]);
  const fetchTransactions = useCallback(async () => {
 
    
    const queryString  = searchParams.toString()
    
    
    let url = `${import.meta.env.VITE_BACKEND_URL}/transactions?${queryString}`;

    
    const response = await axios.get(url)
    setRows(response.data.transaction.data);
  });






  return (
    <div>
      <Card className="h-full w-full overflow-scroll">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {TableRow &&
              TableRow.map(
                (
                  { id,title, description, price, category, sold, image },
                  index
                ) => {
                  const isLast = index === TableRow.length - 1;
                  const classes = isLast
                    ? "p-4"
                    : "p-4 border-b border-blue-gray-50";
                  return (
                    <tr key={index}>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {id}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {title}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                          style={{ maxWidth: "300px" }}
                        >
                          <span className="line-clamp-2">{description}</span>
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {price}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {category}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {sold.toString()}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {image}
                        </Typography>
                      </td>
                    </tr>
                  );
                }
              )}
          </tbody>
        </table>
      </Card>
      <div className="flex w-full items-center justify-between mt-4">
        <div>
          <h1>Page No : {currentPage}</h1>
        </div>
       <div className="flex items-center ">
         
         <button
           onClick={() => fetchTransactions(currentPage + 1)}
           disabled={currentPage === 1}
           className="mr-2 px-4 py-2 bg-blue-500 text-white rounded-md"
         >
           Previous
         </button>
         <button
           onClick={() => fetchTransactions(currentPage - 1)}
           // disabled={currentPage === totalPages}
           className="px-4 py-2 bg-blue-500 text-white rounded-md"
         >
           Next
         </button>
               </div>
       </div>
    </div>
  );
};

export default Table;
