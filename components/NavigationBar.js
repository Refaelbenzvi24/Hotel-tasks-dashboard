import {Animated, Text, TouchableOpacity, View} from "react-native";
import {useEffect, useRef, useState} from "react";
import style from "./UI/Util/style";

const NavigationBar = ({bgColor, options, onChange, defaultValue}) => {
    const [activeTab, setActiveTab]     = useState(defaultValue || options[0].value)
    const [tabsLayouts, setTabsLayouts] = useState({})
    const shadowLeftPos                 = useRef(new Animated.Value(0)).current
    const [shadowWidth, setShadowWidth] = useState(0)

    const shadowController = () => {
        const activeTabIndex = options.findIndex(option => option.value === activeTab)

        const activeTabLeftPos = tabsLayouts[activeTabIndex].x
        const activeTabWidth   = tabsLayouts[activeTabIndex].width

        Animated.timing(shadowLeftPos, {
            toValue:         activeTabLeftPos,
            duration:        200,
            useNativeDriver: true,
        }).start()

        setShadowWidth(activeTabWidth)
    }

    useEffect(() => {
        if (Object.keys(tabsLayouts).length === options.length) {
            shadowController()
        }

        onChange(activeTab)
    }, [activeTab])

    useEffect(() => {
        if (Object.keys(tabsLayouts).length === options.length) {
            shadowController()
        }
    }, [tabsLayouts])

    return (
        <View>
            <View
                className="flex-row space-x-7 justify-center">
                {
                    options.map(({label, value}, index) => (

                        <TouchableOpacity
                            className="justify-center"
                            onLayout={({nativeEvent}) => {
                                setTabsLayouts((prevState) => ({...prevState, [index]: nativeEvent.layout}))
                            }}
                            onPress={() => setActiveTab(value)}
                            key={index}>

                            <Text
                                className="text-xs">
                                {label}
                            </Text>
                        </TouchableOpacity>
                    ))
                }
            </View>

            {
                Object.keys(tabsLayouts).length === options.length && (
                    <Animated.View
                        className="absolute h-1 bottom-0"
                        style={[{
                            ...style.shadow(16, {height: -4, width: 0, color: '#67676790'}),
                            bottom:          -12,
                            height:          6,
                            backgroundColor: bgColor,
                            transform:       [{translateX: shadowLeftPos}],
                            width:           shadowWidth,
                        }]}/>
                )
            }
        </View>
    )
}

NavigationBar.defaultProps = {
    bgColor: '#ffffff'
}

export default NavigationBar
