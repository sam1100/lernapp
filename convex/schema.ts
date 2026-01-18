import { defineSchema, defineTable } from "convex/server";

import { v } from "convex/values";
import { COIN_REASONS, GERMAN_WORD_TYPES, getEnumValues } from "./enums";

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
        type: v.union(...getEnumValues(GERMAN_WORD_TYPES).map(v.literal)),
    }),
    coins: defineTable({
        amount: v.number(), // Ist negative, wenn Nico Muenzen ausgibt
        total_amount: v.number(),
        date: v.string(),
        reason: v.union(...getEnumValues(COIN_REASONS).map(v.literal)),
    }),
    rewards_config: defineTable({
        reason: v.union(...getEnumValues(COIN_REASONS).map(v.literal)),
        reward100: v.number(),
        reward90: v.number(),
        reward80: v.number(),
    }),
});
