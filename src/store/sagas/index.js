import { fork } from 'redux-saga/effects';
import watchUserAuthentication from '../ducks/auth/sagas';
import watchUsers from '../ducks/users/sagas';
import watchGroups from '../ducks/groups/sagas';
import watchEnterprise from '../ducks/enterprise/sagas';
import watchGenerics from '../ducks/generics/sagas';
import watchProducts from '../ducks/products/sagas';
import watchForn from '../ducks/fornecedores/sagas';
import watchBrands from '../ducks/brands/sagas';

export default function* startForman() {
	yield fork(watchUserAuthentication);
	yield fork(watchUsers);
	yield fork(watchGroups);
	yield fork(watchEnterprise);
	yield fork(watchGenerics);
	yield fork(watchProducts);
	yield fork(watchForn);
	yield fork(watchBrands);
}
