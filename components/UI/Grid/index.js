import {View} from "react-native";

const styles = {
    row: ({reverse, justify, align}) => ({
        flexDirection: reverse ? 'row-reverse' : 'row',
        justifyContent: justify,
        alignItems:     align,
    }),
    col: ({cols, reverse, justify, align}) => ({
        flexDirection: reverse ? 'column-reverse' : 'column',
        flex:           cols,
        justifyContent: justify,
        alignItems:     align
    })
}

// RN Code
export const Col = ({className,style, cols, justify, reverse, align, children}) => {
    return (
        <View
            className={className}
            style={{...styles.col({cols, justify, align, reverse}), ...style}}>
            {children}
        </View>
    )
}

Col.defaultProps = {
    cols: 'auto',
    justify: 'start',
    align: 'start',
    reverse: false,
}

export const Row = ({className, style, align, justify, reverse, children}) => (
    <View
        className={className}
        style={{...styles.row({justify, align, reverse}), ...style}}>
        {children}
    </View>
)

Row.defaultProps = {
    justify: 'flex-start',
    align:   'center',
    reverse: false
}
