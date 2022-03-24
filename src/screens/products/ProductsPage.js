import React from 'react';
import ProdList from '../../components/Products/ProductsList';
import { connect } from 'react-redux';
import { LoadingContent, Page } from '../../components/Utils/Page';
import { productsActions } from '../../store/actions';
import { navigate } from '../../lib/utils/navigation';
import ActiveDeleteEdit from '../../components/Utils/TablesRow/ActiveDeleteEdit';
import { ModalDelete } from '../../components/Utils/Modal';


class ProductPage extends React.Component {
	constructor(props) {
		super(props);

		const { onChangeStatus, onSelect } = this.props;

		this.state = {
			columns: [
				{
					name: 'Cod.',
					selector: 'cod',
					sortable: true,
					width: '10%',
				},
				{
					name: 'Descrição',
					selector: 'descr',
					sortable: true,
					width: '25%',
				},
				{
					name: 'Preço',
					selector: 'price_sale',
					sortable: true,
					width: '25%',
				},
				{
					name: 'Grupo',
					selector: 'grupo',
					sortable: true,
					width: '25%',
				},
				{
					name: 'Ações',
					selector: 'is_active',
					width: '15%',
					cell: row => (
						<ActiveDeleteEdit
							row={row}
							route="products"
							onSelect={brand => onSelect(brand)}
							changeValue={brand => onChangeStatus(brand)}
						/>
					),
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
			list,
			select,
			onDelete
		} = this.props;

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
				<ModalDelete
					name={select ? select.id : ''}
					onSubmit={() => onDelete(select.id)}
				/>
			</Page>
		);
	}
}

const mapStateToProps = state => ({
	loading: state.api.loading,
	list: state.products.listProd,
	select: state.products.select
});

const mapDispatchToProps = dispatch => ({
	onGetListProducts: query => dispatch(productsActions.getProductList(query)),
	onChangeStatus: query => dispatch(productsActions.onUpdateStatus(query)),
	onSelect: query => dispatch(productsActions.select(query)),
	onDelete: query => dispatch(productsActions.onDelete(query))
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductPage);
