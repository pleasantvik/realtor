import React, { useEffect, useState } from "react";

export const Home = () => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoading(true);
    }, 5000);
  }, []);

  return (
    <div>
      {!loading && <h1>Loading</h1>}
      {loading && <h1>Home</h1>}
    </div>
  );
};
