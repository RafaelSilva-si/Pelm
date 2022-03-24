import PropTypes from 'prop-types';
import React from 'react';
import { Fab } from 'react-tiny-fab';
import { MdAdd } from 'react-icons/md';
import Filter from './Filter';
import DataTable from '../../Utils/DataTable';
import R from '../../../lib/constants/R';

class UserList extends React.Component {
	constructor(props) {
		super(props);

		this.state = { resetPaginationToggle: false };
	}

	render() {
		const {
			data,
			columns,
			handleNavigation,
			onSubmitFilter,
			cleanFilter,
			loadingFilter,
			companies,
		} = this.props;

		const { resetPaginationToggle } = this.state;

		return (
			<div>
				Filtro Desativado
				{/*
				<Filter
					onSubmit={values => {
						onSubmitFilter(values);
						this.setState({
							resetPaginationToggle: !resetPaginationToggle,
						});
					}}
				/>*/}
				<DataTable
					loading={loadingFilter}
					columns={columns}
					data={data}
					paginationResetDefaultPage={resetPaginationToggle}
					pagination={data.length > 10}
				/>
				<Fab
					mainButtonStyles={{
						backgroundColor: '#5686E1',
					}}
					position={{ bottom: 15, right: 0 }}
					event="click"
					icon={<MdAdd />}
					onClick={() => handleNavigation('/products/add')}
					text="Adicionar Produto"
				/>
			</div>
		);
	}
}

UserList.propTypes = {
	handleNavigation: PropTypes.func.isRequired,
	data: PropTypes.arrayOf(PropTypes.object).isRequired,
	columns: PropTypes.arrayOf(PropTypes.object).isRequired,
	onSubmitFilter: PropTypes.func.isRequired,
	cleanFilter: PropTypes.func.isRequired,
	companies: PropTypes.arrayOf(PropTypes.object).isRequired,
	loadingFilter: PropTypes.bool.isRequired,
};

UserList.defaultProps = {};

export default UserList;
