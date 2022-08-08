import {Text, TouchableOpacity, View} from "react-native";
import {useState} from "react";

const truncateDescription = (text, maxLength) => {
    const leftSide          = text.substr(0, maxLength)
    const rightSide         = text.substr(maxLength, text.length)
    const isAfterShortening = rightSide.length > 0

    if (rightSide[0] === ' ' || leftSide[leftSide.length - 1] === ' ') {
        return [leftSide, isAfterShortening]
    }

    return [leftSide.split(' ').slice(0, -1).join(' '), isAfterShortening]
}

const ReadMore = ({text, size, maxLength}) => {
    const [shortenedText, isAfterShortening] = truncateDescription(text, maxLength)
    const [readMore, setReadMore] = useState(false)

    return (
        <>
            <Text className={`text-[${size}px] text-neutral-500`}>
                {readMore ? text : shortenedText}
                {!readMore && isAfterShortening && '... '}
            </Text>
            {
                !readMore && isAfterShortening &&
                <TouchableOpacity onPress={() => setReadMore(true)}>
                    <Text className={`text-[${size}px] text-[#00a6a7]`}>Read more</Text>
                </TouchableOpacity>
            }
        </>
    )
}

export default ReadMore
