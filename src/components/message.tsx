"use client";

import { useState } from "react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

const SignOutItem = () => {
  const [open, setOpen] = useState(false); // State to control the AlertDialog
  const [confirmStep, setConfirmStep] = useState(false);
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await signOut({ redirect: false });
      alert("Signed out successfully");
      router.push("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        {/* Use DropdownMenuItem as the trigger */}
        <DropdownMenuItem
          className="text-red-600 cursor-pointer"
          onSelect={(e) => e.preventDefault()} // Prevent default dropdown menu behavior
        >
          Sign out
        </DropdownMenuItem>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {confirmStep ? "Are you absolutely sure?" : "Are you sure?"}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {confirmStep
              ? "This action cannot be undone. Press OK to sign out."
              : "You will be signed out of your account."}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setConfirmStep(false)}>
            Cancel
          </AlertDialogCancel>
          {!confirmStep ? (
            <Button variant="destructive" onClick={() => setConfirmStep(true)}>
              OK
            </Button>
          ) : (
            <AlertDialogAction onClick={handleSignOut}>
              Sign Out
            </AlertDialogAction>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default SignOutItem;