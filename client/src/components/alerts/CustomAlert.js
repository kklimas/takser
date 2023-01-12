import { Alert, Snackbar } from "@mui/material";

export const CustomAlert = ({ displayAlert, setDisplay, type }) => {
  const handleNotDisplayAlert = (event, reason) => {
    setDisplay(false);
  };
  const getMessageFromType = () => {
    return type === "success"
      ? "Action invoked correctly"
      : "Something bad happened";
  };

  return (
    <Snackbar
      open={displayAlert}
      autoHideDuration={3000}
      onClose={handleNotDisplayAlert}
    >
      <Alert
        onClose={handleNotDisplayAlert}
        severity={type}
        sx={{ width: "100%" }}
      >
        {getMessageFromType()}
      </Alert>
    </Snackbar>
  );
};
