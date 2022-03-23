import React from 'react';
import FornList from '../../components/Forn/FornList';
import { connect } from 'react-redux';
import { LoadingContent, Page } from '../../components/Utils/Page';
import { fornActions } from '../../store/actions';
import { navigate } from '../../lib/utils/navigation';
import ActiveDeleteEdit from '../../components/Utils/TablesRow/ActiveDeleteEdit';
import { ModalDelete } from '../../components/Utils/Modal';


class fornPage extends React.Component {
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
					selector: 'forn',
					sortable: true,
					width: '25%',
				},
				{
					name: 'Endereço',
					selector: 'endereco',
					sortable: true,
					width: '25%',
				},
				{
					name: 'Representante',
					selector: 'representante',
					sortable: true,
					width: '25%',
				},
				{
					name: 'Ações',
					selector: 'status',
					width: '15%',
					cell: row => (
						<ActiveDeleteEdit
							row={row}
							route="forn"
							handleNavigation={page => navigate(page)}
							//handlePermissions={value =>
							//	handleNavigationPermission(value)
							//}
							onSelect={forn => onSelect(forn)}
							changeValue={forn => onChangeStatus(forn)}
						/>
					),
				},
			],
		};
	}

	async componentDidMount() {
		const { onGetListForn } = this.props;
		await onGetListForn();
	}

	render() {
		const {
			loading,
			list,
			select,
			onDelete,
			onGetListForn
		} = this.props;

        const { columns } = this.state;
		return (
			<Page
				className="users"
				title="Fornecedores"
				breadcrumbs={[{ name: 'Fornecedores', active: true }]}>
				<LoadingContent loading={!list}>
					<FornList 
                        data={list  || []}
                        columns={columns}
                        onSubmitFilter={data => onGetListForn(data)}
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
	list: state.forn.list,
	select: state.forn.select
});

const mapDispatchToProps = dispatch => ({
	onGetListForn: data => dispatch(fornActions.getForn(data)),
	onChangeStatus: data => dispatch(fornActions.updateStatus(data)),
	onSelect: data => dispatch(fornActions.select(data)),
	onDelete: data => dispatch(fornActions.deleteForn(data))
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
export default connect(mapStateToProps, mapDispatchToProps)(fornPage);
