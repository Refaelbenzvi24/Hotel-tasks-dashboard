import {View} from "react-native";

const Divider = ({className, ...restProps}) => {

    return (
        <View {...restProps} className={`h-0 border border-solid border-[0.4px] border-gray-300 ${className}`}/>
    )
}

export default Divider
