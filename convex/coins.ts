import { v } from "convex/values";
import { Doc } from "./_generated/dataModel";
import { mutation, query } from "./_generated/server";
import { COIN_REASONS, getEnumValues } from "./enums";

type Coins = Doc<"coins">;

export const getAccountBalance = query({
    args: {},
    handler: async (ctx) => {
        const config = await ctx.db.query("coins").order("desc").first();
        return config;
    },
});

export const setRewardCoins = mutation({
    args: { amount: v.number(), date: v.string(), reason: v.union(...getEnumValues(COIN_REASONS).map(v.literal)) },
    handler: async (ctx, { amount, date, reason }) => {
        const currentBalance = await ctx.db.query("coins").order("desc").first();
        const newAmount = currentBalance ? currentBalance.total_amount + amount : 0;
        const setReason = reason as typeof COIN_REASONS[keyof typeof COIN_REASONS];
        await ctx.db.insert("coins", {
            amount: amount,
            total_amount: newAmount,
            date: date,
            reason: setReason,
        });
        return;
    }
});