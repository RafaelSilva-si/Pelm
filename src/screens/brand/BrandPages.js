import React from 'react';
import FornList from '../../components/Forn/FornList';
import { connect } from 'react-redux';
import { LoadingContent, Page } from '../../components/Utils/Page';
import { brandsActions, fornActions } from '../../store/actions';
import ActiveDeleteEdit from '../../components/Utils/TablesRow/ActiveDeleteEdit';
import { ModalDelete } from '../../components/Utils/Modal';
import BrandList from '../../components/brand/BrandList';
import { navigate } from '../../lib/utils/navigation';

class BrandPage extends React.Component {
	constructor(props) {
		super(props);

		const { onChangeStatus, onSelect } = this.props;

		this.state = {
			columns: [
				{
					name: 'Id',
					selector: 'id',
					sortable: true,
					width: '10%',
				},
				{
					name: 'Nome',
					selector: 'name',
					sortable: true,
					width: '35%',
				},
				{
					name: 'Fornecedor',
					selector: 'fornname',
					sortable: true,
					width: '40%',
				},
				{
					name: 'Ações',
					selector: 'status',
					width: '15%',
					cell: row => (
						<ActiveDeleteEdit
							row={row}
							route="brands"
							onSelect={brand => onSelect(brand)}
							changeValue={brand => onChangeStatus(brand)}
						/>
					),
				},
			],
		};
	}

	async componentDidMount() {
		const { onGetList, onGetForn } = this.props;
		await onGetForn();
		await onGetList();
	}

	render() {
		const {
			loading,
			list,
			select,
			onDelete,
			forn,
			onGetList
		} = this.props;

		const { columns } = this.state;
		return (
			<Page
				className="users"
				title="Marcas"
				breadcrumbs={[{ name: 'Marcas', active: true }]}>
				<LoadingContent loading={!forn}>
					<BrandList
						handleNavigation={page => navigate(page)}
						fornList={forn}
						data={list}
						columns={columns}
						onSubmitFilter={(data) => onGetList(data)}
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
	list: state.brand.list,
	select: state.brand.select,
	forn: state.forn.list
});

const mapDispatchToProps = dispatch => ({
	onGetList: query => dispatch(brandsActions.onGetList(query)),
	onChangeStatus: data => dispatch(brandsActions.onUpdateStatus(data)),
	onSelect: data => dispatch(brandsActions.select(data)),
	onDelete: data => dispatch(brandsActions.onDelete(data)),
	onGetForn: () => dispatch(fornActions.getForn())
});

export default connect(mapStateToProps, mapDispatchToProps)(BrandPage);
