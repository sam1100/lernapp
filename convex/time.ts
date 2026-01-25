import { v } from "convex/values";
import { Doc } from "./_generated/dataModel";
import { query } from "./_generated/server";
import { COIN_REASONS, getEnumValues } from "./enums";

type TimeConfig = Doc<"time">;

export const getTimeRepetitions = query({
    args: { reason: v.union(...getEnumValues(COIN_REASONS).map(v.literal)) },
    handler: async (ctx, { reason }) => {
        const config: TimeConfig | null = await ctx.db.query("time").first();
        switch (reason) {
            case COIN_REASONS.TIME_ANALOG_DIGITAL:
                return config ? config.analog_digital_repetitions : 0;
            case COIN_REASONS.TIME_DIGITAL_ANALOG:
                return config ? config.digital_analog_repetitions : 0;
            case COIN_REASONS.TIME_VERBALLY:
                return config ? config.verbally_repetitions : 0;
            default:
                return 0;
        }

    },
});
