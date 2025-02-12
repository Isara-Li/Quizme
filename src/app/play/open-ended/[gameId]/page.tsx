import OpenEnded from "@/components/OpenEnded";
import { prisma } from "@/lib/db";
import { getAuthSession } from "@/lib/nextauth";
import { redirect } from "next/navigation";
import React from "react";

type Props = {
  params: {
    gameId: string;
  };
};

export default function OpenEndedPage({ params: { gameId } }: Props) {
  return <OpenEndedPageContent gameId={gameId} />;
}

async function OpenEndedPageContent({ gameId }: { gameId: string }) {
  const session = await getAuthSession();
  if (!session?.user) {
    redirect("/");
    return null;
  }

  const game = await prisma.game.findUnique({
    where: {
      id: gameId,
    },
    include: {
      questions: {
        select: {
          id: true,
          question: true,
          answer: true,
        },
      },
    },
  });

  if (!game || game.gameType === "mcq") {
    redirect("/quiz");
    return null;
  }

  return <OpenEnded game={game} />;
}
