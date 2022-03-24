import React from 'react';
import { connect } from 'react-redux';
import {
	productsActions,
	brandsActions,
	fornActions
} from '../../store/actions';
import { LoadingContent, Page } from '../../components/Utils/Page';
import FormProd from '../../components/Products/ProductsRegisterForm';

class ProductsRegisterPage extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			id: false,
		};
	}

	async componentDidMount() {
		const { match, onGetBrand, onGetForn, onGetListProducts } = this.props;

		const { id } = match.params;

		this.setState({
			id,
		});

		if (id) {
			await onGetListProducts({id: id});
		}
		
		await onGetForn({status: true})
		await onGetBrand({ status: true })
	}

	onSubmit = data => {
		const { id } = this.state;
		const { onEdit, addProduct} = this.props;

		if (id) {
			onEdit(data, id);
		} else {
			addProduct(data)
		}
	};

	render() {
		const { id } = this.state;

		const {
			addProduct,
			brands,
			prod,
			forn,
			loading
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
				<LoadingContent loading={id? !prod : loading}>
					<FormProd
						prod={prod[0]}
						forn={forn}
						brands={brands}
						onSubmit={data => this.onSubmit(data)}
					/>
				</LoadingContent>
			</Page>
		);
	}
}

const mapStateToProps = state => ({
	loading: state.api.loading,
	brands: state.brand.list,
	forn: state.forn.list,
	prod: state.products.listProd,
});

const mapDispatchToProps = dispatch => ({
	onGetListProducts: query => dispatch(productsActions.getProductList(query)),
	addProduct: product => dispatch(productsActions.addProducts(product)),
	onGetBrand: query => dispatch(brandsActions.onGetList(query)),
	onGetForn: query => dispatch(fornActions.getForn(query)),
	onEdit: (data, id) => dispatch(productsActions.onEdit(data, id))
});



export default connect(mapStateToProps, mapDispatchToProps)(ProductsRegisterPage);
