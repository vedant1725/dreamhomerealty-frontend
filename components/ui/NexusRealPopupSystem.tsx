"use client";

import React, { useState, useEffect, useRef } from "react";
import NexusRealModal from "./NexusRealModal";

export default function NexusRealPopupSystem() {
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [closeCount, setCloseCount] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Check if form is already submitted on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const submitted = localStorage.getItem("nexus_consultation_submitted");
      if (submitted === "true") {
        setIsSubmitted(true);
        return;
      }

      // Initial load: Wait 5 seconds and open the popup
      startTimer(5000);
    }

    return () => {
      clearExistingTimer();
    };
  }, []);

  const clearExistingTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  const startTimer = (ms: number) => {
    clearExistingTimer();
    timerRef.current = setTimeout(() => {
      setIsOpen(true);
      setIsClosing(false);
    }, ms);
  };

  const handleClose = () => {
    if (isClosing) return; // Prevent double trigger
    
    // Start closing transition
    setIsClosing(true);
    
    // Wait for the exit animation to finish (300ms) before unmounting/hiding
    timerRef.current = setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
      
      const newCloseCount = closeCount + 1;
      setCloseCount(newCloseCount);
      
      // Determine reopen delay: 5 minutes (300000ms) for first close, 10 minutes (600000ms) for subsequent closes
      const reopenDelay = newCloseCount === 1 ? 5 * 60 * 1000 : 10 * 60 * 1000;
      
      console.log(`NexusRealPopup closed. Count: ${newCloseCount}. Scheduling reopen in ${reopenDelay / 1000}s`);
      startTimer(reopenDelay);
    }, 300);
  };

  const handleSubmitSuccess = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem("nexus_consultation_submitted", "true");
    }
    setIsSubmitted(true);
    
    // Smoothly close after a short delay so user sees success message
    setIsClosing(true);
    timerRef.current = setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
      clearExistingTimer();
    }, 1500);
  };

  // Provide a global window function to trigger the popup for debugging/testing
  useEffect(() => {
    if (typeof window !== "undefined") {
      (window as any).triggerNexusPopup = () => {
        clearExistingTimer();
        setIsClosing(false);
        setIsOpen(true);
        console.log("NexusRealPopup manually triggered.");
      };
    }
    return () => {
      if (typeof window !== "undefined") {
        delete (window as any).triggerNexusPopup;
      }
    };
  }, []);

  if (isSubmitted) return null;
  if (!isOpen) return null;

  return (
    <NexusRealModal 
      isOpen={isOpen} 
      isClosing={isClosing}
      onClose={handleClose} 
      onSubmitSuccess={handleSubmitSuccess} 
    />
  );
}
