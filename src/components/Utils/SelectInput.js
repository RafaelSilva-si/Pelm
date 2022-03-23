import React from 'react';
import ReactSelect from 'react-select';
import R from '../../lib/constants/R';
import PropTypes from '../../lib/utils/propTypes';
import {
	Input,
	InputGroup,
	InputGroupAddon,
} from 'reactstrap';

export const Select = ({ options, fieldName, fieldValue, ...rest }) => (
	<div>
		<InputGroup>
			<InputGroupAddon>
				<ReactSelect
					options={options}
					noOptionsMessage={() => 'Sem opções'}
					getOptionLabel={option => option[fieldName]}
					getOptionValue={option => option[fieldValue]}
					styles={{
						width: '300',
						control: (base, state) => ({
							width: 100,
							...base,
							'&:hover': { borderColor: 'none' },
							border: state.isFocused
								? `1px solid ${R.colors.colorPrimary}`
								: '1px solid lightgray',
							boxShadow: state.isFocused
								? `0px 0px 5px${R.colors.colorPrimary}`
								: 0,
						}),
					}}
					{...rest}
				/>
			</InputGroupAddon>
			<Input />

		</InputGroup>

	</div>
);

Select.propTypes = {
	options: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
	fieldName: PropTypes.string,
	fieldValue: PropTypes.string,
};

Select.defaultProps = {
	options: [],
	fieldName: 'name',
	fieldValue: 'id',
};

export default Select;
