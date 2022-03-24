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
		const response = yield call(productsApi.getProducts, payload.query);
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

export function* updateProducts(payload){
	yield put(apiActions.apiSubmitStart());

	const {id, product} = payload;
	
	try {
		const response = yield call(productsApi.putProducts, id, product);
		if(response.status){
            yield put(
                notificationActions.addNotification(
                    'Produto editado com sucesso',
                    'success'
                )
            );
            setTimeout(() => {
                navigate('/products')
            }, 1200);
		}
	} catch (error) {
		yield put(
            notificationActions.addNotification(
                'Erro ao editar produto.',
                'error'
            )
        );
	}

	yield put(apiActions.apiSubmitEnd());
};

export function* activeOrDesactiveProduct(payload){
	const { product } = payload;

	try {
		const data = {
			active: !product.status
		};
		const response = yield call(productsApi.updateStatus, product.id, data);
		if(response.status){

            yield put(actions.setRefresh(true));
			yield put(actions.getProductList());
        }
	} catch (error) {
		yield put(
			notificationActions.addNotification(
				'Erro ao mudar status do produto.',
				'error',
			),
		);
	};
};

export function* deleteProduct(payload){
	yield put(apiActions.apiStart());

    const { product } = payload;

	try {
		const response = yield call(productsApi.deleteProducts, product);
		if (response.status) {
			yield put(
				notificationActions.addNotification(
					'Produto deletado com sucesso!',
					'success',
				),
			);
			yield put(apiActions.toogleModal());
			yield put(actions.getProductList());
		}
	} catch (error) {
		yield put(
			notificationActions.addNotification(
				'Erro ao deletar produto.',
				'error',
			),
		);
	}
	yield put(apiActions.apiEnd());
}

export default function* watchProducts(){
    yield takeLatest(types.GET_PRODUCTS, getProductList);
	yield takeLatest(types.ADD_PRODUCTS, addProduct);
	yield takeLatest(types.EDIT_PRODUCT, updateProducts);
	yield takeLatest(types.UPDATE_STATUS, activeOrDesactiveProduct);
	yield takeLatest(types.DELETE_PRODUCTS, deleteProduct);
	
}