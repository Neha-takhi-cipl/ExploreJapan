import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  articleRequest: ['lang', 'rpp', 'page', 'title'],
  articleSuccess: ['list'],
  articleFailure: ['error'],
  isHeaderShowBool: ['isHeaderShowBoolean']
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
export const request = (state) => state.merge({ fetching: true })

// we've successfully logged in
export const success = (state, {list} ) => {
  return state.merge({ fetching: false, error: null , articleList: list})
}

// we've had a problem logging in
export const failure = (state, { error }) =>
  state.merge({ fetching: false, error })

export const updatingShowHeader = (state,{isHeaderShowBoolean}) => state.merge({ isHeaderShow: isHeaderShowBoolean })
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
