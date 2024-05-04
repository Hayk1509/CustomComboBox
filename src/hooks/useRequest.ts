import { useState, useCallback, useEffect } from "react";
import { CountryData } from "../types/TypesCountry";

const useRequest = (fetchRequest: (arg0: string) => any, searchValue: string) => {
  const [data, setData] = useState<CountryData[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fetchData = useCallback(async (searchValue: string) => {
    try {
      setLoading(true);
      const response = await fetchRequest(searchValue);
      setData(response.data);
      setError(null);
    } catch (error) {
      setError("Failed to fetch countries");
    } finally {
      setLoading(false);
    }
  }, [fetchRequest]);
  useEffect(() => {
    fetchData(searchValue);
  }, [fetchData, searchValue]);



  return { data, loading, error };
};

export default useRequest;
