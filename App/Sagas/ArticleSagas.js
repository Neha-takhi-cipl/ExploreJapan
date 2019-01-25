import { put, call } from 'redux-saga/effects'
import ArticleActions from '../Redux/ArticleRedux'

// attempts to login
export function * getArticles (api,action) {
  console.log("Action",action,api)
   const {lang, rpp, page, title} = action
  let response = {}
  response =  yield call(api.getArticles,{lang, rpp, page, title}, 10)
  console.log("response is",response)
  if(!response.status){
    console.log("in redux: failure",articleList)
    yield put(ArticleActions.articleFailure('No Network'));
  }
  else {
    // dispatch successful article list
    let articleList = response.data;
    console.log("in redux",articleList)
     yield put(ArticleActions.articleSuccess(articleList))
  }
}
