"use client";

import { useState } from "react";
import axios from "axios";

export default function useAi() {
  const [loading, setLoading] = useState(false);

  const [response, setResponse] = useState("");

  const [question, setQuestion] = useState("");

  async function summarize(content: string) {
    if (!content.trim()) return;

    try {
      setLoading(true);

      const res = await axios.post("/api/ai/summarize", {
        content,
      });

      setResponse(res.data.summary);
    } catch (error) {
      console.log(error);

      setResponse("Something went wrong while summarizing.");
    } finally {
      setLoading(false);
    }
  }

  async function explain(content: string) {
    if (!content.trim()) return;

    try {
      setLoading(true);

      const res = await axios.post("/api/ai/explain", {
        content,
      });

      setResponse(res.data.explanation);
    } catch (error) {
      console.log(error);

      setResponse("Something went wrong while explaining.");
    } finally {
      setLoading(false);
    }
  }

  async function askAi() {
    if (!question.trim()) return;

    try {
      setLoading(true);

      const res = await axios.post("/api/ai/askAi", {
        question,
      });
      console.log(res.data);
      setResponse(res.data.answer);
    } catch (error) {
      console.log(error);

      setResponse("Something went wrong while asking AI.");
    } finally {
      setLoading(false);
    }
  }

  function clearResponse() {
    setResponse("");
  }

  return {
    loading,

    response,

    question,

    setQuestion,

    summarize,

    explain,

    askAi,

    clearResponse,
  };
}