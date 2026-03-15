import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getMathMultiplicationConfig = query({
    args: {},
    handler: async (ctx) => {
        const config = await ctx.db.query("math_multiplication").collect();
        return config;
    },
});

export const updateMathMultiplicationConfig = mutation({
    args: {
        id: v.id("math_multiplication"),
        serie: v.number(),
        multipliers: v.array(v.number()),
        repetitions: v.number(),
    },
    handler: async (ctx, args) => {
        const config = await ctx.db.get(args.id);
        if (!config) {
            throw new ConvexError(`MatchMultiplicationConfig with ID '${args.id}' not found`);
        }
        await ctx.db.patch(args.id, {
            serie: args.serie,
            multipliers: args.multipliers,
            repetitions: args.repetitions,
        });
    }
});

export const getMathDivisionConfig = query({
    args: {},
    handler: async (ctx) => {
        const config = await ctx.db.query("math_division").collect();
        return config;
    },
});

export const getMathAdditionConfig = query({
    args: {},
    handler: async (ctx) => {
        const config = await ctx.db.query("math_addition").collect();
        return config;
    },
});

export const getMathSubtractionConfig = query({
    args: {},
    handler: async (ctx) => {
        const config = await ctx.db.query("math_subtraction").collect();
        return config;
    },
});

export const getMathAddSubMixedConfig = query({
    args: {},
    handler: async (ctx) => {
        const config = await ctx.db.query("math_add_sub_mixed").collect();
        return config;
    },
});