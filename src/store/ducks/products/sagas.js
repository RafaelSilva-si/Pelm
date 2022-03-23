import { call, put, select, takeLatest } from 'redux-saga/effects';
import { notificationActions } from '../notification';
import * as actions from './actions';
import * as selectors from './selectors';
import { apiActions, apiSelectors } from '../api';
import * as types from './type';
import * as productsApi from '../../../api/appApi/products';
import { navigate } from '../../../lib/utils/navigation';

export function* getProductList(payload){
    const refresh = yield select(selectors.getRefresh);

	if (!refresh) {
		yield put(apiActions.apiStart());
	}

	try {
		const response = yield call(productsApi.getProducts);
		yield put(actions.setProductList(response.data.data));
	} catch (error) {
		yield put(
			notificationActions.addNotification(
				'Erro ao buscar produtos.',
				'error',
			),
		);
	}

	yield put(apiActions.apiEnd());
	yield put(actions.setRefresh(false));
};

export function* addProduct(payload){
	yield put(apiActions.apiSubmitStart());

	const data = payload.product;
	console.log(data)
	try {
		const response = yield call(productsApi.newProducts, data);
		if (response.status) {
			yield put(
				notificationActions.addNotification(
					'Produto cadastrado com sucesso!',
					'success',
				),
			);
			setTimeout(() => {
				navigate('/products');
			}, 1200);
		}
	} catch (error) {
		yield put(
			notificationActions.addNotification(
				'Erro ao cadastrar Produto.',
				'error',
			),
		);
	}

	yield put(apiActions.apiSubmitEnd());
}

export default function* watchProducts(){
    yield takeLatest(types.GET_PRODUCTS, getProductList);
	yield takeLatest(types.ADD_PRODUCTS, addProduct);
}