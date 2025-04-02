import { useState, useEffect } from "react";
import axios, { AxiosRequestConfig } from "axios";

const API_BASE_URL = "http://localhost:3000/";

interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export const useFetch = <T>(endpoint: string, config?: AxiosRequestConfig) => {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      setState((prev) => ({ ...prev, loading: true }));

      try {
        const response = await axios.get<T>(`${API_BASE_URL}${endpoint}`, config);

        if (isMounted) setState({ data: response.data, loading: false, error: null });
      } catch (err) {
        if (isMounted) setState({ data: null, loading: false, error: "Failed to retrieve data" });
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [endpoint, config]);

  return state;
};
