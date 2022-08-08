import {Text, TouchableOpacity} from "react-native";

const borderRadius = (groupLength, buttonIndex) => {
    if (groupLength === 1) {
        return 'rounded-xl'
    }

    if (groupLength > 1) {
        if (buttonIndex === 0) {
            return 'rounded-l-xl'
        }

        if (buttonIndex === groupLength - 1) {
            return 'rounded-r-xl'
        }
    }

    return ''
}


/**
 *
 * @param children
 * @param size
 * @param width
 * @param height
 * @param onSelect
 * @param groupLength
 * @param buttonIndex
 * @param color
 * @returns {JSX.Element}
 * @constructor
 */
const GroupButton = ({children, size, width, height, onSelect, groupLength, buttonIndex, color}) => {


    return (
        <TouchableOpacity
            onPress={() => !!onSelect && onSelect(children)}
            className={`flex-row justify-center items-center border border-solid border-[1px] ${borderRadius(groupLength, buttonIndex)}`}
            style={{
                width:       width,
                height:      height,
                borderColor: color || '#F0E2E0'
            }}>

            <Text style={{
                color:    color || '#5F5F5F',
                fontSize: size
            }}>
                {children}
            </Text>

        </TouchableOpacity>
    )
}

GroupButton.defaultProps = {
    size:   12,
    width:  80,
    height: 25,
}


export default GroupButton
