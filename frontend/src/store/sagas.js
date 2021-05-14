/**
 *  Redux saga class init
 * Import every feature saga here
 *
 */
import { all } from 'redux-saga/effects';

export default function* rootSaga() {
  yield all();
}
