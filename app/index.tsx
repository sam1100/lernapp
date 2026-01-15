import { createStyles } from "@/assets/styles/styles";
import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import { Image, ImageBackground, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
const workspaceImage = require('@/assets/images/workspace.png');

export default function Index() {

  const styles = createStyles();

  return (
    <SafeAreaView style={styles.containerLayout} edges={[]}>
      <LinearGradient colors={['#82D3F5', 'white']}>
        <View style={styles.header}>
          <Image style={styles.titleImage} resizeMode="contain" source={require('@/assets/images/title.png')} />
        </View>
      </LinearGradient>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.workspace}>
          <ImageBackground source={workspaceImage} resizeMode="cover" style={styles.workspace}>
            <Link href="/math" >
              <Image source={require('@/assets/images/mathe-button.png')} resizeMode="contain" style={styles.subjectButton} />
            </Link>
            <Link href="/time" >
              <Image source={require('@/assets/images/uhrzeit-button.png')} resizeMode="contain" style={styles.subjectButton} />
            </Link>
            <Link href="/german" >
              <Image source={require('@/assets/images/german-button.png')} resizeMode="contain" style={styles.subjectButton} />
            </Link>
            <Link href="/english" >
              <Image source={require('@/assets/images/english-button.png')} resizeMode="contain" style={styles.subjectButton} />
            </Link>

          </ImageBackground>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}
