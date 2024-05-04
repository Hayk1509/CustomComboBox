import { useCallback, useState } from "react";
import { CountryData } from "../types/TypesCountry";

const useRequest = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<CountryData[] | []>([]);

  const fetchData = useCallback(async (apiFunction: any) => {
    setLoading(true);
    const { data, error } = await apiFunction();
    if (data) {
      setData(data);
    } else {
      setError(error);
    }
    setLoading(false);
  }, []);

  return { loading, error, data, fetchData };
};

export default useRequest;
