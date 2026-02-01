import { createStyles } from "@/assets/styles/styles";
import useTheme from "@/hooks/useTheme";
import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import { Image, ImageBackground, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
const workspaceImage = require('@/assets/images/workspace.png');


export default function TimeSubject() {

    const { timeTheme } = useTheme();
    const styles = createStyles();

    return (
        <SafeAreaView style={styles.containerLayout} edges={[]}>
            <LinearGradient colors={timeTheme.gradients.header}>
                <View style={styles.headerSubject}>
                    <Image style={styles.subjectImage} resizeMode="contain" source={require('@/assets/images/time-button.png')} />
                </View>
            </LinearGradient>

            <ScrollView contentContainerStyle={styles.subjectSelectionContainer}>
                <ImageBackground source={workspaceImage} resizeMode="cover" style={{ flex: 1 }}>
                    <View style={[styles.workspace, styles.workspaceCentered]}>
                        <Link href="/time/analogtodigital" >
                            <Image source={require('@/assets/images/time-analog-digital-button.png')} resizeMode="contain" style={styles.subjectButton} />
                        </Link>
                        <Link href="/time/digitaltoanalog" >
                            <Image source={require('@/assets/images/time-digital-analog-button.png')} resizeMode="contain" style={styles.subjectButton} />
                        </Link>
                        <Link href="/time/analogtodigital" >
                            <Image source={require('@/assets/images/time-verbally-button.png')} resizeMode="contain" style={styles.subjectButton} />
                        </Link>

                    </View>
                </ImageBackground>
            </ScrollView>
        </SafeAreaView>
    );
}
