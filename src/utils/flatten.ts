import React from 'react';
import {ViewProps} from 'react-native-svg/lib/typescript/fabric/utils';

const flatten = (children: React.ReactElement<ViewProps>, acc: any[] = []) => {
  acc = [...acc, ...React.Children.toArray(children)];

  if (children.props && children.props.children)
    return flatten(children.props.children as React.ReactElement<ViewProps>, acc);

  return acc;
};

export default flatten;
