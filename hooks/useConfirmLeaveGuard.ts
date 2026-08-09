import { LeaveConfirmationOptions, showLeaveConfirmation } from "@/utilities/showLeaveConfirmation";
import { EventArg, NavigationAction, NavigationProp, ParamListBase, useNavigation } from "@react-navigation/native";
import { useEffect, useRef } from "react";
import { BackHandler } from "react-native";

export default function useConfirmLeaveGuard(
    shouldConfirmLeave: boolean,
    dialogOptions?: LeaveConfirmationOptions
): void {
    const navigation = useNavigation<NavigationProp<ParamListBase>>();
    const allowLeaveRef = useRef(false);

    const title = dialogOptions?.title;
    const message = dialogOptions?.message;
    const cancelText = dialogOptions?.cancelText;
    const confirmText = dialogOptions?.confirmText;

    useEffect(() => {
        if (!shouldConfirmLeave) {
            allowLeaveRef.current = false;
        }

        const onHardwareBackPress = () => {
            if (!shouldConfirmLeave || allowLeaveRef.current) {
                return false;
            }

            showLeaveConfirmation(() => {
                allowLeaveRef.current = true;
                navigation.goBack();
            }, { title, message, cancelText, confirmText });
            return true;
        };

        const onBeforeRemove = (e: EventArg<"beforeRemove", true, { action: NavigationAction }>) => {
            if (!shouldConfirmLeave || allowLeaveRef.current) {
                return;
            }

            e.preventDefault();
            showLeaveConfirmation(() => {
                allowLeaveRef.current = true;
                navigation.dispatch(e.data.action);
            }, { title, message, cancelText, confirmText });
        };

        const hardwareBackSubscription = BackHandler.addEventListener("hardwareBackPress", onHardwareBackPress);
        const beforeRemoveSubscription = navigation.addListener("beforeRemove", onBeforeRemove);

        return () => {
            hardwareBackSubscription.remove();
            beforeRemoveSubscription();
        };
    }, [cancelText, confirmText, message, navigation, shouldConfirmLeave, title]);
}
