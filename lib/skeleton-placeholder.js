"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const masked_view_1 = __importDefault(require("@react-native-masked-view/masked-view"));
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const react_native_linear_gradient_1 = __importDefault(require("react-native-linear-gradient"));
const WINDOW_WIDTH = react_native_1.Dimensions.get('window').width;
const logEnabled = false;
const SkeletonPlaceholder = ({ children, enabled = true, backgroundColor = '#E1E9EE', highlightColor = '#F2F8FC', speed = 800, direction = 'right', borderRadius, shimmerWidth, }) => {
    const [layout, setLayout] = React.useState();
    const animatedValueRef = React.useRef(new react_native_1.Animated.Value(0));
    const isAnimationReady = Boolean(speed && (layout === null || layout === void 0 ? void 0 : layout.width) && (layout === null || layout === void 0 ? void 0 : layout.height));
    React.useEffect(() => {
        if (!isAnimationReady)
            return;
        const loop = react_native_1.Animated.loop(react_native_1.Animated.timing(animatedValueRef.current, {
            toValue: 1,
            duration: speed,
            easing: react_native_1.Easing.ease,
            useNativeDriver: true,
        }));
        loop.start();
        return () => loop.stop();
    }, [isAnimationReady, speed]);
    const animatedGradientStyle = React.useMemo(() => {
        const animationWidth = WINDOW_WIDTH + (shimmerWidth !== null && shimmerWidth !== void 0 ? shimmerWidth : 0);
        return Object.assign(Object.assign({}, react_native_1.StyleSheet.absoluteFillObject), { flexDirection: 'row', transform: [
                {
                    translateX: animatedValueRef.current.interpolate({
                        inputRange: [0, 1],
                        outputRange: direction === 'right'
                            ? [-animationWidth, animationWidth]
                            : [animationWidth, -animationWidth],
                    }),
                },
            ] });
    }, [direction, WINDOW_WIDTH, shimmerWidth]);
    const placeholders = React.useMemo(() => {
        if (!enabled)
            return null;
        return (<react_native_1.View style={styles.placeholderContainer}>
        {transformToPlaceholder(children, backgroundColor, borderRadius)}
      </react_native_1.View>);
    }, [backgroundColor, children, borderRadius, enabled]);
    const transparentColor = React.useMemo(() => getTransparentColor(highlightColor.replace(/ /g, '')), [highlightColor]);
    if (!enabled || !placeholders)
        return children;
    if (!(layout === null || layout === void 0 ? void 0 : layout.width) || !layout.height)
        return <react_native_1.View onLayout={(event) => setLayout(event.nativeEvent.layout)}>{placeholders}</react_native_1.View>;
    // https://github.com/react-native-linear-gradient/react-native-linear-gradient/issues/358
    // to make transparent gradient we need to use original color with alpha
    return (<masked_view_1.default style={{ height: layout.height, width: layout.width }} maskElement={placeholders}>
      <react_native_1.View style={[react_native_1.StyleSheet.absoluteFill, { backgroundColor }]}/>

      {isAnimationReady && highlightColor !== undefined && transparentColor !== undefined && (<react_native_1.Animated.View style={animatedGradientStyle}>
          <react_native_linear_gradient_1.default {...getGradientProps(shimmerWidth)} colors={[transparentColor, highlightColor, transparentColor]}/>
        </react_native_1.Animated.View>)}
    </masked_view_1.default>);
};
SkeletonPlaceholder.Item = (props) => <react_native_1.View style={getItemStyle(props)}>{props.children}</react_native_1.View>;
SkeletonPlaceholder.Item.displayName = 'SkeletonPlaceholderItem';
const getGradientProps = (width) => ({
    start: { x: 0, y: 0 },
    end: { x: 1, y: 0 },
    style: Object.assign(Object.assign({}, react_native_1.StyleSheet.absoluteFillObject), { width }),
});
const getItemStyle = (_a) => {
    var { children: _, style } = _a, styleFromProps = __rest(_a, ["children", "style"]);
    return style ? [style, styleFromProps] : styleFromProps;
};
const transformToPlaceholder = (rootElement, backgroundColor, radius) => {
    if (!rootElement)
        return null;
    return React.Children.map(rootElement, (element, index) => {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
        if (!element)
            return null;
        if (element.type === React.Fragment)
            return <>{transformToPlaceholder((_a = element.props) === null || _a === void 0 ? void 0 : _a.children, backgroundColor, radius)}</>;
        const isPlaceholder = !((_b = element.props) === null || _b === void 0 ? void 0 : _b.children) ||
            typeof element.props.children === 'string' ||
            (Array.isArray(element.props.children) &&
                element.props.children.every((x) => x == null || typeof x === 'string'));
        const props = element.props;
        const style = ((_c = element.type) === null || _c === void 0 ? void 0 : _c.displayName) === SkeletonPlaceholder.Item.displayName
            ? getItemStyle(element.props)
            : element.props.style;
        const borderRadius = (_e = (_d = props === null || props === void 0 ? void 0 : props.borderRadius) !== null && _d !== void 0 ? _d : style === null || style === void 0 ? void 0 : style.borderRadius) !== null && _e !== void 0 ? _e : radius;
        const width = (_f = props === null || props === void 0 ? void 0 : props.width) !== null && _f !== void 0 ? _f : style === null || style === void 0 ? void 0 : style.width;
        const height = (_l = (_k = (_j = (_h = (_g = props === null || props === void 0 ? void 0 : props.height) !== null && _g !== void 0 ? _g : style === null || style === void 0 ? void 0 : style.height) !== null && _h !== void 0 ? _h : props === null || props === void 0 ? void 0 : props.lineHeight) !== null && _j !== void 0 ? _j : style === null || style === void 0 ? void 0 : style.lineHeight) !== null && _k !== void 0 ? _k : props === null || props === void 0 ? void 0 : props.fontSize) !== null && _l !== void 0 ? _l : style === null || style === void 0 ? void 0 : style.fontSize;
        const finalStyle = [
            style,
            isPlaceholder ? [styles.placeholder, { backgroundColor }] : styles.placeholderContainer,
            {
                height,
                width,
                borderRadius,
            },
        ];
        logEnabled &&
            console.log(isPlaceholder ? '[skeleton] placeholder' : '[skeleton] container', {
                element,
            });
        return (<react_native_1.View key={index} style={finalStyle} children={isPlaceholder
            ? undefined
            : transformToPlaceholder(element.props.children, backgroundColor, borderRadius)}/>);
    });
};
const styles = react_native_1.StyleSheet.create({
    placeholderContainer: {
        backgroundColor: 'transparent',
    },
    placeholder: {
        overflow: 'hidden',
    },
});
exports.default = SkeletonPlaceholder;
const getColorType = (color) => {
    if (new RegExp(/^rgba\((0|255|25[0-4]|2[0-4]\d|1\d\d|0?\d?\d),(0|255|25[0-4]|2[0-4]\d|1\d\d|0?\d?\d),(0|255|25[0-4]|2[0-4]\d|1\d\d|0?\d?\d),(0|0?\.\d|1(\.0)?)\)$/).test(color)) {
        return 'rgba';
    }
    if (new RegExp(/^rgb\((0|255|25[0-4]|2[0-4]\d|1\d\d|0?\d?\d),(0|255|25[0-4]|2[0-4]\d|1\d\d|0?\d?\d),(0|255|25[0-4]|2[0-4]\d|1\d\d|0?\d?\d)\)$/).test(color)) {
        return 'rgb';
    }
    if (new RegExp(/^#?([a-f\d]{3,4}|[a-f\d]{6}|[a-f\d]{8})$/i).test(color)) {
        return 'hex';
    }
    throw `The provided color ${color} is not a valid (hex | rgb | rgba) color`;
};
const getTransparentColor = (color) => {
    const type = getColorType(color);
    if (type === 'hex') {
        if (color.length < 6) {
            return color.substring(0, 4) + '0';
        }
        return color.substring(0, 7) + '00';
    }
    //@ts-ignore
    const [r, g, b] = color.match(/\d+/g);
    return `rgba(${r},${g},${b},0)`;
};
//# sourceMappingURL=skeleton-placeholder.js.map