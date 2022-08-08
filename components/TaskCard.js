import {Text, TouchableOpacity, View} from "react-native"
import {ClockIcon,} from "react-native-heroicons/outline"
import CardWithStatus from "./UI/Card/CardWithStatus"
import Divider from "./UI/Dividers/Divider"
import Avatar from "./UI/Avatar/Avatar"
import ReadMore from "./UI/Typography/ReadMore"
import {Feather} from '@expo/vector-icons'
import {MaterialIcons} from '@expo/vector-icons'
import {IconForStatus, priorityColor} from "./UI/Util"
import useTimer from "../hooks/useTimer"
import {useState} from "react"
import TaskDetailsDialog from "./Dialogs/TaskDetailsDialog"
import ConditionalRender from "./UI/Animation/ConditionalRender"
import {taskEndpoint} from "../services"


const TaskCard = ({onTaskUpdate, ...taskProps}) => {
    const [isTaskDialogOpen, setIsTaskDialogOpen] = useState(false)
    const [task, setTask]                         = useState({...taskProps})

    const {title, status, department, details, location, priority, createdAt, hasAttachment, pickedBy} = task

    const timeElapsed = useTimer(createdAt, 1000, status === 'Completed')

    const pickTask = async () => {
        const _task = await taskEndpoint.pick(task.id)
        setTask(_task)
        onTaskUpdate()
    }

    const closeTask = async () => {
        const _task = await taskEndpoint.close(task.id)
        setTask(_task)
        onTaskUpdate()
    }


    return (
        <TouchableOpacity onPress={() => setIsTaskDialogOpen(true)}>
            <ConditionalRender
                condition={isTaskDialogOpen}
                timeout={300}
                instantEntrance>
                <TaskDetailsDialog
                    taskId={task.id}
                    isOpen={isTaskDialogOpen}
                    onBlur={() => setIsTaskDialogOpen(false)}
                    onCloseBtnPress={() => setIsTaskDialogOpen(false)}/>
            </ConditionalRender>

            <CardWithStatus statusColor={status === 'Completed' ? '#8D8D8D' : '#00A6A6'}>
                <View className="py-1 px-1.5">
                    <View className="flex-row px-0.5">
                        <Text className="font-normal flex-1 pt-0.5 font-light text-[10px]">
                            {department}
                        </Text>

                        <View className="flex-row items-center h-[20px]">
                            <Text
                                className={`${status === 'In Progress' ? 'text-[#f5bb01]' : 'text-neutral-400'} text-[12px] font-bold`}>
                                {status}
                                {status === 'Pending' && '...'}
                            </Text>

                            <IconForStatus status={status}/>
                        </View>
                    </View>

                    <Text className="text-[20px] text-[#5F5F5F] mb-[-3px]">{title}</Text>

                    <View className="flex-row">
                        <View className="flex-row items-center flex-1 pl-[3px] py-[5px]">
                            <ReadMore
                                size="10"
                                maxLength={40}
                                text={details}/>
                        </View>
                        {
                            status !== 'Completed' &&
                            <TouchableOpacity
                                onPress={() => status === 'Pending' ? pickTask() : closeTask()}
                                className="rounded-2xl self-start flex-row justify-center items-center bg-[#00a6a7] pt-[2] pb-[3] h-[23px] w-[80px]">
                                <Text
                                    className="text-center text-white text-[12px] font-bold">
                                    {status === 'Pending' ? 'Pick' : 'Close'}
                                </Text>
                            </TouchableOpacity>
                        }
                    </View>

                    <View className="flex-row items-center">
                        <MaterialIcons
                            name="place"
                            height={20}
                            width={15}
                            color={status === 'Completed' ? '#a1a1aa' : '#fbb8af'}/>
                        <Text className="text-md text-neutral-500">{location}</Text>
                    </View>

                    <Divider className="mx-3 mb-1 mt-2"/>


                    <View
                        className="flex-row flex-1 px-4 items-center"
                        style={{
                            height: 34
                        }}>
                        <View
                            style={{
                                marginTop: -3,
                                flex:      3
                            }}>
                            {
                                status !== 'Completed' &&
                                <Text
                                    className="font-bold"
                                    style={{
                                        color: priorityColor(priority)
                                    }}>
                                    {priority}
                                </Text>
                            }
                        </View>

                        <View
                            className="flex-row items-center justify-center"
                            style={{
                                flex: 3
                            }}>
                            <ClockIcon color="#8D8D8D" size={15}/>
                            <Text className="text-[#8D8D8D]">{timeElapsed}</Text>
                        </View>


                        <View
                            className="flex-row items-center justify-end"
                            style={{
                                flex: 3
                            }}>
                            {hasAttachment && <Feather name="paperclip" size={19} color="#a1a1aa"/>}
                            {status === 'In Progress' && (
                                <View className="items-center">
                                    <Avatar
                                        name={pickedBy}
                                        bgColor="#184E77"
                                        size={12}/>
                                    <Text className="text-[8px] font-light">{pickedBy}</Text>
                                </View>
                            )}
                        </View>

                    </View>
                </View>
            </CardWithStatus>
        </TouchableOpacity>
    )
}

export default TaskCard
