import React, { useEffect } from "react";
import "../assets/alert.css";

interface AlertProps {
  message: string;
  type?: "success" | "error" | "info";
  onClose: () => void;
}

const Alert = ({ message, type, onClose }: AlertProps) => {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message, onClose]);

  if (!message) return null;

  return <div className={`alert alert-${type}`}>{message}</div>;
};

export default Alert;
