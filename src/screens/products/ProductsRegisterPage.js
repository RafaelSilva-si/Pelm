import React from 'react';
import { connect } from 'react-redux';
import Form from '../../components/User/UserRegisterForm';
import { navigateBack } from '../../lib/utils/navigation';
import {
	productsActions
} from '../../store/actions';
import R from '../../lib/constants/R';
import { LoadingContent, Page } from '../../components/Utils/Page';
import FormProd from '../../components/Products/ProductsRegisterForm';

class ProductsRegisterPage extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			id: false,
		};

		/*this.onSubmit = this.onSubmit.bind(this);*/
	}

	async componentDidMount() {
		
	}

	onSubmit = data => {
		
	};

	render() {
		const { id } = this.state;

		const {
			addProduct
		} = this.props;

		return (
			<Page
				className="user-register"
				title={id ? 'Editar' : 'Adicionar'}
				parentBreadcrumbs="Produtos"
				pathParent="/produtos"
				breadcrumbs={[
					{
						name: id ? 'Editar produto' : 'Adicionar produto',
						active: true,
					},
				]}>
				<LoadingContent loading={false}>
					<FormProd 
						onSubmit={data => addProduct(data)}
					/>
				</LoadingContent>
			</Page>
		);
	}
}

const mapStateToProps = state => {
	
};

const mapDispatchToProps = dispatch => ({
	addProduct: product => dispatch(productsActions.addProducts(product))
});

/*
UserRegisterPage.propTypes = {
	onAddNotification: PropTypes.func.isRequired,
	onAddUser: PropTypes.func.isRequired,
	onEditUser: PropTypes.func.isRequired,
	onGetGroups: PropTypes.func.isRequired,
	onGetRepresentatives: PropTypes.func.isRequired,
	onGetUser: PropTypes.func.isRequired,
	companies: PropTypes.oneOfType([
		PropTypes.bool,
		PropTypes.arrayOf(PropTypes.object),
	]).isRequired,
	groups: PropTypes.oneOfType([
		PropTypes.bool,
		PropTypes.arrayOf(PropTypes.object),
	]).isRequired,
	representatives: PropTypes.oneOfType([
		PropTypes.bool,
		PropTypes.arrayOf(PropTypes.object),
	]).isRequired,
	loading: PropTypes.bool.isRequired,
	match: PropTypes.shape({
		params: PropTypes.shape({ id: PropTypes.string }),
	}).isRequired,
	user: PropTypes.oneOfType([PropTypes.bool, PropTypes.shape({})]).isRequired,
};
*/

export default connect(mapStateToProps, mapDispatchToProps)(ProductsRegisterPage);
