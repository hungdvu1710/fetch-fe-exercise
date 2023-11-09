import { AlertDialog, Button } from "@radix-ui/themes";
import React from "react";

const LoginErrorDialog = ({
  isAuthenticated,
  returnToLoginPage,
}: {
  isAuthenticated: boolean;
  returnToLoginPage: () => void;
}) => {
  return (
    <AlertDialog.Root open={!isAuthenticated}>
      <AlertDialog.Content>
        <AlertDialog.Title>Error</AlertDialog.Title>
        <AlertDialog.Description size="2">
          You need to log in first
        </AlertDialog.Description>
        <AlertDialog.Action className="mt-5">
          <Button style={{ background: "red" }} onClick={returnToLoginPage}>
            Return to login page
          </Button>
        </AlertDialog.Action>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
};

export default LoginErrorDialog;
