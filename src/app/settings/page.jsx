"use client";
import { useState, useEffect } from "react";

export default function Settings() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await fetch("/api/updateSettings", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        setPrompt(data.prompt);
      } catch (error) {
        console.error("Error fetching settings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  const handleChange = (event) => {
    setPrompt(event.target.value);
  };

  const handleClick = async () => {
    try {
      const response = await fetch("/api/updateSettings", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      if (response.ok) {
        setAlert({ type: "success", message: "Prompt updated successfully!" });
      } else {
        const errorData = await response.json();
        setAlert({ type: "error", message: `Update failed: ${errorData.error}` });
      }
    } catch (error) {
      setAlert({ type: "error", message: `Update failed: ${error.message}` });
    }
  };

  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {alert && (
            <div
              className={`alert ${alert.type === "success" ? "alert-success" : "alert-error"}`}
              role="alert"
            >
              {alert.message}
            </div>
          )}
          <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Prompt Editor
          </label>
          <textarea
            value={prompt}
            onChange={handleChange}
            id="message"
            rows="4"
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
            placeholder="Write your thoughts here..."
          ></textarea>
          <button
            onClick={handleClick}
            className="mt-2 px-4 py-2 bg-green-500 text-white rounded-lg"
          >
            Update
          </button>
        </>
      )}
    </>
  );
}
