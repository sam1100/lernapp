import { defineSchema, defineTable } from "convex/server";

import { v } from "convex/values";

export default defineSchema({
    math_multiplication: defineTable({
        serie: v.number(),
        multipliers: v.array(v.number()),
        repetitions: v.number(),
    }),
    math_division: defineTable({
        serie: v.number(),
        multipliers: v.array(v.number()),
        repetitions: v.number(),
    }),
    german_words: defineTable({
        word: v.array(v.object({
            text: v.string(),
            emphasise: v.optional(v.boolean()), // Hex-Farbe wie "#FF0000"
        })),
        current: v.boolean(),
        repetitions: v.number(),
        type: v.union(v.literal("noun"), v.literal("verb"), v.literal("adjective")),
    }),

});
