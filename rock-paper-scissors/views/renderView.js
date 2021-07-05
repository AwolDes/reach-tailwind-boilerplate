import React from 'react';

// Controls the state
const renderView = (parent, Views) => {
  parent.state = parent.state || {};
  const { view, ContentView } = parent.state;
  const View = view === 'Wrapper'
    ? ContentView
    : Views[view];
  const { Wrapper } = Views;
  const props = { ...parent.props, ...parent.state, parent };
  const content = <View {...props} />;
  return <Wrapper {...{ content }} />;
};

export default renderView;
