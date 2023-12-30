import axios from "axios";
import { useEffect, useState } from "react";

const useAuth = () => {
  const [auth, setAuth] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);

  const verifyAuth = async () => {
    try {
      const res = await axios.get("/api/auth/is_logged_in");
      console.log(res.data, "res data");
      return res.data; // Assuming the server response has a "loggedIn" property
    } catch (err) {
      console.log(err);
      return false;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await verifyAuth();
        console.log("Authentication data:", data);
        setAuth(data);
        setLoading(false); // Move setLoading(false) here to trigger re-render
      } catch (err) {
        console.error("Error verifying auth:", err);
        setAuth(false);
        setLoading(false); // Move setLoading(false) here in case of an error
      }
    };

    fetchData();
  }, []); // Add auth to the dependency array to re-run the effect when auth changes

  return { auth, loading };
};

export default useAuth;
