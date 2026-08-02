import { createStyles } from "@/assets/styles/styles";
import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { Image, Text, View } from "react-native";
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";

const coinFront = require('@/assets/images/coin_front.png');
const coinBack = require('@/assets/images/coin_back.png');

type Coins = Doc<"coins">;

export default function Index({ icon, iconClickable }: { icon: any, iconClickable?: boolean }) {
  const styles = createStyles();

  const coin = useQuery(api.coins.getAccountBalance);
  const [amount, setAmount] = useState<Coins | null>(null);

  const rotationDuration = 1000; // Dauer der Rotation in Millisekunden
  const rotate = useSharedValue(0);
  const frontAnimatedStyle = useAnimatedStyle(() => {
    const rotateValue = interpolate(rotate.value, [0, 1], [0, 180]);
    return {
      transform: [
        {
          rotateY: withTiming(`${rotateValue}deg`, { duration: rotationDuration }),
        },
      ],
    };
  });
  const backAnimatedStyle = useAnimatedStyle(() => {
    const rotateValue = interpolate(rotate.value, [0, 1], [180, 360]);
    return {
      transform: [
        {
          rotateY: withTiming(`${rotateValue}deg`, { duration: rotationDuration }),
        },
      ],
    };
  });
  const handleFlip = () => {
    rotate.value = rotate.value ? 0 : 1;
  };

  useEffect(() => {
    setAmount(coin ?? null);
    const interval = setInterval(handleFlip, rotationDuration);
    return () => clearInterval(interval);
  }, [coin]);

  const coinSize = 80;

  const renderCoin = () => {
    return (
      <View style={styles.coinContainer}>
        <View id="coinWrapper" style={styles.coinWrapper}>
          <Animated.View
            style={[styles.coinBody, styles.coin, frontAnimatedStyle]}>
            <Image source={coinFront} style={{ width: coinSize, height: coinSize }} />
          </Animated.View>
          <Animated.View
            style={[styles.coinBody, styles.coin, backAnimatedStyle]}>
            <Image source={coinBack} style={{ width: coinSize, height: coinSize }} />
          </Animated.View>
        </View>
        <Text id="coinText" style={styles.coinText}>{amount ? amount.total_amount.toLocaleString('de-CH') : ''}</Text>
      </View>
    );
  };

  return (
    <LinearGradient id="header" colors={['#82D3F5', 'white']} style={styles.header}>
      <View>
        <Image style={styles.titleImage} resizeMode="contain" source={icon} />
      </View>
      {iconClickable ? (
        <View id="coinWrapper" style={styles.coinContainer}>
          <Link href="/rewards/redeem">
            {renderCoin()}
          </Link>
        </View>
      ) : (
        renderCoin()
      )}
    </LinearGradient>
  );
}
