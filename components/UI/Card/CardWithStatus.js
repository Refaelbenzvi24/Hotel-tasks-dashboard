import {View} from "react-native";

const CardWithStatus = ({children, style, statusColor, bgColor}) => {
    return (
        <View
            className="relative m-3 rounded-xl shadow-lg"
        style={style}>
            <View
                className={`top-[4px] absolute w-full h-full rounded-xl shadow-lg`}
                style={{
                    backgroundColor: statusColor
                }}>
            </View>
            <View
                className={`absolute bg-white w-full h-full rounded-xl`}
                style={{
                    backgroundColor: bgColor
                }}>
            </View>

            {children}
        </View>
    )
}

CardWithStatus.defaultProps = {
    statusColor: "#00a6a7",
    bgColor:     "white"
}

export default CardWithStatus
