import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "../db/schema";

const sql = neon(process.env.DATABASE_URL!);
// @ts-ignore
const db = drizzle(sql, { schema });

const main = async () => {
  try {
    console.log("Seeding database...");

    // Correct deletion order to respect foreign key constraints
    await db.delete(schema.userProgress);
    await db.delete(schema.challengesOptions);
    await db.delete(schema.challengesProgress);
    await db.delete(schema.challenges);
    await db.delete(schema.lessons);
    await db.delete(schema.units);
    await db.delete(schema.courses);
    await db.delete(schema.userSubscription);

    // Insert Courses
    const courses = await db
      .insert(schema.courses)
      .values([{ title: "Spanish", imageSrc: "/es.svg" }])
      .returning();

    // Insert Units for the Spanish course
    const units = await db
      .insert(schema.units)
      .values([
        { courseId: courses[0].id, title: "Unit 1", description: `Learn the basics of ${courses[0].title}`, order: 1 },
        { courseId: courses[0].id, title: "Unit 2", description: `Learn intermediate ${courses[0].title}`, order: 2 },
      ])
      .returning();

    // Insert Lessons for Unit 1
    const lessonsUnit1 = await db
      .insert(schema.lessons)
      .values([
        { unitId: units[0].id, title: "Nouns", order: 1 },
        { unitId: units[0].id, title: "Verbs", order: 2 },
      ])
      .returning();

    // Insert Lessons for Unit 2
    const lessonsUnit2 = await db
      .insert(schema.lessons)
      .values([
        { unitId: units[1].id, title: "Adjectives", order: 1 },
        { unitId: units[1].id, title: "Phrases", order: 2 },
      ])
      .returning();

    // --- Challenges and Options for Lesson 1 (Nouns) ---
    const challengesNouns = await db
      .insert(schema.challenges)
      .values([
        { lessonId: lessonsUnit1[0].id, type: "SELECT", question: 'Which one of these is "the man"?', order: "1" },
        { lessonId: lessonsUnit1[0].id, type: "ASSIST", question: '"the man"', order: "2" },
        { lessonId: lessonsUnit1[0].id, type: "SELECT", question: 'Which one of these is "the woman"?', order: "3" },
      ])
      .returning();
      
    await db.insert(schema.challengesOptions).values([
      { challengeId: challengesNouns[0].id, correct: true, text: "el hombre", imageSrc: "/man.svg", audioSrc: "/es_man.mp3" },
      { challengeId: challengesNouns[0].id, correct: false, text: "la mujer", imageSrc: "/woman.svg", audioSrc: "/es_woman.mp3" },
      { challengeId: challengesNouns[0].id, correct: false, text: "el chico", imageSrc: "/boy.svg", audioSrc: "/es_boy.mp3" },
      
      { challengeId: challengesNouns[1].id, correct: true, text: "el hombre", imageSrc: "/unselected.svg", audioSrc: "/es_man.mp3" },
      { challengeId: challengesNouns[1].id, correct: false, text: "la mujer", imageSrc: "/unselected.svg", audioSrc: "/es_woman.mp3" },

      { challengeId: challengesNouns[2].id, correct: false, text: "el hombre", imageSrc: "/man.svg", audioSrc: "/es_man.mp3" },
      { challengeId: challengesNouns[2].id, correct: true, text: "la mujer", imageSrc: "/woman.svg", audioSrc: "/es_woman.mp3" },
      { challengeId: challengesNouns[2].id, correct: false, text: "el chico", imageSrc: "/boy.svg", audioSrc: "/es_boy.mp3" },
    ]);

    // --- Challenges and Options for Lesson 2 (Verbs) ---
    const challengesVerbs = await db
      .insert(schema.challenges)
      .values([
        { lessonId: lessonsUnit1[1].id, type: "SELECT", question: '"The robot runs"', order: "1" },
        { lessonId: lessonsUnit1[1].id, type: "SELECT", question: '"The boy jumps"', order: "2" },
      ])
      .returning();

    await db.insert(schema.challengesOptions).values([
      { challengeId: challengesVerbs[0].id, correct: true, text: "el robot", imageSrc: "/robot.svg", audioSrc: "/es_robot.mp3" },
      { challengeId: challengesVerbs[0].id, correct: false, text: "el zombi", imageSrc: "/zombie.svg", audioSrc: "/es_zombie.mp3" },
      
      { challengeId: challengesVerbs[1].id, correct: false, text: "la niña", imageSrc: "/girl.svg", audioSrc: "/es_girl.mp3" },
      { challengeId: challengesVerbs[1].id, correct: true, text: "el chico", imageSrc: "/boy.svg", audioSrc: "/es_boy.mp3" },
    ]);

    console.log("Database seeded successfully");
  } catch (error) {
    console.error(error);
    throw new Error("Failed to seed database");
  }
};

main();