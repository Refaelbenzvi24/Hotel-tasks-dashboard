import {ScrollView, TouchableOpacity, View} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {useEffect, useLayoutEffect, useState} from "react";
import NavigationBar from "../components/NavigationBar";
import TaskCard from "../components/TaskCard";
import {AntDesign} from "@expo/vector-icons";
import {LinearGradient} from "expo-linear-gradient";
import CreateTaskDialog from "../components/Dialogs/CreateTaskDialog";
import {Animated} from "react-native";
import {taskEndpoint} from "../services";
import ConditionalRender from "../components/UI/Animation/ConditionalRender";
import UseReachedViewBottom from "../utils/useReachedViewBottom";
import Task from "../modules/Task";


const navigationOptions = [
    {
        label: "All Tasks",
        value: ""
    },
    {
        label: "Pending",
        value: "Pending"
    },
    {
        label: "In Progress",
        value: "In Progress"
    },
    {
        label: "Completed",
        value: "Completed"
    }
]

const HomeScreen = () => {
    const navigation                                = useNavigation()
    const [tasksStatusFilter, setTasksStatusFilter] = useState(navigationOptions[0].value)
    const [isTaskDialogOpen, setIsTaskDialogOpen]   = useState(false)
    const [isTaskBtnVisible, setIsTaskBtnVisible]   = useState(true)
    const [tasks, setTasks]                         = useState([])
    const [fadeAnim]                                = useState(new Animated.Value(1))


    const checkIfReachedBottom = UseReachedViewBottom({
        onViewBottomEnter: () => {
            setIsTaskBtnVisible(false)
            return Animated.timing(fadeAnim, {
                toValue:         0,
                duration:        200,
                useNativeDriver: false
            }).start()
        },
        onViewBottomExit:  () => {
            setIsTaskBtnVisible(true)
            return Animated.timing(fadeAnim, {
                toValue:         1,
                duration:        200,
                useNativeDriver: false
            }).start()
        }
    })


    const addTask = async () => {
        setIsTaskDialogOpen(false)
        await getTasks()
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false
        })
    }, [])

    const getTasks = async (filter = tasksStatusFilter) => {
        const data  = await taskEndpoint.list(filter)
        const tasks = data.map(task => new Task(task))
        setTasks(tasks)
    }

    useEffect(() => {
        (async () => await getTasks(''))()
    }, [])

    return (
        <View className="bg-[#00a6a7] flex-1">

            <View className="flex-1 mt-24 bg-white">
                <View className="py-4">
                    <NavigationBar
                        defaultValue={navigationOptions[0].value}
                        onChange={async (value) => {
                            setTasksStatusFilter(value)
                            await getTasks(value)
                        }}
                        options={navigationOptions}/>
                </View>

                <ScrollView
                    showsHorizontalScrollIndicator={false}
                    scrollEventThrottle={100}
                    onScroll={({nativeEvent}) => {
                        checkIfReachedBottom(nativeEvent)
                    }}
                    className="bg-[#f8edec] m-2 rounded-xl">
                    {
                        tasks?.map(task => (
                            <TaskCard
                                key={task.id}
                                onTaskUpdate={getTasks}
                                {...task}/>
                        ))
                    }
                </ScrollView>

                <ConditionalRender
                    condition={isTaskBtnVisible}
                    timeout={300}
                    instantEntrance>
                    <Animated.View
                        style={{
                            opacity: fadeAnim,
                        }}
                        className="absolute bottom-10 right-10">
                        <LinearGradient
                            className="rounded-2xl"
                            colors={['rgba(56, 164, 167, 1)', 'rgba(145, 215, 217, 1)']}>
                            <TouchableOpacity
                                onPress={() => setIsTaskDialogOpen(true)}
                                className="p-4">

                                <AntDesign name="plus" size={30} color="white"/>
                            </TouchableOpacity>
                        </LinearGradient>
                    </Animated.View>
                </ConditionalRender>
            </View>


            <ConditionalRender
                condition={isTaskDialogOpen}
                timeout={300}
                instantEntrance>
                <CreateTaskDialog
                    onSubmit={addTask}
                    isOpen={isTaskDialogOpen}
                    onCloseBtnPress={() => setIsTaskDialogOpen(false)}
                    onBlur={() => setIsTaskDialogOpen(false)}/>
            </ConditionalRender>
        </View>
    )
}

export default HomeScreen
