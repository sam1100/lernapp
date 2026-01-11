import { createStyles } from "@/assets/styles/styles";
import useTheme from "@/hooks/useTheme";
import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import { Image, ImageBackground, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
const workspaceImage = require('@/assets/images/workspace.png');


export default function Index() {

    const { mathTheme, colors } = useTheme();
    const styles = createStyles();

    return (
        <SafeAreaView style={styles.containerLayout} edges={[]}>
            <LinearGradient colors={mathTheme.gradients.header}>
                <View style={styles.headerSubject}>
                    <Image style={styles.subjectImage} resizeMode="contain" source={require('@/assets/images/mathe-button.png')} />
                </View>
            </LinearGradient>

            <View style={styles.workspace}>
                <ImageBackground source={workspaceImage} resizeMode="cover" style={styles.workspace}>
                    <Link href="/math/multiplication" >
                        <Image source={require('@/assets/images/multiplication.png')} resizeMode="contain" style={styles.subjectButton} />
                    </Link>
                    <Link href="/math/division" >
                        <Image source={require('@/assets/images/division.png')} resizeMode="contain" style={styles.subjectButton} />
                    </Link>
                    <Link href="/math/multiplication" >
                        <Image source={require('@/assets/images/addition.png')} resizeMode="contain" style={styles.subjectButton} />
                    </Link>
                    <Link href="/math/multiplication" >
                        <Image source={require('@/assets/images/subtraction.png')} resizeMode="contain" style={styles.subjectButton} />
                    </Link>

                </ImageBackground>
            </View>
        </SafeAreaView>
    );
}
