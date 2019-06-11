import React from "react";
import PropTypes from "prop-types";
import { Animated, View } from "react-native";

class SkeletonPlaceholder extends React.Component {
  constructor(props) {
    super(props);

    this.animatedOpacity = new Animated.Value(0);

    this.state = {
      opacityValue: 0
    };
  }

  getAnimated() {
    return Animated.timing(this.animatedOpacity, {
      toValue: this.state.opacityValue,
      duration: 500,
      useNativeDriver: true
    }).start(() =>
      this.setState({ opacityValue: this.state.opacityValue === 0 ? 1 : 0 })
    );
  }

  componentDidMount() {
    this.getAnimated();

    this.intervalId = setInterval(() => {
      this.getAnimated();
    }, 800);
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  getChildren(element) {
    return React.Children.map(element, (child, index) => {
      const { style } = child.props;
      if (child.props.children) {
        return (
          <View
            key={index}
            style={{
              ...style
            }}
          >
            {this.getChildren(child.props.children)}
          </View>
        );
      } else {
        return (
          <View
            key={index}
            style={[style, { backgroundColor: this.props.backgroundColor }]}
          />
        );
      }
    });
  }

  render() {
    return (
      <Animated.View
        style={{
          opacity: this.animatedOpacity.interpolate({
            inputRange: [0, 1],
            outputRange: [this.props.maxOpacity, this.props.minOpacity]
          })
        }}
      >
        {this.getChildren(this.props.children)}
      </Animated.View>
    );
  }
}

SkeletonPlaceholder.propTypes = {
  minOpacity: PropTypes.number,
  maxOpacity: PropTypes.number,
  backgroundColor: PropTypes.string
};

SkeletonPlaceholder.defaultProps = {
  minOpacity: 0.3,
  maxOpacity: 1,
  backgroundColor: "#eee"
};

export default SkeletonPlaceholder;
