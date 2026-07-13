/**
 * Centralized Enum definitions for use across Convex and the application
 */

// Math mixed type
export const MATH_OPERATION_TYPES = {
    ADDITION: "addition",
    SUBTRACTION: "subtraction",
    MULTIPLICATION: "multiplication",
    DIVISION: "division",
    DIVISION_REMAINDER: "division_remainder",
} as const;

export type MathOperationType = typeof MATH_OPERATION_TYPES[keyof typeof MATH_OPERATION_TYPES];

// German word types
export const GERMAN_WORD_TYPES = {
    NOUN: "noun",
    VERB: "verb",
    ADJECTIVE: "adjective",
} as const;

export type GermanWordType = typeof GERMAN_WORD_TYPES[keyof typeof GERMAN_WORD_TYPES];

// Coin transaction reasons
export const COIN_REASONS = {
    MATH_MULTIPLICATION: "MATH_MULTIPLICATION",
    MATH_DIVISION: "MATH_DIVISION",
    MATH_ADDITION: "MATH_ADDITION",
    MATH_SUBTRACTION: "MATH_SUBTRACTION",
    MATH_ADD_SUB_MIXED: "MATH_ADD_SUB_MIXED",
    MATH_DIVISION_REMAINDER: "MATH_DIVISION_REMAINDER",
    GERMAN_CURRENT_WORDS: "GERMAN_CURRENT_WORDS",
    GERMAN_ALL_WORDS: "GERMAN_ALL_WORDS",
    TIME_ANALOG_DIGITAL: "TIME_ANALOG_DIGITAL",
    TIME_DIGITAL_ANALOG: "TIME_DIGITAL_ANALOG",
    TIME_VERBALLY: "TIME_VERBALLY",
    SPENT_FILM: "SPENT_FILM",
} as const;

export type CoinReason = typeof COIN_REASONS[keyof typeof COIN_REASONS];

// Helper function to get enum values as literal union for Convex
export const getEnumValues = <T extends Record<string, string>>(enumObj: T) => {
    return Object.values(enumObj);
};
