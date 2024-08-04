import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { create } from "zustand";

const useSubmitProposal = (title, description) => {
  const fetchData = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8080/api/proposals/create-proposal",
        {
          title,
          description,
        },
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("access_token")}`,
          },
        }
      );
      console.log(res.data);
    } catch (error) {
      console.log("error : " + error.message);
    }
  };
  fetchData();
};

const useGetProposalsByStudent = create((set) => ({
  proposals: [],
  error: null,
  isLoading: false,
  fetch: async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/proposals/get-proposals-by-student", {
        headers: {
          Authorization: `Bearer ${Cookies.get("access_token")}`,
        },
      });
      set({ proposals: await res.data });
    } catch (error) {
      set({ error: error.message });
    } finally {
      set({ isLoading: true });
    }
  },
}));

const useGetAllProposals = create((set) => ({
  proposals: [],
  error: null,
  isLoading: false,
  fetchProposals: async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/proposals/get-student-approvals");
      set({ proposals: await res.data });
    } catch (error) {
      set({ error: error.message });
    } finally {
      set({ isLoading: true });
    }
  },
}));

const useGetProposalsByStudentId = create((set) => ({
  proposals: [],
  error: null,
  isLoading: false,
  fetch: async (student_id) => {
    try {
      const res = await axios.post("http://localhost:8080/api/proposals/get-proposals-by-studentId", {
        student_id,
      });
      set({ proposals: await res.data });
    } catch (error) {
      set({ error: error.message });
    } finally {
      set({ isLoading: true });
    }
  },
}));

export { useSubmitProposal, useGetProposalsByStudent, useGetProposalsByStudentId, useGetAllProposals };
