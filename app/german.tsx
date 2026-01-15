import { createStyles } from "@/assets/styles/styles";
import useTheme from "@/hooks/useTheme";
import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import { Image, ImageBackground, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
const workspaceImage = require('@/assets/images/workspace.png');


export default function GermanSubject() {

    const { germanTheme } = useTheme();
    const styles = createStyles();

    return (
        <SafeAreaView style={styles.containerLayout} edges={[]}>
            <LinearGradient colors={germanTheme.gradients.header}>
                <View style={styles.headerSubject}>
                    <Image style={styles.subjectImage} resizeMode="contain" source={require('@/assets/images/german-button.png')} />
                </View>
            </LinearGradient>

            <View style={styles.workspace}>
                <ImageBackground source={workspaceImage} resizeMode="cover" style={styles.workspace}>
                    <Link href="/german/currentwords" >
                        <Image source={require('@/assets/images/newwords.png')} resizeMode="contain" style={styles.subjectButton} />
                    </Link>
                    <Link href="/german/allwords" >
                        <Image source={require('@/assets/images/allwords.png')} resizeMode="contain" style={styles.subjectButton} />
                    </Link>

                </ImageBackground>
            </View>
        </SafeAreaView>
    );
}
