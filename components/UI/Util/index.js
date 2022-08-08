import {View} from "react-native";
import {MaterialCommunityIcons} from "@expo/vector-icons";

export const priorityColor = (priority) => {
    const priorityColors = {
        'Low':    '#26680F',
        'Medium': '#F5BC00',
        'High':   '#96220f'
    }

    return priorityColors[priority] ?? 'text-black'
}

export const IconForStatus = ({status}) => {
    const statusList = {
        'Pending':     <View className="pr-2"/>,
        'In Progress': <MaterialCommunityIcons name="progress-check" size={20} color="#f5bb01"/>,
        'Completed':   <MaterialCommunityIcons name="check-circle-outline" size={20} color="#a1a1aa"/>
    }

    return statusList[status] ?? <></>
}
