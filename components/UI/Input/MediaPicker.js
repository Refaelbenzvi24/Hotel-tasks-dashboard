import {Image, Text, TouchableOpacity, View} from "react-native";
import * as DocumentPicker from 'expo-document-picker';
import * as ImagePicker from 'expo-image-picker';
import {useState} from "react";
import {AntDesign} from "@expo/vector-icons";

const MediaPicker = ({type, onValueChange, imageWidth, imageHeight, showMax}) => {
    const [files, setFiles] = useState([])

    const openFilePicker = async () => {
        const {uri, cancelled} = await ImagePicker.launchImageLibraryAsync({
            quality:    1,
            mediaTypes: type
        })

        if (!cancelled) {
            setFiles([...files, uri])
        }

        onValueChange(uri)
    }

    if (!files[0]) {
        return (
            <TouchableOpacity onPress={() => openFilePicker()}>
                <View
                    className="border border-dashed border-[1px] border-[#C4C4C4] rounded-2xl p-4 justify-center items-center">
                    {
                        <Text>
                            Tap here to add an image
                        </Text>
                    }
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <View className="flex-row space-x-1">
            {
                files.slice(0, showMax - 1).map((file, index) => (
                    <Image
                        key={index}
                        style={{
                            width:  imageWidth,
                            height: imageHeight
                        }}
                        source={{
                            uri: file
                        }}/>
                ))
            }

            {
                files.length > showMax - 1 ?
                    <View className="relative">
                        <Image
                            style={{
                                width:  imageWidth,
                                height: imageHeight
                            }}
                            source={{
                                uri: files[showMax - 1]
                            }}/>

                        {
                            files.length > showMax &&
                            <View
                                className="absolute justify-center items-center bg-[#c8c8c899]"
                                style={{
                                    width:  imageWidth,
                                    height: imageHeight
                                }}>
                                <Text
                                    style={{
                                        fontSize: (imageWidth + imageHeight) / 5,
                                    }}
                                    className="text-white">
                                    +{files.length - showMax}
                                </Text>
                            </View>
                        }
                    </View>
                    : <></>
            }
            <TouchableOpacity
                onPress={() => openFilePicker()}>
                <View
                    className="justify-center items-center bg-neutral-500 opacity-20"
                    style={{
                        width:  imageWidth,
                        height: imageHeight
                    }}>
                    <AntDesign name="plus" size={40} color="white"/>
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default MediaPicker
