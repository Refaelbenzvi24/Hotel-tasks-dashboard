import Dialog from "../UI/view/Dialog";
import {Text, TouchableOpacity, View} from "react-native";
import {useState} from "react";
import {AntDesign} from "@expo/vector-icons";

const PickerDialog = ({onBlur, title, value, onCloseBtnPress, isOpen, onChange, options}) => {
    const [selectedIndex, setSelectedIndex] = useState(options.findIndex(option => option.value === value))

    const selectOption = (index) => {
        setSelectedIndex(index)
        onChange(options[index].value)
    }

    return (
        <Dialog
            onBlur={onBlur}
            minPadding={20}
            visible={isOpen}>

            <View className="flex-row justify-center">
                <View
                    className="flex-row items-center justify-end"
                    style={{
                        flex: 2
                    }}/>
                <View
                    className="flex-row items-start justify-center"
                    style={{
                        flex: 6
                    }}>

                    <View className="flex-row items-center mt-[18px]">
                        <Text className=" text-[23px] text-[#5F5F5F]">{title}</Text>
                    </View>
                </View>

                <View
                    className="flex-row items-center justify-end"
                    style={{
                        flex: 2
                    }}>
                    <TouchableOpacity
                        onPress={onCloseBtnPress}
                        className="rounded-full justify-center items-center border border-solid text-[18px]
                                    w-[38px] h-[38px] border-[#F0E2E0] border-[0.2px] mt-[10px] mr-[9px]">

                        <AntDesign name="close" size={21} color="black"/>
                    </TouchableOpacity>
                </View>
            </View>

            <View className="px-[40px] pt-[28px] pb-[44px]">
                {options.map((option, index) => (
                    <TouchableOpacity
                        className="flex-row flex-1 items-center"
                        onPress={() => selectOption(index)}
                        key={index}>
                        <View
                            className="justify-center items-center rounded-full w-[20px] h-[20px] border border-solid border-[#83868F] border-[1px]">

                            {
                                selectedIndex === index && (
                                    <View
                                        className="rounded-full w-[15px] h-[15px] bg-[#83868F]"/>
                                )
                            }

                        </View>

                        <Text className="ml-[13px] text-[21px] text-[#8D8D8D]">
                            {option.label}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>
        </Dialog>
    )
}

export default PickerDialog
