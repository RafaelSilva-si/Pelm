import React, { useState } from 'react';
import { Col, Row } from 'reactstrap';
import { useForm } from 'react-hook-form';
import { InputLabel, SelectLabel } from '../../../Utils';
import { ButtonsFilter, CollapseFilter } from '../../../Utils/Filter';
import { removeEmpty } from '../../../../lib/utils/functions';
import PropTypes from '../../../../lib/utils/propTypes';

const FilterProd = ({
	onSubmit,
	prodLabel,
	prodInputProps,
	codLabel,
	codInputProps,
	companyLabel,
	companyInputProps,
	...restProps
}) => {
	const { register, handleSubmit, setValue } = useForm({
		defaultValues: { active: 'true' },
	});

	const [value, setReactSelectValue] = useState({ selectedOption: [] });

	const onSubmitForm = data => {
		let values = data;
		values = removeEmpty(values);
		onSubmit(values);
	};

	const handleChange = selectedOption => {
		setValue('company', selectedOption.id);
		setReactSelectValue({ selectedOption });
	};


	React.useEffect(() => {
		register({ name: 'company' });
		register({ name: 'active' });
	}, [register]);

	

	return (
		<div {...restProps} className="mb-3">
			<CollapseFilter open>
				<form onSubmit={handleSubmit(onSubmitForm)}>
					<Row>
						<Col xl={4} lg={12} md={12}>
							<InputLabel
								label={prodLabel}
								{...prodInputProps}
								innerRef={register}
							/>
						</Col>
						<Col xl={4} lg={12} md={12}>
							<InputLabel
								label={codLabel}
								{...codInputProps}
								innerRef={register}
							/>
						</Col>
						<Col xl={4} lg={12} md={12}>
							<SelectLabel
								label={companyLabel}
								{...companyInputProps}
								options={[]}
								onChange={handleChange}
								value={value.selectedOption}
							/>
						</Col>
					</Row>
					<ButtonsFilter  />
				</form>
			</CollapseFilter>
		</div>
	);
};

FilterProd.propTypes = {
	prodLabel: PropTypes.string,
	prodInputProps: PropTypes.shape({}),
	codLabel: PropTypes.string,
	codInputProps: PropTypes.shape({}),
	companyLabel: PropTypes.string,
	companyInputProps: PropTypes.shape({}),
	onSubmit: PropTypes.func.isRequired,
	companies: PropTypes.arrayOf(PropTypes.object).isRequired,
};

FilterProd.defaultProps = {
	prodLabel: 'Produto',
	prodInputProps: {
		name: 'prod',
		id: 'prod',
		placeholder: 'Produto...',
	},
	codLabel: 'Código',
	codInputProps: {
		name: 'cod',
		id: 'cod',
		placeholder: 'Código...',
	},
	companyLabel: 'Fornecedor',
	companyInputProps: {
		name: 'company',
		id: 'company',
		placeholder: 'selecione o fornecedor...',
	},
};

export default FilterProd;
