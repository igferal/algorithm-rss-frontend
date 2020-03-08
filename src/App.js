import React from "react";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "./store";
import PropTypes from "prop-types";
import { DefaultRoot } from "./routes/router";

const App = ({ store }) => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <DefaultRoot />
    </PersistGate>
  </Provider>
);

App.propTypes = {
  store: PropTypes.object.isRequired
};

export default App;
