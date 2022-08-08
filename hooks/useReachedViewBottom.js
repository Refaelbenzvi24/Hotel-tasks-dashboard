const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}, paddingToBottom = 20) => {
    return layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom
}

const UseReachedViewBottom = ({onViewBottomEnter, onViewBottomExit, paddingToBottom}) => {
    return (nativeScrollEvent) => {
        if (isCloseToBottom(nativeScrollEvent, paddingToBottom) && nativeScrollEvent.contentOffset.y > 20) {
            return onViewBottomEnter()
        }

        return onViewBottomExit()
    }
}

export default UseReachedViewBottom
