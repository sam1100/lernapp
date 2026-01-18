import { v } from "convex/values";
import { Doc } from "./_generated/dataModel";
import { query } from "./_generated/server";
import { COIN_REASONS, getEnumValues } from "./enums";

type RewardsConfig = Doc<"rewards_config">;

export const getRewardsForSubject = query({
    args: { reason: v.union(...getEnumValues(COIN_REASONS).map(v.literal)), percentage: v.number() },
    handler: async (ctx, { reason, percentage }) => {
        const config = await ctx.db.query("rewards_config").filter(c => c.eq(c.field("reason"), reason)).order("desc").first();

        if (percentage >= 100) {
            return config?.reward100 || 0;
        } else if (percentage >= 90) {
            return config?.reward90 || 0;
        } else if (percentage >= 80) {
            return config?.reward80 || 0;
        }

        return 0;
    },
});