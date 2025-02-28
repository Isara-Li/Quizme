"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { signOut } from "next-auth/react";


export function TabsDemo({ userName = "", userID, userEmail }: { userName?: string, userID: string, userEmail: string }) {
  const [name, setName] = useState(userName)
  const router = useRouter()

  const { mutate: saveProfile } = useMutation({
    mutationFn: async ({ userID, name }: { userID: string; name: string }) => {
      const response = await axios.patch("/api/profile", { userID, name });
      return response.data;
    },
    onMutate: () => {
     
    },
    onSuccess: async () => {
        signOut();
      router.refresh();

    },
    onError: (error) => {
      console.error(error);
      alert("An error occurred while updating the profile.");
    },
    onSettled: () => {

    },
  });
  
  const handleSaveChanges = () => {
    saveProfile({ userID, name });
  };
  

  return (
    <Tabs defaultValue="account" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <Card>
          <CardHeader>
            <CardTitle>Account</CardTitle>
            <CardDescription>
              Make changes to your account here. Click save when you're done.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="name">Name</Label>
              <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="space-y-1">
              <Label htmlFor="userID">User ID</Label>
              <Input id="userID" defaultValue={userID} disabled />
            </div>
            <div className="space-y-1">
              <Label htmlFor="userEmail">User Email</Label>
              <Input id="userEmail" defaultValue={userEmail} disabled />
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleSaveChanges}>Save changes</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="password">
        <Card>
          <CardHeader>
            <CardTitle>Password</CardTitle>
            <CardDescription>
              Change your password here. After saving, you'll be logged out.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="current">Current password</Label>
              <Input id="current" type="password" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="new">New password</Label>
              <Input id="new" type="password" />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save password</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  )
}

export default TabsDemo
