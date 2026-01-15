import React, { createContext, ReactNode, useContext } from 'react';

// AsyncStorage is React Native’s simple, promise-based API for persisting
// small bits of data on a user’s device. Think of it as the mobile-app equivalent
// of the browser’s localStorage, but asynchronous and cross-platform.

export interface ColorScheme {
    loading: string;
    gradients: {
        correctAnswer: [string, string];
        wrongAnswer: [string, string];
        background: [string, string];
    };
    statusBarStyle: "light-content" | "dark-content";
}

export interface SubjetTheme {
    gradients: {
        header: [string, string];
        workspace: [string, string];
    }
}

const mathTheme: SubjetTheme = {
    gradients: {
        header: ['#C3E148', '#56B030'],
        workspace: ['#FCEBC8', '#BE7A4F'],
    }
};
const germanTheme: SubjetTheme = {
    gradients: {
        header: ['#FEC4B4', '#D11E1E'],
        workspace: ['#FCEBC8', '#BE7A4F']
    }
};
const englishTheme: SubjetTheme = {
    gradients: {
        header: ['#C3E148', '#56B030'],
        workspace: ['#FCEBC8', '#BE7A4F']
    }
};
const timeTheme: SubjetTheme = {
    gradients: {
        header: ['#C3E148', '#56B030'],
        workspace: ['#FCEBC8', '#BE7A4F']
    }
};

const lightColors: ColorScheme = {
    loading: "#3b82f6",
    gradients: {
        correctAnswer: ['#769c29', '#387a20'],
        wrongAnswer: ['#ef4444', '#b91c1c'],
        background: ["#f8fafc", "#e2e8f0"],
    },
    statusBarStyle: "dark-content" as const,
};

interface ThemeContextType {
    mathTheme: SubjetTheme;
    germanTheme: SubjetTheme;
    englishTheme: SubjetTheme;
    timeTheme: SubjetTheme;
    colors: ColorScheme;
}

const ThemeContext = createContext<undefined | ThemeContextType>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const colors = lightColors;

    return (
        <ThemeContext.Provider value={{ mathTheme, germanTheme, englishTheme, timeTheme, colors }}>
            {children}
        </ThemeContext.Provider>
    );
};

const useTheme = () => {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }

    return context;
};

export default useTheme;