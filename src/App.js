import React, { useEffect, useState } from "react";
import { useRoutes } from "react-router-dom";
import ShowCreators from "./pages/ShowCreators";
import ViewCreator from "./pages/ViewCreator";
import EditCreator from "./pages/EditCreator";
import AddCreator from "./pages/AddCreator";
import { supabase } from "./client";

function App() {
  const [creators, setCreators] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCreators();
  }, []);

  const fetchCreators = async () => {
    setLoading(true);
    try {
      let { data, error } = await supabase.from("creators").select("*");
      if (error) throw error;
      setCreators(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const routes = useRoutes([
    {
      path: "/",
      element: (
        <ShowCreators creators={creators} loading={loading} error={error} />
      ),
    },
    { path: "/view/:id", element: <ViewCreator /> }, // View a specific creator
    {
      path: "/edit/:id",
      element: <EditCreator refreshCreators={fetchCreators} />,
    }, // Edit a specific creator
    { path: "/new", element: <AddCreator refreshCreators={fetchCreators} /> }, // Add a new creator
  ]);

  return <div className="App">{routes}</div>;
}

export default App;
