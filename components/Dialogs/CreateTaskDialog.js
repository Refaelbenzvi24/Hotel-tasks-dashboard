import {Text, TextInput, TouchableOpacity, View} from "react-native";
import {AntDesign, MaterialIcons} from "@expo/vector-icons";
import GroupButton from "../UI/Button/GroupButton";
import {priorityColor} from "../UI/Util";
import MediaPicker from "../UI/Input/MediaPicker";
import style from "../UI/Util/style";
import {useEffect, useState} from "react"
import Dialog from "../UI/view/Dialog";
import {departmentEndpoint, taskEndpoint} from "../../services";
import Task from "../../modules/Task";
import Picker from "../UI/Input/Picker";


const CreateTaskDialog = ({isOpen, onCloseBtnPress, onBlur, onSubmit}) => {
    const [departmentsOptions, setDepartmentsOptions] = useState([])

    const [title, setTitle]           = useState('')
    const [priority, setPriority]     = useState('')
    const [location, setLocation]     = useState('')
    const [department, setDepartment] = useState('')
    const [details, setDetails]       = useState('')
    const [images, setImages]         = useState([])

    const priorities = ['Low', 'Medium', 'High']

    const createTask = async () => {
        const task = await taskEndpoint.create(new Task({
            title,
            priority,
            location,
            status: 'Pending',
            details,
            images
        }))

        onSubmit(task)
    }

    const getDepartments = async () => {
        const departments = await departmentEndpoint.list()
        setDepartmentsOptions(departments)
    }

    useEffect(() => {
        (async () => getDepartments())()
    }, [])

    return (
        <Dialog
            onBlur={onBlur}
            minPadding={20}
            visible={isOpen}>

            <View className="flex-row-reverse">
                <TouchableOpacity
                    onPress={onCloseBtnPress}
                    className="rounded-full justify-center items-center border border-solid w-[38px] h-[38px] border-[#F0E2E0] border-[0.2px] mt-3 mr-3">

                    <AntDesign name="close" size={16} color="black"/>

                </TouchableOpacity>
            </View>

            <View className="px-5">
                <View
                    className="pt-4 flex-1 justify-center">
                    <TextInput
                        className="text-neutral-400 h-16  text-5xl flex-1"
                        value={title}
                        selectionColor={"#00a6a7"}
                        underlineColorAndroid={'transparent'}
                        placeholderTextColor={"#dcdcdc"}
                        placeholder="Enter new task"
                        keyboardType="default"
                        onChangeText={(value) => setTitle(value)}/>
                </View>

                <Text>PRIORITY:</Text>

                <View className="flex-row justify-center items-center py-4">
                    <View className="flex-row">
                        {
                            priorities.map((option, index) =>
                                <GroupButton
                                    color={option === priority && priorityColor(option)}
                                    onSelect={(value) => setPriority(value)}
                                    buttonIndex={index}
                                    groupLength={3}
                                    key={index}>
                                    {option}
                                </GroupButton>
                            )
                        }
                    </View>
                </View>

                <Text>WHERE?</Text>

                <View className="flex-row items-center py-2 px-7">
                    <MaterialIcons
                        name="place"
                        size={25}
                        color={"#dcdcdc"}/>

                    <TextInput
                        className="text-neutral-400 h-8 text-2xl"
                        value={location}
                        selectionColor={"#00a6a7"}
                        underlineColorAndroid={'transparent'}
                        placeholderTextColor={"#dcdcdc"}
                        placeholder="Enter Location"
                        keyboardType="default"
                        onChangeText={(value) => setLocation(value)}/>
                </View>

                <Text>WHO?</Text>

                <View className="pl-8 py-4">
                    {
                        departmentsOptions && <Picker
                        onChange={(value) => setDepartment(value)}
                        value={department}
                        placeholder={'Select Department'}
                        options={departmentsOptions}/>
                    }
                </View>


                <Text>DETAILS</Text>

                <View className="py-2 px-6">
                    <TextInput
                        className={`text-start text-neutral-400 h-8 border border-solid
                                        border-[1px] pt-2 pl-3 h-28 border-[#F0E2E0] rounded-2xl ${!details && 'font-bold'}`}
                        multiline
                        value={details}
                        selectionColor={"#00a6a7"}
                        underlineColorAndroid={'transparent'}
                        placeholderTextColor={"#dcdcdc"}
                        placeholder="Enter Task Details"
                        enablesReturnKeyAutomatically={true}
                        keyboardType="default"
                        onChangeText={(value) => setDetails(value)}/>
                </View>

                <Text>ATTACHMENT</Text>

                <View className="py-2 px-7">
                    <MediaPicker
                        type="Images"
                        onValueChange={(value) => setImages([...images, value])}
                        imageHeight={60}
                        imageWidth={60}
                        showMax={3}/>
                </View>

                <TouchableOpacity
                    onPress={createTask}
                    style={{...style.shadow(16, {height: 6, width: 1, color: '#5d5d5d'})}}
                    className="mx-12 mt-4 mb-10 h-10 rounded-xl justify-center items-center bg-[#00A6A6]">

                    <Text className="text-white text-2xl font-semibold">
                        Submit
                    </Text>

                </TouchableOpacity>
            </View>
        </Dialog>
    )
}

export default CreateTaskDialog
