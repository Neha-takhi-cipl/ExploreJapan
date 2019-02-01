import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  articleRequest: ['lang', 'rpp', 'page', 'title'],
  articleSuccess: ['list'],
  articleFailure: ['error'],
  isHeaderShowBool: ['val']
  })

export const ArticleTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  articleList: [],
  error: null,
  fetching: false,
 isHeaderShow: true
})

/* ------------- Reducers ------------- */

// we're attempting to login
export const request = (state) => {
  console.log("in reduceer 111111");
  return state.merge({ fetching: true })}

// we've successfully logged in
export const success = (state, {list} ) => {
  console.log("in reduceer 22222", state);
  return state.merge({ fetching: false, error: null , articleList: list})
}

// we've had a problem logging in
export const failure = (state, { error }) => {
  console.log("in reduceer 333333");
  return state.merge({ fetching: false, error})
}

export const updatingShowHeader = (state,{val}) => {
  console.log("in reducer", val);
  return state.merge({ isHeaderShow: val })
}
// we've logged out
// export const logout = (state) => INITIAL_STATE
console.log("TYpes are :", Types);
/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.ARTICLE_REQUEST]: request,
  [Types.ARTICLE_SUCCESS]: success,
  [Types.ARTICLE_FAILURE]: failure,
  [Types.IS_HEADER_SHOW_BOOL]: updatingShowHeader
})

/* ------------- Selectors ------------- */

// Is the current user logged in?
//export const isLoggedIn = (loginState) => loginState.username !== null
