import React from 'react';
import bn from '../../lib/utils/bemnames';
import { MdPets } from 'react-icons/md';

const bem = bn.create('sidebar');
const Logo = () => (
    <div className={bem.e('logo')}>
        <MdPets /><span style={{marginLeft: '6px'}}>Pelm</span>
    </div>
)



export default Logo;
