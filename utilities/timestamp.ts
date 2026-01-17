/**
 * Generates a current ISO 8601 timestamp string
 * Format: YYYY-MM-DDTHH:mm:ss.sssZ
 * @returns ISO 8601 formatted timestamp string
 */
export function getCurrentTimestamp(): string {
    return new Date().toISOString();
}

/**
 * Generates a timestamp string for a specific date in ISO 8601 format
 * @param date - Date object to convert
 * @returns ISO 8601 formatted timestamp string
 */
export function getTimestamp(date: Date): string {
    return date.toISOString();
}

/**
 * Converts an ISO 8601 timestamp string to a Date object
 * @param timestampString - ISO 8601 formatted timestamp string
 * @returns Date object
 */
export function parseTimestamp(timestampString: string): Date {
    return new Date(timestampString);
}
