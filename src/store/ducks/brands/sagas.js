import { call, put, select, takeLatest } from 'redux-saga/effects';
import { notificationActions } from '../notification';
import * as actions from './actions';
import * as selectors from './selectors';
import { apiActions, apiSelectors } from '../api';
import * as types from './types';
import { navigate } from '../../../lib/utils/navigation';
import * as brandsApi from '../../../api/appApi/brands';



export function* getBrands(payload){
    const refresh = yield select(selectors.getRefresh);

    
    if(!refresh){
        yield put(apiActions.apiStart())
    }

    try {
        const response = yield call(brandsApi.getBrands, payload.query)
        yield put(actions.onSetList(response.data.data))
    } catch (error) {
        yield put(
            notificationActions.addNotification(
                'Erro ao buscar marcas.',
                'error'
            ),
        );
    };

    yield put(apiActions.apiEnd());
	yield put(actions.setRefresh(false));
};

export function* insertBrand(payload){
    yield put(apiActions.apiSubmitStart());

    const {brands} = payload;
    try {
        const response = yield call(brandsApi.insertBrand, brands);
        if(response.status){
            yield put(
                notificationActions.addNotification(
                    'Marca cadastrada com sucesso.',
                    'success'
                ),
            )
            setTimeout(() => {
                navigate('/brand')
            }, 1200);
        };
    } catch (error) {
        yield put(
            notificationActions.addNotification(
                'Erro ao cadastrar marca.',
                'error'
            ),
        );
    }

    yield put(apiActions.apiSubmitEnd())
};

export function* updateBrands(payload){
    yield put(apiActions.apiSubmitStart());

    const {brand, id} = payload;
    try {
        const response = yield call(brandsApi.updateBrand, id, brand);
        if(response.status){
            yield put(
                notificationActions.addNotification(
                    'Marca editado com sucesso',
                    'success'
                )
            );
            setTimeout(() => {
                navigate('/brand')
            }, 1200);
        }
    } catch (error) {
        yield put(
            notificationActions.addNotification(
                'Erro ao editar marca.',
                'error'
            )
        );
    };

    yield put(apiActions.apiSubmitEnd());
};

export function* activeOrDesactiveBrand(payload){
    const {brand} = payload;
    try {
        const data = {
            active: !brand.status
        };
        const response = yield call(brandsApi.updateStatusBrand, brand.id, data);
        if(response.status){

            yield put(actions.setRefresh(true));
			yield put(actions.onGetList());
        }
    } catch (error) {
        console.log(error)
        yield put(
			notificationActions.addNotification(
				'Erro ao mudar status da marca.',
				'error',
			),
		);
    };
};

export function* deleteBrand(payload){
	yield put(apiActions.apiStart());

    const { brand } = payload;

    try {
        const response = yield call(brandsApi.deleteBrand, brand);
        if (response.status) {
			yield put(
				notificationActions.addNotification(
					'Marca deletada com sucesso!',
					'success',
				),
			);
			yield put(apiActions.toogleModal());
			yield put(actions.onGetList());
		}
    } catch (error) {
        yield put(
			notificationActions.addNotification(
				'Erro ao deletar marca.',
				'error',
			),
		);
    };
    yield put(apiActions.apiEnd());
};

export default function* watchBrands(){
    yield takeLatest(types.GET_BRANDS, getBrands);
    yield takeLatest(types.ADD_BRAND, insertBrand);
    yield takeLatest(types.UPDATE_BRAND, updateBrands);
    yield takeLatest(types.UPDATE_STATUS, activeOrDesactiveBrand);
    yield takeLatest(types.DELETE_BRAND, deleteBrand);
}