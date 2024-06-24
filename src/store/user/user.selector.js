/**
 * state is the global state in redux, user is pointitn to user's reducer in (root-reducer.js) ans currentUser is the value initialized
 * in the user.reducer.js
 */
export const selectCurrentUser = (state) => state.user.currentUser;