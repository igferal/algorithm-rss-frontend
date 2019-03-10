import { createStore, compose, applyMiddleware } from "redux";
import rootReducer from "./reducers/index";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web and AsyncStorage for react-native

const persistConfig = {
  key: "root",
  storage
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const createStoreWithMiddleware = compose(applyMiddleware(thunk))(createStore);

export const store = createStoreWithMiddleware(persistedReducer, composeWithDevTools());
export const persistor = persistStore(store);

 
