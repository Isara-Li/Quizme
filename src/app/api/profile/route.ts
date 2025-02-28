import { NextResponse } from "next/server"
import { prisma } from "@/lib/db";

export async function PATCH(req: Request) {
    try {
        const { userID, name } = await req.json()
        console.log(userID, name)
        if (!userID || !name) {
            return NextResponse.json({ error: "User ID and Name are required" }, { status: 400 })
        }

        // Update user name in the database
        const updatedUser = await prisma.user.update({
            where: { id: userID },
            data: { name },
        })

        return NextResponse.json({ message: "Profile updated successfully", user: updatedUser })
    } catch (error) {
        console.error("Error updating profile:", error)
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}
