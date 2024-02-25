import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";

const Stats = ({months}) => {
  const [stats, setStats] = useState([]);
  const [searchParams] = useSearchParams();
  const [monthName, setMonth] = useState("March")


  const fetchStats = useCallback(async () => {
    const month  = searchParams.get("month");
    let url = `${import.meta.env.VITE_BACKEND_URL}/statistics?month=${month}`;
    const response = await axios.get(url);
    return response;
  });
  useEffect(() => {
    
    const getStats = async () => {
      const result = await fetchStats();
      if (result) {
        let newstats = [
          {
            "Total sales": result.data.statistics[0].totalAmount,
            "Total sold Items": result.data.statistics[0].soldCount,
            "Total not sold Items": result.data.statistics[0].unsoldCount,
          },
        ];
        if (searchParams.get("month") != null) {
          const id = searchParams.get("month");
          const found = months.find((month) => month.id == id);
    
          setMonth(found.name);
        }
        setStats(newstats);
      }
    };
    getStats();
  }, [searchParams]);
  // console.log(stats);

  return (

    <div>
      <div className="flex  items-center py-5">Statistics - {monthName}</div>
      <div className="py-2">
        {stats && (
          <div className="inline-block bg-white/80 px-3 rounded-2xl">
            <table >
              <tbody >
                {stats.map((item, index) => (
                  <React.Fragment key={index}>
                    {Object.entries(item).map(([key, value]) => (
                      <tr key={key}>
                        <th className="p-4 text-left">
                          <p>{key}</p>
                        </th>
                        <td>{value}</td>
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Stats;
