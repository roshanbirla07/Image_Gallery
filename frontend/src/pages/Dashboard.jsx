import React, { useEffect, useState } from "react";
import Card from "../components/Card";

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/blinkit/getImages",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const img_data = await response.json();
        setData(img_data.Images || []);
        console.log(img_data);
      } catch (error) {
        console.error("Error fetching data:", error.message);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="h-full bg-white">
      <div className="flex flex-wrap justify-center text-white text-sm gap-8 m-7">
        {data.map((img) => (
          <Card key={img._id} post={img} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
