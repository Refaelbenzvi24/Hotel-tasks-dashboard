const limitNumberWithinRange = (num, min, max) => Math.min(Math.max(num, min), max)


const style = {
    shadow: (
                depth,
                {height = undefined, width = undefined, color = "#5b5b5b"} = {
                    height: undefined, width: undefined, color: "#5b5b5b"
                }) => ({
        shadowColor:   color,
        shadowOffset:  {
            width:  width || 0,
            height: height || limitNumberWithinRange(((1 * depth) / (24 / 20)), 1, 20)
        },
        shadowOpacity: limitNumberWithinRange(0.2 * depth / (24 / 0.6), 0.2, 0.6),
        shadowRadius:  limitNumberWithinRange(0.1 * depth / (24 / 16), 1, 16),

        elevation: limitNumberWithinRange(1 * depth, 1, 24),
    })
}

export default style
