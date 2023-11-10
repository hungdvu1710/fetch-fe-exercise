import { AlertDialog, Button } from "@radix-ui/themes";
import React from "react";
import { useRouter } from "next/navigation";

const LoginErrorDialog = ({
  isAuthenticated,
}: {
  isAuthenticated: boolean;
}) => {
  const router = useRouter();
  return (
    <AlertDialog.Root open={!isAuthenticated}>
      <AlertDialog.Content>
        <AlertDialog.Title>Error</AlertDialog.Title>
        <AlertDialog.Description size="2">
          You need to log in first
        </AlertDialog.Description>
        <AlertDialog.Action className="mt-5">
          <Button
            style={{ background: "red" }}
            onClick={() => router.push("/")}
          >
            Return to login page
          </Button>
        </AlertDialog.Action>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
};

export default LoginErrorDialog;
