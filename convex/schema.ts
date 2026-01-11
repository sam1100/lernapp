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

});
