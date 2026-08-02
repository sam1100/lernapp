import { Doc } from "./_generated/dataModel";
import { query } from "./_generated/server";

type RewardsConfig = Doc<"rewards_config">;

export const getRewardsRedeems = query({
    args: {},
    handler: async (ctx) => {
        const config = await ctx.db.query("rewards_redeem").collect();
        return config;
    },
});