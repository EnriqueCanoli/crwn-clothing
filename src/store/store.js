/**
 * Store object to use in our React application, we dont need more use context
 */

import { compose, applyMiddleware, createStore } from "redux";
import logger from "redux-logger";
import { rootReducer } from "./root-reducer";
import { persistStore, persistReducer } from "redux-persist"; 
import storage from "redux-persist/lib/storage";
import { thunk } from "redux-thunk";
/**
 * Every store in order for it to work needs reducers
 * These reducers are what allow us to actually form the state object
 * So, also we need our root-reducer, it is the combination of all our reducers. it is kind of one big reducer
 * 
 */

/**
 * Takes three arguments, the first one is really the only one necessary (rootReducer)
 * This store is just in order to facilitate the movement and passing of actions thorugh these reducers
 * 
 * The third one is the logger. The logger is something that allows us to see what the state looks like before an action is dispatched
 *and how the state in turn looks after the action, but to do that we need to create a middleware
 */


/**
 * This middleware is going to run before an action hits the reducers.
 * 
 * Whenever you dispatch an action, before that actions hits the reducers, it hit the middleare first
 * we only run the looger middleware if we are on development
 */
const middlewares = [process.env.NODE_ENV === 'development' && logger, thunk].filter(Boolean);
/**compose is a functional programming concept.It is essentially a way for us to pass multiply functions left to right
 * compose: Chains together functions (like middleware or enhancers) into a single function. This helps in composing multiple 
 * functionalities in a specific order during the Redux store creation 7
 * 
 * 
 * 
*/
const compedEnhancers = compose(applyMiddleware(...middlewares))

/**
 * Configuration object that tell redux persist what we want
 * This specifies the key used in storage (usually localStorage or AsyncStorage) to save the persisted state.
 * In this example, 'root' is the key, meaning all the persisted state will be stored under this key.
 * 
 * This defines the storage engine to use. In this case, storage from redux-persist/lib/storage is used, which defaults to localStorage in a web environment.
 * 
 * 
 * blacklist This is an array of reducer names whose state you do not want to persist.
 */

const persistConfig = {
    key:'root',
    storage: storage,
    whitelist: ['cart']
}
/**
 * The persistReducer function combines the persist configuration and the root reducer to create a persisted version of the root reducer
 */
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer, undefined, compedEnhancers)

/**
 * When your application starts, the persistor created by persistStore() will load the saved state from the storage and rehydrate 
 * the Redux store. This ensures that your app starts with the last known state, providing a seamless user experience across sessions.
 */
export const persistor = persistStore(store);

