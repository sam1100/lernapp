import { createStyles } from "@/assets/styles/styles";
import useTheme from "@/hooks/useTheme";
import { LinearGradient } from "expo-linear-gradient";
import { ActivityIndicator, Text, View } from "react-native";

const LoadingSpinner = () => {
    const { colors } = useTheme();

    const homeStyles = createStyles();

    return (
        <LinearGradient colors={colors.gradients.background} style={homeStyles.containerLayout}>
            <View style={homeStyles.loadingContainer}>
                <ActivityIndicator size="large" color={colors.loading} />
                <Text style={homeStyles.loadingText}>Laden...</Text>
            </View>
        </LinearGradient>
    );
};

export default LoadingSpinner;