import { defineSchema, defineTable } from "convex/server";

import { v } from "convex/values";
import { COIN_REASONS, GERMAN_WORD_TYPES, getEnumValues, MATH_OPERATION_TYPES } from "./enums";

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
    math_addition: defineTable({
        addends: v.array(v.object({
            from: v.number(),
            to: v.number(),
        })),
        repetitions: v.number(),
    }),
    math_subtraction: defineTable({
        addends: v.array(v.object({
            from: v.number(),
            to: v.number(),
        })),
        repetitions: v.number(),
    }),
    math_add_sub_mixed: defineTable({
        operands: v.array(v.object({
            valueFrom: v.number(),
            valueTo: v.number(),
            power: v.optional(v.number()), // Optionales Feld für die Potenzierung
        })),
        hasGap: v.boolean(),
        type: v.union(...getEnumValues(MATH_OPERATION_TYPES).map(v.literal)),
        repetitions: v.number(),
    }),
    math_division_remainder: defineTable({
        serie: v.number(),
        divisors: v.array(v.number()),
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
    time: defineTable({
        analog_digital_repetitions: v.number(),
        digital_analog_repetitions: v.number(),
        verbally_repetitions: v.number(),
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
