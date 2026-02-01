import { createStyles } from '@/assets/styles/styles'
import { SubjetTheme } from '@/hooks/useTheme'
import { LinearGradient } from 'expo-linear-gradient'
import React from 'react'
import { Image, ImageSourcePropType, View } from 'react-native'
import ProgressBar, { ProgressPart } from './ProgressBar'

const HeaderSubject = ({ theme, styles, image, progressParts, doneCount, totalCount }: { theme: SubjetTheme, styles: ReturnType<typeof createStyles>, image: ImageSourcePropType, progressParts: ProgressPart[] | null; doneCount: number; totalCount: number },) => {
    return (
        <LinearGradient colors={theme.gradients.header}>
            <View style={styles.headerSubject}>
                <Image style={styles.subjectImage} resizeMode='contain' source={image} />
                <ProgressBar progressParts={progressParts} doneCount={doneCount} totalCount={totalCount} />
            </View>
            <LinearGradient
                colors={theme.gradients.borderGradient}
                style={styles.headerSubjectGradientBorder}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
            ></LinearGradient>
        </LinearGradient>
    )
}

export default HeaderSubject