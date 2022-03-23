import React from 'react';
import ProdList from '../../components/Products/ProductsList';
import { connect } from 'react-redux';
import { LoadingContent, Page } from '../../components/Utils/Page';
import { productsActions } from '../../store/actions';
import { navigate } from '../../lib/utils/navigation';


class ProductPage extends React.Component {
	constructor(props) {
		super(props);

		const { onActiveDesactiveUser } = this.props;

		this.state = {
			columns: [
				{
					name: 'Cod.',
					selector: 'cod',
					sortable: true,
					width: '10%',
				},
				{
					name: 'Nome',
					selector: 'name',
					sortable: true,
					width: '25%',
				},
				{
					name: 'Preço',
					selector: 'price_buy',
					sortable: true,
					width: '25%',
				},
				{
					name: 'Estoque',
					selector: 'stoq',
					sortable: true,
					width: '25%',
				},
				{
					name: 'Ações',
					selector: 'is_active',
					width: '15%',
					
				},
			],
		};
	}

	async componentDidMount() {
		const { onGetListProducts } = this.props;
		await onGetListProducts();
	}

	render() {
		const {
			loading,
			list
		} = this.props;

		console.log(list)
        const { columns } = this.state;
		return (
			<Page
				className="users"
				title="Produtos"
				breadcrumbs={[{ name: 'Produtos', active: true }]}>
				<LoadingContent loading={loading}>
					<ProdList 
                        data={list  || []}
                        columns={columns}
                        onSubmitFilter={() => alert('oi')}
                        loadingFilter={false}
						handleNavigation={page => navigate(page)}
                    />
				</LoadingContent>
			</Page>
		);
	}
}

const mapStateToProps = state => ({
	loading: state.api.loading,
	list: state.products.listProd
});

const mapDispatchToProps = dispatch => ({
	onGetListProducts: query => dispatch(productsActions.getProductList(query))
});
/*
ProductPage.propTypes = {
	onActiveDesactiveUser: PropTypes.func.isRequired,
	onClearQuery: PropTypes.func.isRequired,
	onGetListUsers: PropTypes.func.isRequired,
	companies: PropTypes.oneOfType([
		PropTypes.bool,
		PropTypes.arrayOf(PropTypes.object),
	]).isRequired,
	list: PropTypes.oneOfType([
		PropTypes.bool,
		PropTypes.arrayOf(PropTypes.object),
	]).isRequired,
	loading: PropTypes.bool.isRequired,
};
*/
export default connect(mapStateToProps, mapDispatchToProps)(ProductPage);
