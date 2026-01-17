import { Doc } from "./_generated/dataModel";
import { query } from "./_generated/server";

type Coins = Doc<"coins">;

export const getAccountBalance = query({
    args: {},
    handler: async (ctx) => {
        const config = await ctx.db.query("coins").order("desc").first();
        return config;
    },
});