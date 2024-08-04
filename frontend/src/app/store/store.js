"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { create } from "zustand";
import Cookies from "js-cookie";

const useAuth = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetch = async (payload) => {
    setIsLoading(true);
    try {
      const res = await axios.post("http://localhost:8080/api/users/login", payload);
      setData(res.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { data, isLoading, error, fetch };
};

const useGetData = (apiUrl, access_token) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(apiUrl, {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        });
        setData(res.data);
      } catch (error) {
        console.log("error : " + error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [apiUrl]);

  return { data, isLoading };
};

const useGetUserData = create((set) => ({
  users: [],
  error: null,
  isLoading: false,
  fetch: async () => {
    set({ isLoading: true });
    try {
      const res = await axios.get("http://localhost:8080/api/users/get-user-data", {
        headers: {
          Authorization: `Bearer ${Cookies.get("access_token")}`,
        },
      });
      console.log("response  : ", res);
      set({ users: await res.data });
    } catch (error) {
      set({ error: error.message });
    } finally {
      set({ isLoading: true });
    }
  },
}));

// useGetUserData().fetchUserData(Cookies.get("access_token"));

const usePostData = (apiUrl, payload) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.post(apiUrl, payload);
        setData(res.data);
      } catch (error) {
        console.log("error : " + error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [apiUrl, payload]);

  return { data, isLoading };
};

export { useGetData, usePostData, useAuth, useGetUserData };
