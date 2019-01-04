import { put, call } from 'redux-saga/effects'
import ArticleActions from '../Redux/ArticleRedux'

// attempts to login
export function * getArticles (api,action) {
  console.log("Action",action,api)
   const {lang, rpp, page, title} = action
  let reponse = {}
  response =  yield call(api.getArticles,{lang, rpp, page, title}, 10)

  if(!response.status){
    yield put(ArticleActions.articleFailure('No Network'));
  }
  else {
    // dispatch successful article list
    let articleList = response.data;
     yield put(ArticleActions.articleSuccess(articleList))
  }
}
