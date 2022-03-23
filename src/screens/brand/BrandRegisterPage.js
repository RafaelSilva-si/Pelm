import React from 'react';
import { connect } from 'react-redux';
import {
    brandsActions,
	fornActions
} from '../../store/actions';
import { LoadingContent, Page } from '../../components/Utils/Page';
import BrandForm from '../../components/brand/BrandRegisterForm';

class BrandRegisterPage extends React.Component {
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
            onGetBrand,
		} = this.props;

		const { id } = match.params;

		this.setState({
			id,
		});

		if (id) {
			await onGetBrand({id: id});
		}
		
        await onGetForn(undefined, true);

	}

	onSubmit = data => {
		const { id } = this.state;
		const { onEditBrand, onAddBrand} = this.props;

		if (id) {
			onEditBrand(data, id);
		} else {
			onAddBrand(data)
		}
	};

	render() {
		const { id } = this.state;

		const {
			forn,
            brands,
			loading
		} = this.props;

		return (
			<Page
				className="user-register"
				title={id ? 'Editar' : 'Adicionar'}
				parentBreadcrumbs="Marcas"
				pathParent="/Marcas"
				breadcrumbs={[
					{
						name: id ? 'Editar Marca' : 'Adicionar marca',
						active: true,
					},
				]}>
				<LoadingContent loading={id ? !brands :  loading}>
					<BrandForm
                        brand={brands[0]}
						forn={forn}
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
	forn: state.forn.list
});

const mapDispatchToProps = dispatch => ({
    onGetBrand: data => dispatch(brandsActions.onGetList(data)),
	onGetForn: (id, status) => dispatch(fornActions.getForn(id, status)),
    onAddBrand: data => dispatch(brandsActions.onAddBrands(data)),
    onEditBrand: (data, id) => dispatch(brandsActions.onEdit(data, id))
});


export default connect(mapStateToProps, mapDispatchToProps)(BrandRegisterPage);
