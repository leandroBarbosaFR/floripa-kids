import { useEffect, useRef } from 'react'
import { View, Animated, StyleSheet } from 'react-native'

function ShimmerBox({ style }: { style: object }) {
  const anim = useRef(new Animated.Value(0)).current

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(anim, { toValue: 1, duration: 900, useNativeDriver: false }),
        Animated.timing(anim, { toValue: 0, duration: 900, useNativeDriver: false }),
      ])
    ).start()
  }, [])

  const bg = anim.interpolate({ inputRange: [0, 1], outputRange: ['#f3f4f6', '#e5e7eb'] })

  return <Animated.View style={[style, { backgroundColor: bg }]} />
}

export default function SkeletonCard() {
  return (
    <View style={styles.card}>
      <ShimmerBox style={styles.image} />
      <View style={styles.body}>
        <ShimmerBox style={styles.titleLine} />
        <ShimmerBox style={styles.titleLineShort} />
        <ShimmerBox style={styles.metaLine} />
        <ShimmerBox style={styles.metaLineShort} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#f3f4f6',
  },
  image: { width: '100%', height: 180 },
  body: { padding: 14, gap: 10 },
  titleLine: { height: 16, borderRadius: 8, width: '80%' },
  titleLineShort: { height: 16, borderRadius: 8, width: '55%' },
  metaLine: { height: 12, borderRadius: 6, width: '50%', marginTop: 4 },
  metaLineShort: { height: 12, borderRadius: 6, width: '35%' },
})
