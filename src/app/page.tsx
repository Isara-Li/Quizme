import SignInButton from "@/components/SignInButton";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

export default async function Home() {
  const session = await getServerSession();
  if (session?.user) {
    redirect("/dashboard");
  }
  return (
    <div className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
     
        <Card className="w-[300px]">
            <div className="text-center">
          <CardHeader>
            <CardTitle>Welcome to Quizme 🔥!</CardTitle>
            <CardDescription>
              Quizme is a platform for creating quizzes using AI! Get started by
              logging in below!
            </CardDescription>
          </CardHeader>
            </div>
          <CardContent>
            <div className="flex justify-center items-center">
              <SignInButton text="Sign In with Google" />
            </div>
          </CardContent>
        </Card>
      </div>
 
  );
}  
