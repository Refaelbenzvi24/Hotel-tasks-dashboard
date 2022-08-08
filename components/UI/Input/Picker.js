import {Text, TouchableOpacity, View} from "react-native";
import {Entypo} from "@expo/vector-icons";
import style from "../Util/style";
import PickerDialog from "../../Dialogs/PickerDialog";
import {useState} from "react";


const pickerStyle = {
    width:           150,
    fontSize:        12,
    paddingTop:      8,
    paddingBottom:   8,
    textAlign:       'center',
    borderStyle:     'solid',
    borderWidth:     1,
    backgroundColor: 'white',
    borderColor:     '#F0E2E0',
    color:           '#5F5F5F',
    borderRadius:    12,
    ...style.shadow(4)
}

const Picker = ({options, onChange, value, style, placeholder}) => {
    const [isOpen, setIsOpen] = useState(false);


    return (
        <>
            <PickerDialog
                title="Department"
                value={value}
                onBlur={() => setIsOpen(false)}
                onCloseBtnPress={() => setIsOpen(false)}
                isOpen={isOpen}
                onChange={(value) => {
                    setIsOpen(false)
                    onChange(value)
                }}
                options={options}/>

            <TouchableOpacity
                onPress={() => setIsOpen(true)}
                className="flex-row-reverse"
                style={{
                    ...pickerStyle,
                    ...style
                }}>
                <View className="pr-2">
                    <Entypo name="chevron-down" size={14} color="#83868F"/>
                </View>

                {value
                    ?
                    <Text
                        className="pr-[10px] text-[12px] text-[#5F5F5F]">
                        {options.find(option => option.value === value).label}
                    </Text>
                    :
                    <Text
                        className="pr-[10px] text-[10px] text-[#9f9f9f]">
                        {placeholder}
                    </Text>
                }
            </TouchableOpacity>
        </>
    )
}

Picker.defaultProps = {
    placeholder: 'Select One'

}

export default Picker
