import Svg, { Circle, G, Line, Text } from 'react-native-svg';

const Watch = () => {
    return (
        <Svg width="60%" height="60%" viewBox="0 0 200 200" preserveAspectRatio="xMidYMid meet">
            {/* Zifferblatt Hintergrund */}
            <Circle cx="100" cy="100" r="95" fill="#f8f9fa" stroke="#333" strokeWidth="2" />

            {/* 5-Minuten-Raster (Strichmarkierungen) */}
            <G id="ticks" stroke="#333" strokeWidth="2">
                <Line x1="100" y1="10" x2="100" y2="20" transform="rotate(0 100 100)" />
                <Line x1="100" y1="10" x2="100" y2="20" transform="rotate(30 100 100)" />
                <Line x1="100" y1="10" x2="100" y2="20" transform="rotate(60 100 100)" />
                <Line x1="100" y1="10" x2="100" y2="20" transform="rotate(90 100 100)" />
                <Line x1="100" y1="10" x2="100" y2="20" transform="rotate(120 100 100)" />
                <Line x1="100" y1="10" x2="100" y2="20" transform="rotate(150 100 100)" />
                <Line x1="100" y1="10" x2="100" y2="20" transform="rotate(180 100 100)" />
                <Line x1="100" y1="10" x2="100" y2="20" transform="rotate(210 100 100)" />
                <Line x1="100" y1="10" x2="100" y2="20" transform="rotate(240 100 100)" />
                <Line x1="100" y1="10" x2="100" y2="20" transform="rotate(270 100 100)" />
                <Line x1="100" y1="10" x2="100" y2="20" transform="rotate(300 100 100)" />
                <Line x1="100" y1="10" x2="100" y2="20" transform="rotate(330 100 100)" />
            </G>

            {/* Zahlen */}
            <G fontFamily="Arial, sans-serif" fontSize="16" textAnchor="middle" fill="#333" fontWeight="bold">
                <Text x="100" y="35">12</Text>
                <Text x="165" y="105">3</Text>
                <Text x="100" y="175">6</Text>
                <Text x="35" y="105">9</Text>
            </G>
            {/* Zeiger */}
            {/* Stundenzeiger */}
            <Line id="hour" x1="100" y1="100" x2="100" y2="50" stroke="#e74c3c" strokeWidth="5" strokeLinecap="round" transform="rotate(305 100 100)" />
            {/* Minutenzeiger */}
            <Line id="minute" x1="100" y1="100" x2="100" y2="30" stroke="#666" strokeWidth="5" strokeLinecap="round" transform="rotate(60 100 100)" />

            {/* Mittelpunkt-Abdeckung */}
            <Circle cx="100" cy="100" r="3" fill="#333" />
        </Svg>
    )
}

export default Watch