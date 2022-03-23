import React from 'react';
import { FormGroup, Input, Label } from 'reactstrap';
import bn from '../../lib/utils/bemnames';

const bem = bn.create('inputForm');

const InputForm = ({ label, labelProps, ...inputProps }) => (
	<div className={bem.b()}>

		<div class="group">
			<Input type="text"  className='input' required {...inputProps} />
			<span class ="highlight"></span>
			<span class ="bar"></span>
			<label>{label}</label>
		</div>

	</div>
);




export default InputForm;
