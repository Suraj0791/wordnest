import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

import * as schema from "@/db/schema";

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, { schema });

const main = async () => {
    try {
        console.log("Seeding started");
        await db.delete(schema.courses);
        await db.delete(schema.userProgress);
        await db.delete(schema.units);
        await db.delete(schema.lessons);
        await db.delete(schema.challenges);
        await db.delete(schema.challengesOptions);
        await db.delete(schema.challengesProgress);
        await db.delete(schema.userSubscription);

        // Insert courses
        await db.insert(schema.courses).values([
            {
                id: 1,
                title: "Spanish",
                imageSrc: "/es.svg",
            },
            {
                id: 2,
                title: "French",
                imageSrc: "/fr.svg",
            },
            {
                id: 3,
                title: "Indian",
                imageSrc: "/in.svg",
            },
            {
                id: 4,
                title: "Italian",
                imageSrc: "/it.svg",
            }
        ])

        // Insert units
        await db.insert(schema.units).values([
            {
                id: 1,
                courseId: 1,
                title: "Unit 1",
                description: "Learn the basics of Spanish",
                order: 1,
            },
            {
                id: 2,
                courseId: 1,
                title: "Unit 2",
                description: "Expand your Spanish vocabulary",
                order: 2,
            },
        ])

        // Insert lessons
        await db.insert(schema.lessons).values([
            // Unit 1 lessons
            {
                id: 1,
                title: "People",
                unitId: 1,
                order: 1,
            },
            {
                id: 2,
                title: "Family",
                unitId: 1,
                order: 2,
            },
            {
                id: 3,
                title: "Characters",
                unitId: 1,
                order: 3,
            },
            {
                id: 4,
                title: "Mixed Practice",
                unitId: 1,
                order: 4,
            },
            {
                id: 5,
                title: "Unit 1 Review",
                unitId: 1,
                order: 5,
            },
            // Unit 2 lessons
            {
                id: 6,
                title: "Advanced People",
                unitId: 2,
                order: 1,
            },
            {
                id: 7,
                title: "Relationships",
                unitId: 2,
                order: 2,
            },
            {
                id: 8,
                title: "Unit 2 Review",
                unitId: 2,
                order: 3,
            },
        ]);

        // Insert challenges
        await db.insert(schema.challenges).values([
            // Lesson 1: People (man, woman, robot)
            {
                id: 1,
                lessonId: 1,
                type: "SELECT",
                order: "1",
                question: 'Which one of these is "the man"?'
            },
            {
                id: 2,
                lessonId: 1,
                type: "ASSIST",
                order: "2",
                question: '"the man"',
            },
            {
                id: 3,
                lessonId: 1,
                type: "SELECT",
                order: "3",
                question: 'Which one of these is "the robot"',
            },

            // Lesson 2: Family (boy, girl, woman)
            {
                id: 4,
                lessonId: 2,
                type: "SELECT",
                order: "1",
                question: 'Which one of these is "the boy"?'
            },
            {
                id: 5,
                lessonId: 2,
                type: "ASSIST",
                order: "2",
                question: '"the girl"',
            },
            {
                id: 6,
                lessonId: 2,
                type: "SELECT",
                order: "3",
                question: 'Which one of these is "the woman"?',
            },

            // Lesson 3: Characters (zombie, robot, man)
            {
                id: 7,
                lessonId: 3,
                type: "SELECT",
                order: "1",
                question: 'Which one of these is "the zombie"?'
            },
            {
                id: 8,
                lessonId: 3,
                type: "ASSIST",
                order: "2",
                question: '"the robot"',
            },
            {
                id: 9,
                lessonId: 3,
                type: "SELECT",
                order: "3",
                question: 'Which one of these is "the man"?',
            },

            // Lesson 4: Mixed Practice (all characters)
            {
                id: 10,
                lessonId: 4,
                type: "SELECT",
                order: "1",
                question: 'Which one of these is "the girl"?'
            },
            {
                id: 11,
                lessonId: 4,
                type: "ASSIST",
                order: "2",
                question: '"the zombie"',
            },
            {
                id: 12,
                lessonId: 4,
                type: "SELECT",
                order: "3",
                question: 'Which one of these is "the woman"?',
            },

            // Lesson 5: Unit 1 Review
            {
                id: 13,
                lessonId: 5,
                type: "SELECT",
                order: "1",
                question: 'Which one of these is "the robot"?'
            },
            {
                id: 14,
                lessonId: 5,
                type: "ASSIST",
                order: "2",
                question: '"the boy"',
            },
            {
                id: 15,
                lessonId: 5,
                type: "SELECT",
                order: "3",
                question: 'Which one of these is "the man"?',
            },

            // Unit 2 - Lesson 6: Advanced People
            {
                id: 16,
                lessonId: 6,
                type: "SELECT",
                order: "1",
                question: 'Which one of these is "the man"?'
            },
            {
                id: 17,
                lessonId: 6,
                type: "ASSIST",
                order: "2",
                question: '"the woman"',
            },
            {
                id: 18,
                lessonId: 6,
                type: "SELECT",
                order: "3",
                question: 'Which one of these is "the girl"?',
            },

            // Unit 2 - Lesson 7: Relationships
            {
                id: 19,
                lessonId: 7,
                type: "SELECT",
                order: "1",
                question: 'Which one of these is "the boy"?'
            },
            {
                id: 20,
                lessonId: 7,
                type: "ASSIST",
                order: "2",
                question: '"the zombie"',
            },
            {
                id: 21,
                lessonId: 7,
                type: "SELECT",
                order: "3",
                question: 'Which one of these is "the robot"?',
            },

            // Unit 2 - Lesson 8: Unit 2 Review
            {
                id: 22,
                lessonId: 8,
                type: "SELECT",
                order: "1",
                question: 'Which one of these is "the woman"?'
            },
            {
                id: 23,
                lessonId: 8,
                type: "ASSIST",
                order: "2",
                question: '"the man"',
            },
            {
                id: 24,
                lessonId: 8,
                type: "SELECT",
                order: "3",
                question: 'Which one of these is "the zombie"?',
            },
        ]);

        // Challenge options for Lesson 1
        await db.insert(schema.challengesOptions).values([
            // Challenge 1: Which one is "the man"?
            {
                challengeId: 1,
                imageSrc: "/man.svg",
                text: "el hombre",
                audioSrc: "/es_man.mp3",
                correct: true,
            },
            {
                challengeId: 1,
                imageSrc: "/woman.svg",
                text: "la mujer",
                audioSrc: "/es_woman.mp3",
                correct: false,
            },
            {
                challengeId: 1,
                imageSrc: "/robot.svg",
                text: "el robot",
                audioSrc: "/es_robot.mp3",
                correct: false,
            },
        ]);

        await db.insert(schema.challengesOptions).values([
            // Challenge 2: "the man" (ASSIST)
            {
                challengeId: 2,
                imageSrc: "/man.svg",
                text: "el hombre",
                audioSrc: "/es_man.mp3",
                correct: true,
            },
            {
                challengeId: 2,
                imageSrc: "/woman.svg",
                text: "la mujer",
                audioSrc: "/es_woman.mp3",
                correct: false,
            },
            {
                challengeId: 2,
                imageSrc: "/robot.svg",
                text: "el robot",
                audioSrc: "/es_robot.mp3",
                correct: false,
            },
        ]);

        await db.insert(schema.challengesOptions).values([
            // Challenge 3: Which one is "the robot"?
            {
                challengeId: 3,
                imageSrc: "/man.svg",
                text: "el hombre",
                audioSrc: "/es_man.mp3",
                correct: false,
            },
            {
                challengeId: 3,
                imageSrc: "/woman.svg",
                text: "la mujer",
                audioSrc: "/es_woman.mp3",
                correct: false,
            },
            {
                challengeId: 3,
                imageSrc: "/robot.svg",
                text: "el robot",
                audioSrc: "/es_robot.mp3",
                correct: true,
            },
        ]);

        // Challenge options for Lesson 2
        await db.insert(schema.challengesOptions).values([
            // Challenge 4: Which one is "the boy"?
            {
                challengeId: 4,
                imageSrc: "/boy.svg",
                text: "el niño",
                audioSrc: "/es_boy.mp3",
                correct: true,
            },
            {
                challengeId: 4,
                imageSrc: "/girl.svg",
                text: "la niña",
                audioSrc: "/es_girl.mp3",
                correct: false,
            },
            {
                challengeId: 4,
                imageSrc: "/woman.svg",
                text: "la mujer",
                audioSrc: "/es_woman.mp3",
                correct: false,
            },
        ]);

        await db.insert(schema.challengesOptions).values([
            // Challenge 5: "the girl" (ASSIST)
            {
                challengeId: 5,
                imageSrc: "/boy.svg",
                text: "el niño",
                audioSrc: "/es_boy.mp3",
                correct: false,
            },
            {
                challengeId: 5,
                imageSrc: "/girl.svg",
                text: "la niña",
                audioSrc: "/es_girl.mp3",
                correct: true,
            },
            {
                challengeId: 5,
                imageSrc: "/woman.svg",
                text: "la mujer",
                audioSrc: "/es_woman.mp3",
                correct: false,
            },
        ]);

        await db.insert(schema.challengesOptions).values([
            // Challenge 6: Which one is "the woman"?
            {
                challengeId: 6,
                imageSrc: "/boy.svg",
                text: "el niño",
                audioSrc: "/es_boy.mp3",
                correct: false,
            },
            {
                challengeId: 6,
                imageSrc: "/girl.svg",
                text: "la niña",
                audioSrc: "/es_girl.mp3",
                correct: false,
            },
            {
                challengeId: 6,
                imageSrc: "/woman.svg",
                text: "la mujer",
                audioSrc: "/es_woman.mp3",
                correct: true,
            },
        ]);

        // Challenge options for Lesson 3
        await db.insert(schema.challengesOptions).values([
            // Challenge 7: Which one is "the zombie"?
            {
                challengeId: 7,
                imageSrc: "/zombie.svg",
                text: "el zombi",
                audioSrc: "/es_zombie.mp3",
                correct: true,
            },
            {
                challengeId: 7,
                imageSrc: "/robot.svg",
                text: "el robot",
                audioSrc: "/es_robot.mp3",
                correct: false,
            },
            {
                challengeId: 7,
                imageSrc: "/man.svg",
                text: "el hombre",
                audioSrc: "/es_man.mp3",
                correct: false,
            },
        ]);

        await db.insert(schema.challengesOptions).values([
            // Challenge 8: "the robot" (ASSIST)
            {
                challengeId: 8,
                imageSrc: "/zombie.svg",
                text: "el zombi",
                audioSrc: "/es_zombie.mp3",
                correct: false,
            },
            {
                challengeId: 8,
                imageSrc: "/robot.svg",
                text: "el robot",
                audioSrc: "/es_robot.mp3",
                correct: true,
            },
            {
                challengeId: 8,
                imageSrc: "/man.svg",
                text: "el hombre",
                audioSrc: "/es_man.mp3",
                correct: false,
            },
        ]);

        await db.insert(schema.challengesOptions).values([
            // Challenge 9: Which one is "the man"?
            {
                challengeId: 9,
                imageSrc: "/zombie.svg",
                text: "el zombi",
                audioSrc: "/es_zombie.mp3",
                correct: false,
            },
            {
                challengeId: 9,
                imageSrc: "/robot.svg",
                text: "el robot",
                audioSrc: "/es_robot.mp3",
                correct: false,
            },
            {
                challengeId: 9,
                imageSrc: "/man.svg",
                text: "el hombre",
                audioSrc: "/es_man.mp3",
                correct: true,
            },
        ]);

        // Challenge options for Lesson 4 (Mixed Practice)
        await db.insert(schema.challengesOptions).values([
            // Challenge 10: Which one is "the girl"?
            {
                challengeId: 10,
                imageSrc: "/girl.svg",
                text: "la niña",
                audioSrc: "/es_girl.mp3",
                correct: true,
            },
            {
                challengeId: 10,
                imageSrc: "/boy.svg",
                text: "el niño",
                audioSrc: "/es_boy.mp3",
                correct: false,
            },
            {
                challengeId: 10,
                imageSrc: "/zombie.svg",
                text: "el zombi",
                audioSrc: "/es_zombie.mp3",
                correct: false,
            },
        ]);

        await db.insert(schema.challengesOptions).values([
            // Challenge 11: "the zombie" (ASSIST)
            {
                challengeId: 11,
                imageSrc: "/girl.svg",
                text: "la niña",
                audioSrc: "/es_girl.mp3",
                correct: false,
            },
            {
                challengeId: 11,
                imageSrc: "/boy.svg",
                text: "el niño",
                audioSrc: "/es_boy.mp3",
                correct: false,
            },
            {
                challengeId: 11,
                imageSrc: "/zombie.svg",
                text: "el zombi",
                audioSrc: "/es_zombie.mp3",
                correct: true,
            },
        ]);

        await db.insert(schema.challengesOptions).values([
            // Challenge 12: Which one is "the woman"?
            {
                challengeId: 12,
                imageSrc: "/girl.svg",
                text: "la niña",
                audioSrc: "/es_girl.mp3",
                correct: false,
            },
            {
                challengeId: 12,
                imageSrc: "/woman.svg",
                text: "la mujer",
                audioSrc: "/es_woman.mp3",
                correct: true,
            },
            {
                challengeId: 12,
                imageSrc: "/zombie.svg",
                text: "el zombi",
                audioSrc: "/es_zombie.mp3",
                correct: false,
            },
        ]);

        // Challenge options for Lesson 5 (Unit 1 Review)
        await db.insert(schema.challengesOptions).values([
            // Challenge 13: Which one is "the robot"?
            {
                challengeId: 13,
                imageSrc: "/robot.svg",
                text: "el robot",
                audioSrc: "/es_robot.mp3",
                correct: true,
            },
            {
                challengeId: 13,
                imageSrc: "/man.svg",
                text: "el hombre",
                audioSrc: "/es_man.mp3",
                correct: false,
            },
            {
                challengeId: 13,
                imageSrc: "/woman.svg",
                text: "la mujer",
                audioSrc: "/es_woman.mp3",
                correct: false,
            },
        ]);

        await db.insert(schema.challengesOptions).values([
            // Challenge 14: "the boy" (ASSIST)
            {
                challengeId: 14,
                imageSrc: "/boy.svg",
                text: "el niño",
                audioSrc: "/es_boy.mp3",
                correct: true,
            },
            {
                challengeId: 14,
                imageSrc: "/girl.svg",
                text: "la niña",
                audioSrc: "/es_girl.mp3",
                correct: false,
            },
            {
                challengeId: 14,
                imageSrc: "/robot.svg",
                text: "el robot",
                audioSrc: "/es_robot.mp3",
                correct: false,
            },
        ]);

        await db.insert(schema.challengesOptions).values([
            // Challenge 15: Which one is "the man"?
            {
                challengeId: 15,
                imageSrc: "/man.svg",
                text: "el hombre",
                audioSrc: "/es_man.mp3",
                correct: true,
            },
            {
                challengeId: 15,
                imageSrc: "/boy.svg",
                text: "el niño",
                audioSrc: "/es_boy.mp3",
                correct: false,
            },
            {
                challengeId: 15,
                imageSrc: "/zombie.svg",
                text: "el zombi",
                audioSrc: "/es_zombie.mp3",
                correct: false,
            },
        ]);

        // Challenge options for Unit 2 - Lesson 6
        await db.insert(schema.challengesOptions).values([
            // Challenge 16: Which one is "the man"?
            {
                challengeId: 16,
                imageSrc: "/man.svg",
                text: "el hombre",
                audioSrc: "/es_man.mp3",
                correct: true,
            },
            {
                challengeId: 16,
                imageSrc: "/woman.svg",
                text: "la mujer",
                audioSrc: "/es_woman.mp3",
                correct: false,
            },
            {
                challengeId: 16,
                imageSrc: "/robot.svg",
                text: "el robot",
                audioSrc: "/es_robot.mp3",
                correct: false,
            },
        ]);

        await db.insert(schema.challengesOptions).values([
            // Challenge 17: "the woman" (ASSIST)
            {
                challengeId: 17,
                imageSrc: "/man.svg",
                text: "el hombre",
                audioSrc: "/es_man.mp3",
                correct: false,
            },
            {
                challengeId: 17,
                imageSrc: "/woman.svg",
                text: "la mujer",
                audioSrc: "/es_woman.mp3",
                correct: true,
            },
            {
                challengeId: 17,
                imageSrc: "/robot.svg",
                text: "el robot",
                audioSrc: "/es_robot.mp3",
                correct: false,
            },
        ]);

        await db.insert(schema.challengesOptions).values([
            // Challenge 18: Which one is "the girl"?
            {
                challengeId: 18,
                imageSrc: "/girl.svg",
                text: "la niña",
                audioSrc: "/es_girl.mp3",
                correct: true,
            },
            {
                challengeId: 18,
                imageSrc: "/boy.svg",
                text: "el niño",
                audioSrc: "/es_boy.mp3",
                correct: false,
            },
            {
                challengeId: 18,
                imageSrc: "/woman.svg",
                text: "la mujer",
                audioSrc: "/es_woman.mp3",
                correct: false,
            },
        ]);

        // Challenge options for Unit 2 - Lesson 7
        await db.insert(schema.challengesOptions).values([
            // Challenge 19: Which one is "the boy"?
            {
                challengeId: 19,
                imageSrc: "/boy.svg",
                text: "el niño",
                audioSrc: "/es_boy.mp3",
                correct: true,
            },
            {
                challengeId: 19,
                imageSrc: "/girl.svg",
                text: "la niña",
                audioSrc: "/es_girl.mp3",
                correct: false,
            },
            {
                challengeId: 19,
                imageSrc: "/zombie.svg",
                text: "el zombi",
                audioSrc: "/es_zombie.mp3",
                correct: false,
            },
        ]);

        await db.insert(schema.challengesOptions).values([
            // Challenge 20: "the zombie" (ASSIST)
            {
                challengeId: 20,
                imageSrc: "/boy.svg",
                text: "el niño",
                audioSrc: "/es_boy.mp3",
                correct: false,
            },
            {
                challengeId: 20,
                imageSrc: "/girl.svg",
                text: "la niña",
                audioSrc: "/es_girl.mp3",
                correct: false,
            },
            {
                challengeId: 20,
                imageSrc: "/zombie.svg",
                text: "el zombi",
                audioSrc: "/es_zombie.mp3",
                correct: true,
            },
        ]);

        await db.insert(schema.challengesOptions).values([
            // Challenge 21: Which one is "the robot"?
            {
                challengeId: 21,
                imageSrc: "/robot.svg",
                text: "el robot",
                audioSrc: "/es_robot.mp3",
                correct: true,
            },
            {
                challengeId: 21,
                imageSrc: "/man.svg",
                text: "el hombre",
                audioSrc: "/es_man.mp3",
                correct: false,
            },
            {
                challengeId: 21,
                imageSrc: "/zombie.svg",
                text: "el zombi",
                audioSrc: "/es_zombie.mp3",
                correct: false,
            },
        ]);

        // Challenge options for Unit 2 - Lesson 8 (Final Review)
        await db.insert(schema.challengesOptions).values([
            // Challenge 22: Which one is "the woman"?
            {
                challengeId: 22,
                imageSrc: "/woman.svg",
                text: "la mujer",
                audioSrc: "/es_woman.mp3",
                correct: true,
            },
            {
                challengeId: 22,
                imageSrc: "/girl.svg",
                text: "la niña",
                audioSrc: "/es_girl.mp3",
                correct: false,
            },
            {
                challengeId: 22,
                imageSrc: "/robot.svg",
                text: "el robot",
                audioSrc: "/es_robot.mp3",
                correct: false,
            },
        ]);

        await db.insert(schema.challengesOptions).values([
            // Challenge 23: "the man" (ASSIST)
            {
                challengeId: 23,
                imageSrc: "/man.svg",
                text: "el hombre",
                audioSrc: "/es_man.mp3",
                correct: true,
            },
            {
                challengeId: 23,
                imageSrc: "/boy.svg",
                text: "el niño",
                audioSrc: "/es_boy.mp3",
                correct: false,
            },
            {
                challengeId: 23,
                imageSrc: "/zombie.svg",
                text: "el zombi",
                audioSrc: "/es_zombie.mp3",
                correct: false,
            },
        ]);

        await db.insert(schema.challengesOptions).values([
            // Challenge 24: Which one is "the zombie"?
            {
                challengeId: 24,
                imageSrc: "/zombie.svg",
                text: "el zombi",
                audioSrc: "/es_zombie.mp3",
                correct: true,
            },
            {
                challengeId: 24,
                imageSrc: "/robot.svg",
                text: "el robot",
                audioSrc: "/es_robot.mp3",
                correct: false,
            },
            {
                challengeId: 24,
                imageSrc: "/man.svg",
                text: "el hombre",
                audioSrc: "/es_man.mp3",
                correct: false,
            },
        ]);

        console.log("Seeding finished");
    } catch (err) {
        console.error(err);
        throw new Error("Failed to seed database")
    }
}


main()