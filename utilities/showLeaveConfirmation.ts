import { Alert } from "react-native";

export interface LeaveConfirmationOptions {
    title?: string;
    message?: string;
    cancelText?: string;
    confirmText?: string;
}

export function showLeaveConfirmation(onConfirm: () => void, options?: LeaveConfirmationOptions): void {
    Alert.alert(
        options?.title ?? "Aufgabe verlassen?",
        options?.message ?? "Willst Du die Aufgabe wirklich verlassen?",
        [
            {
                text: options?.cancelText ?? "Nein",
                style: "cancel",
            },
            {
                text: options?.confirmText ?? "Ja",
                style: "destructive",
                onPress: onConfirm,
            },
        ]
    );
}
