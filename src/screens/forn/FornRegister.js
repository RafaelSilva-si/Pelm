import React from 'react';
import { connect } from 'react-redux';
import {
	fornActions
} from '../../store/actions';
import { LoadingContent, Page } from '../../components/Utils/Page';
import FornForm from '../../components/Forn/FornRegisterForm';

class FornRegisterPage extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			id: false,
		};

		/*this.onSubmit = this.onSubmit.bind(this);*/
	}

	async componentDidMount() {
		const {
			match,
			onGetForn,
		} = this.props;

		const { id } = match.params;

		this.setState({
			id,
		});

		if (id) {
			await onGetForn(id);
		}

	}

	onSubmit = data => {
		const { id } = this.state;
		const { onEditForn, addForn} = this.props;

		if (id) {
			onEditForn(data, id);
		} else {
			addForn(data)
		}
	};

	render() {
		const { id } = this.state;

		const {
			addForn,
			forn,
			loading
		} = this.props;

		return (
			<Page
				className="user-register"
				title={id ? 'Editar' : 'Adicionar'}
				parentBreadcrumbs="Fornecedores"
				pathParent="/fornecedores"
				breadcrumbs={[
					{
						name: id ? 'Editar fornecedor' : 'Adicionar fornecedor',
						active: true,
					},
				]}>
				<LoadingContent loading={id? !forn : loading}>
					<FornForm
						forn={forn[0]}
						onSubmit={data => this.onSubmit(data)}
					/>
				</LoadingContent>
			</Page>
		);
	}
}

const mapStateToProps = state => ({
	loading: state.api.loading,
	forn: state.forn.list
});

const mapDispatchToProps = dispatch => ({
	addForn: data => dispatch(fornActions.addForn(data)),
	onGetForn: data => dispatch(fornActions.getForn(data)),
	onEditForn: (data, id) => dispatch(fornActions.updateForn(data, id))
});


export default connect(mapStateToProps, mapDispatchToProps)(FornRegisterPage);
