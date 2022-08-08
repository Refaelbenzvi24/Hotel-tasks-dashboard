import {Text, View} from "react-native";

const shortenedName = (name) => {
    const firstName = name.split(' ')[0][0].toUpperCase()
    const lastName  = name.split(' ')[1][0].toUpperCase()

    return `${firstName[0]}${lastName[0]}`
}

const Avatar = ({name, size, bgColor, color, padding}) => {

    return (
        <View
            style={{
                backgroundColor: bgColor,
            }}
            className="rounded-full aspect-square justify-center items-center">
            <Text
                style={{
                    padding,
                    color,
                    fontSize: size,
                }}
                className="text-white">
                {shortenedName(name)}
            </Text>
        </View>
    )
}

Avatar.defaultProps = {
    padding: 4,
    color:   '#ffffff',
    bgColor: '#184E77',
    width:   "20px",
    height:  "20px"
}

export default Avatar
