"use client";
import Vapi from "@vapi-ai/web";
import { useState, useEffect } from "react";
import { HoverBorderGradient } from "./hover-border-gradient";
import { Mic, AlertTriangle } from "lucide-react"; // Import AlertTriangle

// Initialize Vapi with your Public API Key
export const vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_PUBLIC_API!);

export default function VapiAssistant() {
  const [callStatus, setCallStatus] = useState("inactive");
  const [error, setError] = useState<string | null>(null); // State to hold error messages

  const start = () => {
    setCallStatus("loading");
    setError(null); // Reset error state on new attempt
    vapi.start(process.env.NEXT_PUBLIC_ASSISTANT_ID!);
  };

  const stop = () => {
    setCallStatus("loading");
    vapi.stop();
  };

  useEffect(() => {
    vapi.on("call-start", () => {
      setCallStatus("active");
      setError(null); // Clear any previous errors when a call starts
    });

    vapi.on("call-end", () => setCallStatus("inactive"));

    // --- ADDED ERROR HANDLING ---
    vapi.on("error", (e) => {
      console.error(e); // Log the error for debugging
      setError("Live AI demo is currently unavailable.");
      setCallStatus("inactive");
    });
    // --- END OF ERROR HANDLING ---

    return () => {
      vapi.removeAllListeners();
    };
  }, []);

  const renderButtonContent = () => {
    // If there's an error, show the error message
    if (error) {
      return (
        <>
          <AlertTriangle className="h-5 w-5 mr-2 text-yellow-500" />
          <span>{error}</span>
        </>
      );
    }
    // Otherwise, show the normal status
    switch (callStatus) {
      case "loading":
        return <span className="animate-pulse">One Sec..</span>;
      case "active":
        return <span onClick={stop}>Press to Stop</span>;
      case "inactive":
      default:
        return (
          <span onClick={start}>
            <Mic className="h-5 w-5 mr-1 inline-block" />
            Give it a try
          </span>
        );
    }
  };

  return (
    <div className="flex justify-center text-center">
      <div className="tooltip">
        {!error && <div className="tooltiptext">Please Use Responsibly 🙂</div>}
        <HoverBorderGradient
          containerClassName="rounded-full"
          as="button"
          className="dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2 cursor-pointer"
        >
          {renderButtonContent()}
        </HoverBorderGradient>
      </div>
    </div>
  );
}