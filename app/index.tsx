import { createStyles } from "@/assets/styles/styles";
import IconCoinHeader from "@/components/IconCoinHeader";
import { Link } from "expo-router";
import { Image, ImageBackground, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
const workspaceImage = require('@/assets/images/workspace.png');

const owlIcon = require('@/assets/images/title.png');

export default function Index() {
  const styles = createStyles();

  return (
    <SafeAreaView style={styles.containerLayout} edges={[]}>
      <IconCoinHeader icon={owlIcon} iconClickable={true} />
      <ScrollView contentContainerStyle={styles.subjectSelectionContainer}>
        <ImageBackground source={workspaceImage} resizeMode="cover" style={{ flex: 1 }}>
          <View style={styles.workspace}>
            <Link href="/math" >
              <Image source={require('@/assets/images/mathe-button.png')} resizeMode="contain" style={styles.subjectButton} />
            </Link>
            <Link href="/time" >
              <Image source={require('@/assets/images/time-button.png')} resizeMode="contain" style={styles.subjectButton} />
            </Link>
            <Link href="/german" >
              <Image source={require('@/assets/images/german-button.png')} resizeMode="contain" style={styles.subjectButton} />
            </Link>
            <Link href="/english" >
              <Image source={require('@/assets/images/english-button.png')} resizeMode="contain" style={styles.subjectButton} />
            </Link>
          </View>
        </ImageBackground>
      </ScrollView>
    </SafeAreaView>
  );
}
