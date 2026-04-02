import { useRef, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Animated, Dimensions } from 'react-native'
import Svg, { Path, Circle, Ellipse } from 'react-native-svg'

const { width, height } = Dimensions.get('window')

function TopoBackground() {
  return (
    <Svg width={width} height={height * 0.62} viewBox={`0 0 ${width} ${height * 0.62}`} style={StyleSheet.absoluteFill}>
      {/* Base fill */}
      <Path d={`M0 0 H${width} V${height * 0.62} H0 Z`} fill="#f97316" />

      {/* Topographic contour lines */}
      <Path d={`M${width*0.1} ${height*0.08} Q${width*0.35} ${height*0.02} ${width*0.6} ${height*0.1} Q${width*0.85} ${height*0.18} ${width*0.9} ${height*0.12}`}
        fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
      <Path d={`M${width*0.05} ${height*0.15} Q${width*0.3} ${height*0.08} ${width*0.55} ${height*0.17} Q${width*0.8} ${height*0.26} ${width*0.95} ${height*0.2}`}
        fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
      <Path d={`M0 ${height*0.22} Q${width*0.25} ${height*0.14} ${width*0.5} ${height*0.24} Q${width*0.75} ${height*0.34} ${width} ${height*0.28}`}
        fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
      <Path d={`M0 ${height*0.30} Q${width*0.2} ${height*0.21} ${width*0.45} ${height*0.31} Q${width*0.7} ${height*0.41} ${width} ${height*0.36}`}
        fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
      <Path d={`M0 ${height*0.38} Q${width*0.15} ${height*0.28} ${width*0.4} ${height*0.38} Q${width*0.65} ${height*0.48} ${width} ${height*0.44}`}
        fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />

      {/* Closed contour island shapes */}
      <Ellipse cx={width*0.25} cy={height*0.18} rx={width*0.1} ry={height*0.05} fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="1.5" />
      <Ellipse cx={width*0.25} cy={height*0.18} rx={width*0.055} ry={height*0.027} fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="1.5" />

      <Ellipse cx={width*0.72} cy={height*0.32} rx={width*0.13} ry={height*0.06} fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="1.5" />
      <Ellipse cx={width*0.72} cy={height*0.32} rx={width*0.07} ry={height*0.032} fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="1.5" />
      <Circle cx={width*0.72} cy={height*0.32} r={width*0.02} fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="1.5" />

      <Ellipse cx={width*0.45} cy={height*0.08} rx={width*0.08} ry={height*0.03} fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />

      {/* Wave at bottom of orange area */}
      <Path
        d={`M0 ${height*0.52} Q${width*0.15} ${height*0.48} ${width*0.3} ${height*0.52} Q${width*0.45} ${height*0.56} ${width*0.6} ${height*0.50} Q${width*0.75} ${height*0.44} ${width*0.9} ${height*0.50} Q${width*0.95} ${height*0.52} ${width} ${height*0.50} L${width} ${height*0.62} L0 ${height*0.62} Z`}
        fill="white"
      />
    </Svg>
  )
}

type Props = { onContinue: () => void }

export default function WelcomeScreen({ onContinue }: Props) {
  const opacity = useRef(new Animated.Value(0)).current
  const slideUp = useRef(new Animated.Value(30)).current

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, { toValue: 1, duration: 600, useNativeDriver: true }),
      Animated.timing(slideUp, { toValue: 0, duration: 600, useNativeDriver: true }),
    ]).start()
  }, [])

  const handleContinue = () => {
    Animated.timing(opacity, { toValue: 0, duration: 300, useNativeDriver: true }).start(onContinue)
  }

  return (
    <Animated.View style={[styles.container, { opacity }]}>
      <View style={styles.bg}>
        <TopoBackground />
      </View>

      <Animated.View style={[styles.content, { transform: [{ translateY: slideUp }] }]}>
        <Text style={styles.title}>Floripa</Text>
        <Text style={styles.subtitle}>with Kids</Text>
        <Text style={styles.desc}>
          Descubra as melhores atividades{'\n'}para fazer com seus filhos em Florianópolis.
        </Text>

        <TouchableOpacity style={styles.btn} onPress={handleContinue} activeOpacity={0.85}>
          <Text style={styles.btnText}>Explorar →</Text>
        </TouchableOpacity>
      </Animated.View>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: { ...StyleSheet.absoluteFillObject, backgroundColor: 'white', zIndex: 100 },
  bg: { flex: 1 },
  content: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 32,
    paddingBottom: 60,
    paddingTop: 24,
    gap: 8,
  },
  title: { fontSize: 42, fontWeight: '900', color: '#111827', lineHeight: 50 },
  subtitle: { fontSize: 32, color: '#f97316', fontFamily: 'Pacifico_400Regular', lineHeight: 45 },
  desc: { fontSize: 15, color: '#6b7280', lineHeight: 22, marginTop: 4, marginBottom: 24 },
  btn: {
    alignSelf: 'flex-end',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f97316',
    paddingHorizontal: 28,
    paddingVertical: 14,
    borderRadius: 50,
  },
  btnText: { color: '#fff', fontWeight: '700', fontSize: 16 },
})
