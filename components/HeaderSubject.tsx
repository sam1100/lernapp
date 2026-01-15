import { createStyles } from '@/assets/styles/styles'
import { SubjetTheme } from '@/hooks/useTheme'
import { LinearGradient } from 'expo-linear-gradient'
import React from 'react'
import { Image, ImageSourcePropType, View } from 'react-native'

const HeaderSubject = ({ theme, styles, image }: { theme: SubjetTheme, styles: ReturnType<typeof createStyles>, image: ImageSourcePropType }) => {
    return (
        <LinearGradient colors={theme.gradients.header}>
            <View style={styles.headerSubject}>
                <Image style={styles.subjectImage} resizeMode='contain' source={image} />
            </View>
        </LinearGradient>
    )
}

export default HeaderSubject