import { Platform } from 'react-native';

// Polyfill für React Native - Browser APIs
// Nicht in echten Browsern ausführen

console.log("Checking for browser environment...", Platform.OS);

if (Platform.OS !== 'web') {
    if (window.addEventListener === undefined) {
        const listeners: { [key: string]: Set<Function> } = {};
        console.log("Polyfilling window object");
        (global as any).window = {
            addEventListener: (event: string, callback: Function) => {
                if (!listeners[event]) {
                    listeners[event] = new Set();
                }
                listeners[event].add(callback);
            },
            removeEventListener: (event: string, callback: Function) => {
                if (listeners[event]) {
                    listeners[event].delete(callback);
                }
            },
            dispatchEvent: (event: any) => {
                const eventType = event.type || event;
                if (listeners[eventType]) {
                    listeners[eventType].forEach((callback: Function) => {
                        try {
                            callback(event);
                        } catch (e) {
                            console.error('Event listener error:', e);
                        }
                    });
                }
            },
        };
    }

    // Polyfill für document
    if (typeof document === 'undefined') {
        (global as any).document = {
            addEventListener: (global.window as any).addEventListener,
            removeEventListener: (global.window as any).removeEventListener,
            dispatchEvent: (global.window as any).dispatchEvent,
        };
    }

}