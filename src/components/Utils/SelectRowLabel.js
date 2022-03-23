import React from 'react';
import { Col, FormGroup, Label } from 'reactstrap';
import SelectComp from './Select';
import PropTypes from '../../lib/utils/propTypes';

const SelectRowLabel = ({ label, labelProps, ...selectProps }) => (	
		<Col sm={12}>
			<SelectComp {...selectProps} />
		</Col>
);

SelectRowLabel.propTypes = {
	label: PropTypes.string.isRequired,
	labelProps: PropTypes.shape({}),
};

SelectRowLabel.defaultProps = {
	labelProps: {},
};

export default SelectRowLabel;
