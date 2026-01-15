import { query } from "./_generated/server";

export const getCurrentWords = query({
    args: {},
    handler: async (ctx) => {
        const config = await ctx.db.query("german_words").filter((q) => q.and(q.gt(q.field("repetitions"), 0), q.eq(q.field("current"), true))).collect();
        return config;
    },
});

export const getAllWords = query({
    args: {},
    handler: async (ctx) => {
        const config = await ctx.db.query("german_words").filter((q) => q.gt(q.field("repetitions"), 0)).collect();
        return config;
    },
});
