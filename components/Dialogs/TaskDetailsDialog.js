import Dialog from "../UI/view/Dialog"
import {AntDesign, MaterialIcons} from "@expo/vector-icons"
import {Image, Text, TouchableOpacity, useWindowDimensions, View} from "react-native"
import {IconForStatus, priorityColor} from "../UI/Util"
import {useEffect, useLayoutEffect, useState} from "react"
import {taskEndpoint} from "../../services"
import Task from "../../modules/Task"
import Divider from "../UI/Dividers/Divider"
import Avatar from "../UI/Avatar/Avatar"
import ConditionalRender from "../UI/Animation/ConditionalRender"
import {ClockIcon} from "react-native-heroicons/outline"
import useTimer from "../../hooks/useTimer"
import moment from "moment"
import CardWithStatus from "../UI/Card/CardWithStatus";

const TaskDetailsDialog = ({taskId, isOpen, onCloseBtnPress, onBlur}) => {
    const {width} = useWindowDimensions();

    const [task, setTask] = useState({})

    const {title, status, department, details, location, priority, createdAt, images, hasAttachment, pickedBy} = task

    const timeElapsed = useTimer(createdAt, 1000, status === 'Completed')

    const getTask = async () => {
        const data = await taskEndpoint.get(taskId)
        const task = new Task(data)
        setTask(task)
    }

    useLayoutEffect(() => {
        (async () => getTask())()
    }, [])

    return (
        <Dialog
            CardComponent={CardWithStatus}
            cardComponentOptions={{
                statusColor: status === 'Completed' ? '#8D8D8D' : '#00A6A6'
            }}
            onBlur={onBlur}
            minPadding={20}
            visible={isOpen}
            style={{
                marginTop: 140,
            }}>
            <ConditionalRender condition={Object.keys(task).length}>
                <Image
                    className="absolute h-[355px] -z-10 bottom-full rounded-xl -mb-[210px]"
                    style={{
                        width:       width > 650 + (20 * 2) ? 650 - (3 * 2) : width - (26 * 2),
                        marginLeft:  5,
                        marginRight: 5,
                        left:        0,
                        right:       0
                    }}
                    source={{
                        uri: hasAttachment ? images[0] : ''
                    }}/>

                <View className="flex-row justify-center">
                    <View
                        className="flex-row items-center justify-end"
                        style={{
                            flex: 3
                        }}/>
                    <View
                        className="flex-row items-start justify-center"
                        style={{
                            flex: 3
                        }}>

                        <View className="flex-row items-center h-[20px] mt-[13px]">
                            <Text
                                className={`${status === 'In Progress' ? 'text-[#f5bb01]' : 'text-neutral-400'} text-[18px] font-bold`}>
                                {status}
                                {status === 'Pending' && '...'}
                            </Text>

                            <IconForStatus status={status}/>
                        </View>

                    </View>

                    <View
                        className="flex-row items-center justify-end"
                        style={{
                            flex: 3
                        }}>
                        <TouchableOpacity
                            onPress={onCloseBtnPress}
                            className="rounded-full justify-center items-center border border-solid text-[18px]
                                    w-[38px] h-[38px] border-[#F0E2E0] border-[0.2px] mt-[10px] mr-[9px]">

                            <AntDesign name="close" size={21} color="black"/>

                        </TouchableOpacity>
                    </View>
                </View>

                <View className="flex-row justify-center pt-[10px]">
                    <Text className="text-[24px] text-[#5F5F5F] mb-[-3px]">{title}</Text>
                </View>

                <View className="flex-row justify-center">
                    <View className="flex-row items-center flex-1 px-[23px] pt-[14px]">
                        <Text className="text-[16px] text-[#8D8D8D]">
                            {details}
                        </Text>
                    </View>
                </View>

                <View className="flex-row justify-center items-center pt-[15px]">
                    <MaterialIcons
                        name="place"
                        size={20}
                        height={26}
                        width={22}
                        color={status === 'Completed' ? '#a1a1aa' : '#fbb8af'}/>

                    <Text className="text-md text-[18px] text-[#135BFF]">{location}</Text>
                </View>

                <Divider className="mt-[16px] mb-[18px] mx-[24px]"/>

                <View className="flex-row justify-center items-center pt-[10px] h-[85px]">
                    {
                        pickedBy && (
                            <View
                                className="items-center h-[85px]"
                                style={{
                                    flex: 3
                                }}>
                                <Text className="text-[#8D8D8D] text-[12px]">
                                    Picked By
                                </Text>


                                <View
                                    className=" items-center justify-end pt-[16px]"
                                    style={{
                                        flex: 3
                                    }}>
                                    <View className="items-center">
                                        <Avatar
                                            padding={8}
                                            name={pickedBy}
                                            bgColor="#184E77"
                                            size={17}/>
                                        <Text className="text-[16px] text-[#C1C1C1]">{pickedBy}</Text>
                                    </View>
                                </View>
                            </View>
                        )
                    }

                    <View
                        className="items-center content-start h-[85px]"
                        style={{
                            flex: 3
                        }}>
                        <Text className="text-[#8D8D8D] text-[12px]">
                            Priority
                        </Text>

                        <Text
                            className="font-bold flex-1 text-[16px] pt-[16px]"
                            style={{
                                color: priorityColor(priority)
                            }}>
                            {priority}
                        </Text>
                    </View>

                    <View
                        className="items-center h-[85px]"
                        style={{
                            flex: 3
                        }}>
                        <Text className="text-[#8D8D8D] text-[12px]">
                            Department
                        </Text>

                        <Text className="font-normal flex-1 text-[16px] pt-[16px] text-[#C1C1C1]">
                            {department}
                        </Text>
                    </View>
                </View>

                <Divider className="my-[14px] mx-[24px]"/>

                <View className="flex-row justify-center items-center pt-[10px] h-[85px] pb-[25px]">
                    <View
                        className="items-center justify-items-start"
                        style={{
                            flex: 2
                        }}>
                        <Text className="text-[#8D8D8D] text-[12px]">
                            Created At
                        </Text>

                        <Text className="font-normal text-[16px] pt-[12px] text-[#C1C1C1]">
                            {moment(createdAt).format('DD.MM.YY HH:MM A')}
                        </Text>
                    </View>

                    <View
                        className="items-center self-start"
                        style={{
                            flex: 2
                        }}>
                        <Text className="text-[#8D8D8D] text-[12px]">
                            Task Duration
                        </Text>

                        <View
                            className="flex-row items-center justify-center pt-[12px]">
                            <ClockIcon color="#C1C1C1" size={16}/>
                            <Text className="font-normal text-[16px] text-[#C1C1C1]">{timeElapsed}</Text>
                        </View>
                    </View>
                </View>

            </ConditionalRender>
        </Dialog>
    )
}

export default TaskDetailsDialog
