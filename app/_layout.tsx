import '@/globals';
import { ThemeProvider } from "@/hooks/useTheme";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import { Stack } from "expo-router";

const convex = new ConvexReactClient(process.env.EXPO_PUBLIC_CONVEX_URL!, { unsavedChangesWarning: false });

export default function RootLayout() {
  return (
    <ConvexProvider client={convex}>
      <ThemeProvider>
        <Stack>
          <Stack.Screen name="index" options={{ title: "LernApp" }} />
          <Stack.Screen name="english" options={{ title: "Englisch" }} />
          <Stack.Screen name="german" options={{ title: "Deutsch" }} />
          <Stack.Screen name="german/currentwords" options={{ title: "Neue Lernwörter" }} />
          <Stack.Screen name="german/allwords" options={{ title: "Alle Lernwörter" }} />
          <Stack.Screen name="math" options={{ title: "Mathe" }} />
          <Stack.Screen name="math/multiplication" options={{ title: "1x1" }} />
          <Stack.Screen name="math/division" options={{ title: "Division" }} />
          <Stack.Screen name="time" options={{ title: "Uhrzeit" }} />
        </Stack>
      </ThemeProvider>
    </ConvexProvider>
  )
}
