import { call, put, select, takeLatest } from 'redux-saga/effects';
import { notificationActions } from '../notification';
import * as actions from './actions';
import * as selectors from './selectors';
import { apiActions, apiSelectors } from '../api';
import * as types from './types';
import * as fornApi from '../../../api/appApi/forn';
import { navigate } from '../../../lib/utils/navigation';

export function* getFornList(payload) {
	const refresh = yield select(selectors.getRefresh);

	
	if (!refresh) {
		yield put(apiActions.apiStart());
	}

	try {
		const response = yield call(fornApi.getForn, payload.data)
		
		yield put(actions.setForn(response.data.data));
	} catch (error) {
		console.log(error)
		yield put(
			notificationActions.addNotification(
				'Erro ao buscar fornecedores.',
				'error',
			),
		);
	}

	yield put(apiActions.apiEnd());
	yield put(actions.setRefresh(false));
};

export function* addForn(payload) {
	yield put(apiActions.apiSubmitStart());

	const data = payload.forn;
	try {
		console.log(data)
		const response = yield call(fornApi.addForn, data);
		if (response.status) {
			yield put(
				notificationActions.addNotification(
					'Fornecedores cadastrado com sucesso!',
					'success',
				),
			);
			setTimeout(() => {
				navigate('/forn');
			}, 1200);
		}
	} catch (error) {
		yield put(
			notificationActions.addNotification(
				'Erro ao cadastrar Fornecedores.',
				'error',
			),
		);
	}

	yield put(apiActions.apiSubmitEnd());
}

export function* activeDesactiveForn(payload) {
	const { forn } = payload;
	try {
		const data = {
			active: !forn.status,
		};

		const response = yield call(fornApi.updateStatus, forn.id, data);

		if (response) {

			yield put(actions.setRefresh(true));

			yield put(actions.getForn());
		}
	} catch (error) {
		yield put(
			notificationActions.addNotification(
				'Erro ao mudar status do fornecedor.',
				'error',
			),
		);
	}
}

export function* deleteForn(payload) {
	yield put(apiActions.apiStart());

	const id = payload.forn;

	try {
		const response = yield call(fornApi.deleteForn, id);

		if (response.status) {
			yield put(
				notificationActions.addNotification(
					'Fornecedor deletado com sucesso!',
					'success',
				),
			);
			yield put(apiActions.toogleModal());
			const query = yield select(apiSelectors.getQuery);
			yield put(actions.getForn());
		}
	} catch (error) {
		yield put(
			notificationActions.addNotification(
				'Fornecedor ao deletar grupo.',
				'error',
			),
		);
	}

	yield put(apiActions.apiEnd());
}

export function* updateForn(payload) {
	yield put(apiActions.apiStart());

	const { forn } = payload

	try {
		const response = yield call(fornApi.updateForn, forn, payload.id);
		if (response) {
			yield put(
				notificationActions.addNotification(
					'Fornecedor editado com sucesso.',
					'success'
				),
			);
			setTimeout(() => {
				navigate('/forn');
			}, 1200);
		}
	} catch (error) {
		yield put(
			notificationActions.addNotification(
				'Erro ao editar Fornecedor.',
				'error'
			),
		);
	}

	yield put(apiActions.apiEnd());
}

export default function* watchForn() {
	yield takeLatest(types.GET_FORN, getFornList);
	yield takeLatest(types.ADD_FORN, addForn);
	yield takeLatest(types.SET_STATUS, activeDesactiveForn);
	yield takeLatest(types.DELETE_FORN, deleteForn);
	yield takeLatest(types.UPDATE_FORN, updateForn)
}