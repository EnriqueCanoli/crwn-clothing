/**
 * Store object to use in our React application, we dont need more use context
 */

import { compose, applyMiddleware, createStore } from "redux";
import logger from "redux-logger";
import { rootReducer } from "./root-reducer";

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
 */
const middlewares = [logger]
/**compose is a functional programming concept.It is essentially a way for us to pass multiply functions left to right
 * compose: Chains together functions (like middleware or enhancers) into a single function. This helps in composing multiple 
 * functionalities in a specific order during the Redux store creation 7
 * 
 * 
 * 
*/
const compedEnhancers = compose(applyMiddleware(...middlewares))

export const store = createStore(rootReducer, undefined, compedEnhancers)

