"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_native_1 = require("react-native");
const react_native_linear_gradient_1 = require("react-native-linear-gradient");
function SkeletonPlaceholder({ children, backgroundColor, speed, highlightColor }) {
    const animatedValue = new react_native_1.Animated.Value(0);
    React.useEffect(() => {
        react_native_1.Animated.loop(react_native_1.Animated.timing(animatedValue, {
            toValue: 1,
            duration: speed,
            easing: react_native_1.Easing.ease
        })).start();
    }, []);
    const translateX = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [-350, 350]
    });
    const getChildren = (element) => {
        return React.Children.map(element, (child, index) => {
            const { style } = child.props;
            if (child.props.children) {
                return (<react_native_1.View key={index} style={style}>
            {getChildren(child.props.children)}
          </react_native_1.View>);
            }
            else {
                return (<react_native_1.View key={index} style={{ position: "relative" }}>
            <react_native_1.View style={[style, { backgroundColor, overflow: "hidden" }]}>
              <react_native_1.Animated.View style={[
                    react_native_1.StyleSheet.absoluteFill,
                    {
                        transform: [{ translateX }]
                    }
                ]}>
                <react_native_linear_gradient_1.default colors={[
                    backgroundColor,
                    highlightColor,
                    backgroundColor
                ]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={{ flex: 1 }}/>
              </react_native_1.Animated.View>
            </react_native_1.View>
          </react_native_1.View>);
            }
        });
    };
    return <React.Fragment>{getChildren(children)}</React.Fragment>;
}
exports.default = SkeletonPlaceholder;
SkeletonPlaceholder.defaultProps = {
    backgroundColor: "#E1E9EE",
    highlightColor: "#F2F8FC",
    speed: 800
};
//# sourceMappingURL=SkeletonPlaceholder.js.map