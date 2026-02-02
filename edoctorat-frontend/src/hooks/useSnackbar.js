import { useState } from "react";

export const useSnackbar = () => {
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    type: "info", // success | error | warning | info
  });

  const showSnackbar = (message, type = "info") => {
    setSnackbar({
      open: true,
      message,
      type,
    });
  };

  const closeSnackbar = () => {
    setSnackbar((prev) => ({
      ...prev,
      open: false,
    }));
  };

  return {
    snackbar,
    showSnackbar,
    closeSnackbar,
  };
};
