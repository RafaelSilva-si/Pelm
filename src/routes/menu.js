import { MdBuild, MdDashboard, MdApps, MdDeliveryDining, MdPointOfSale, MdListAlt, MdOutlineBrandingWatermark } from 'react-icons/md';
import { FaUserAlt } from 'react-icons/fa';

export const navItems = [
	{
		to: '/',
		name: 'Dashboard',
		exact: true,
		Icon: MdDashboard,
	},
];

export const navAux = [
	{
		to: '/usuarios',
		name: 'Clientes',
		exact: false,
		IconSub: FaUserAlt,
		id: 138,
	},
	{
		to: '/products',
		name: 'Produtos',
		exact: false,
		IconSub: MdListAlt,
		id: 145,
	},
	{
		to: '/forn',
		name: 'Fornecedores',
		exact: false,
		IconSub: FaUserAlt,
		id: 144,
	},
	{
		to: '/brand',
		name: 'Marcas',
		exact: false,
		IconSub: MdOutlineBrandingWatermark,
		id: 146
	}
	
];

export const navAplic = [
	
	{
		to: '/sales',
		name: 'Vendas',
		exact: false,
		IconSub: MdPointOfSale,
		id: 141,
	},
	{
		to: '/delivery',
		name: 'Pedidos',
		exact: false,
		IconSub: MdDeliveryDining,
		id: 141,
	},
];

export const routes = [
	{
		name: 'Aplicações',
		icon: MdApps,
		submodules: navAplic,
	},
	{
		name: 'Auxiliares',
		icon: MdBuild,
		submodules: navAux,
	},
	
	
];
