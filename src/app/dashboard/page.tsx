import HistoryCard from "@/components/dashboard/HistoryCard";
import HotTopicsCard from "@/components/dashboard/HotTopicsCard";
import QuizMeCard from "@/components/dashboard/QuizMeCard";
import RecentActivityCard from "@/components/dashboard/RecentActivityCard";
import { getAuthSession } from "@/lib/nextauth";
import { redirect } from "next/navigation";
import React from "react";
import TypingText from "@/components/typing-text";
import AnimatedCard from "@/components/dashboard/AnimatedCard";
import AnimatedBorderTrail from "@/components/MovingLine";



type Props = {};

export const metadata = {
  title: "Dashboard | Quizeme",
  description: "Quiz yourself on anything!",
};

const Dashboard = async (props: Props) => {
  const session = await getAuthSession();
  if (!session?.user) {
    redirect("/");
  }

  return (

    <main className="p-8 mx-auto max-w-7xl">
  
        <TypingText text="Welcome to Quizeme!" repeat = {false} className="text-2xl font-bold text-center" />
      <div className="flex items-center text-center justify-center gap-4 p-4">
        <h2 className="mr-2 text-3xl font-bold tracking-tight p-4 ">Dashboard</h2>
      </div>
<div className="flex items-centers justify-center gap-4 p-4">
        <AnimatedCard title="Students use this for studying." percentage={90} />
        <AnimatedCard title ="Students who uses this pass their exams." percentage={75} /></div>
      <div className="grid gap-4 mt-4 md:grid-cols-2">
        <AnimatedBorderTrail
    className="rounded-full bg-zinc-600 hover:bg-zinc-500 w-full"
    contentClassName="rounded-full bg-zinc-800"
    trailColor="white" trailSize = 'lg' duration = "5s"
  >
        <QuizMeCard />
        </AnimatedBorderTrail>
        <AnimatedBorderTrail
    className="rounded-full bg-zinc-600 hover:bg-zinc-500 w-full"
    contentClassName="rounded-full bg-zinc-800"
    trailColor="white" trailSize = 'lg' duration = "5s"
  >
        <HistoryCard />
        </AnimatedBorderTrail> 
      </div>
      <div className="grid gap-4 mt-4 md:grid-cols-2 lg:grid-cols-7">
        <HotTopicsCard />
        <RecentActivityCard />
      </div>
    </main>
  );
};

export default Dashboard;
