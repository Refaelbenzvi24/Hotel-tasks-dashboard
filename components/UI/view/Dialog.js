import Backdrop from "../Backdrop/Backdrop";
import {Keyboard, TouchableWithoutFeedback, useWindowDimensions, View} from "react-native";
import Modal from "react-native-modal"

/**
 * Dialog component.
 * @param children
 * @param style
 * @param CardComponent
 * @param cardComponentOptions
 * @param visible
 * @param maxWidth
 * @param minPadding
 * @param onBlur
 * @returns {JSX.Element}
 * @constructor
 */
const Dialog = ({children, style, CardComponent, cardComponentOptions, visible, maxWidth, minPadding, onBlur}) => {
    const {width} = useWindowDimensions();

    return (

        <Modal
            animationType="slide"
            visible={visible}
            style={{
                margin: 0
            }}>

            <Backdrop
                opacity={0.6}
                onPress={onBlur}/>


            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <CardComponent
                    {...cardComponentOptions}
                    className="bg-white rounded-xl"
                    style={{
                        ...style,
                        width:       width > maxWidth + (minPadding * 2) ? maxWidth : width - (minPadding * 2),
                        marginLeft:  'auto',
                        marginRight: 'auto'
                    }}>
                    {children}
                </CardComponent>
            </TouchableWithoutFeedback>

        </Modal>
    )
}

Dialog.defaultProps = {
    maxWidth:   650,
    minPadding: 20,
    CardComponent: View,
    cardComponentOptions: {}
}

export default Dialog
