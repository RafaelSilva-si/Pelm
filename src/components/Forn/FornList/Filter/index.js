import React, { useState } from 'react';
import { Col, Row } from 'reactstrap';
import { useForm } from 'react-hook-form';
import { InputLabel, SelectLabel } from '../../../Utils';
import { ButtonsFilter, CollapseFilter } from '../../../Utils/Filter';
import { removeEmpty, formatCnpjCpf } from '../../../../lib/utils/functions';
import PropTypes from '../../../../lib/utils/propTypes';

const FilterForn = ({
	onSubmit,
	fornLabel,
	fornInputProps,
	docLabel,
	docInputProps,
	...restProps
}) => {
	const { register, handleSubmit, setValue } = useForm({});


	const onSubmitForm = data => {
		let values = data;
		values = removeEmpty(values);
		onSubmit(values);
	};

	const [document, setDocument] = useState();
    const handleDocument = (vlr) => {
        let value = formatCnpjCpf(vlr.target.value);
        setDocument(value);
    }

	React.useEffect(() => {
    }, [register]);

	return (
		<div {...restProps} className="mb-3">
			<CollapseFilter open>
				<form onSubmit={handleSubmit(onSubmitForm)}>
					<Row>
						<Col xl={12} lg={12} md={12}>
							<InputLabel
								label={docLabel}
								value={document}
								onChange={handleDocument}
								{...docInputProps}
								innerRef={register}
							/>
						</Col>
					</Row>
					<ButtonsFilter  />
				</form>
			</CollapseFilter>
		</div>
	);
};

FilterForn.propTypes = {
	fornLabel: PropTypes.string,
	fornInputProps: PropTypes.shape({}),
	docLabel: PropTypes.string,
	docInputProps: PropTypes.shape({}),
	onSubmit: PropTypes.func.isRequired,
	companies: PropTypes.arrayOf(PropTypes.object).isRequired,
};

FilterForn.defaultProps = {
	docLabel: 'Documentos',
	docInputProps: {
		name: 'doc',
		id: 'doc',
		placeholder: 'Documentos...',
	},
};

export default FilterForn;
