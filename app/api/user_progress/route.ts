import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

import db from "@/db/drizzle";
import { getUserProgress } from "@/db/queries";
import { userProgress } from "@/db/schema";
import { eq } from "drizzle-orm";

export const GET = async () => {
  const { userId } = await auth();

  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const data = await getUserProgress();

  return NextResponse.json(data);
};

export const POST = async (req: Request) => {
  const { userId } = await auth();
  
  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const body = await req.json();

  // TODO: Check if user is subscribed

  await db.update(userProgress).set({
    ...body,
  }).where(eq(userProgress.userId, userId));

  return new NextResponse("OK");
}