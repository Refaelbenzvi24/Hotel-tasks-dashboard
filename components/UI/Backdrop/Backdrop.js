import {TouchableOpacity, View} from "react-native";

const Backdrop = ({opacity, onPress}) => {
    return (
        <View
            style={{
                opacity: opacity
            }}
            className={`bg-neutral-900 flex-1 absolute h-full w-full`}>
            <TouchableOpacity
                className="h-full w-full flex-1"
                onPress={() => {
                    onPress && onPress()
                }}>

            </TouchableOpacity>
        </View>
    )
}

Backdrop.defaultProps = {
    opacity: 0.6
}

export default Backdrop
