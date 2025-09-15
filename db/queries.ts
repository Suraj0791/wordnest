import { cache } from "react";
import { auth } from "@clerk/nextjs";
import { eq } from "drizzle-orm";

import db from "@/db/drizzle";
import { 
  courses,
  userProgress,
} from "@/db/schema";

export const getCourses = cache(async () => {
  const data = await db.query.courses.findMany();

  return data;
});

export const getUserProgress = cache(async () => {
  const { userId } = await auth();

  if (!userId) {
    return null;
  }

  const data = await db.query.userProgress.findFirst({
    where: eq(userProgress.userId, userId),
    with: {
      activeCourse: true,
    },
  });

  return data;
});

export const getCourseById = cache(async (courseId: number) => {
  const data = await db.query.courses.findFirst({
    where: eq(courses.id, courseId),
    // TODO: Populate units and lessons
  });

  return data;
})

// Add this function to your existing db/queries.ts file

export const getTopTenUsers = cache(async () => {
  const { userId } = await auth();

  if (!userId) {
    return [];
  }
  
  const data = await db.query.userProgress.findMany({
    orderBy: (userProgress, { desc }) => [desc(userProgress.points)],
    limit: 10,
    columns: {
      userId: true,
      userName: true,
      userImageSrc: true,
      points: true,
    },
  });

  return data;
});