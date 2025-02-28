import React from "react";

import { getAuthSession } from "@/lib/nextauth";
import { redirect } from "next/navigation";
import Profile from "@/components/Profile";

export const metadata = {
  title: "Quizme",
  description: "Quiz yourself on anything!",
};

interface Props {
  searchParams: {
    topic?: string;
  };
}

const ProfilePage = async ({ searchParams }: Props) => {
  const session = await getAuthSession();

  if (!session?.user) {
    redirect("/");
  }
  return (
    <div className= "flex items-center justify-center gap-4 p-4" >
    <Profile userName={ session?.user.name ?? undefined } userEmail = { session?.user.email ?? "" } userID = { session?.user.id } /> </div>);
};

export default ProfilePage;