import React from 'react';
import Authorize from './Authorize';

const DashboardPage = React.lazy(() =>
	import('screens/dashboard/DashboardPage'),
);
const ProfilePage = React.lazy(() => import('screens/profile/ProfilePage'));
const ChangePasswordPage = React.lazy(() =>
	import('screens/profile/ChangePasswordPage'),
);
const UsersPage = React.lazy(() => import('screens/users/UsersPage'));
const UserRegisterPage = React.lazy(() =>
	import('screens/users/UserRegisterPage'),
);
const UserPermissionsPage = React.lazy(() =>
	import('screens/users/UserPermissionsPage'),
);
const HelpPage = React.lazy(() => import('screens/help/HelpPage'));

const ProdPage = React.lazy(() => import('screens/products/ProductsPage'));
const ProdRegisterPage = React.lazy(() => import('screens/products/ProductsRegisterPage'));

const FornPage = React.lazy(() => import('screens/forn/FornPage'));
const FornRegisterPage = React.lazy(() => import('screens/forn/FornRegister'));

const BrandsPage = React.lazy(() => import('screens/brand/BrandPages'));
const BrandsRegisterPage = React.lazy(() => import('screens/brand/BrandRegisterPage'));

const User = Authorize(false, ['USER']);

const routes = [
	{
		path: '/',
		name: 'Home',
		component: User(DashboardPage),
		permission: false,
	},
	{
		path: '/ajuda',
		name: 'Help',
		component: User(HelpPage),
		permission: false,
	},
	{
		path: '/perfil',
		name: 'Profile',
		component: User(ProfilePage),
		permission: false,
	},
	{
		path: '/perfil/alterar-senha',
		name: 'ChangePassword',
		component: User(ChangePasswordPage),
		permission: false,
	},

	{
		path: '/usuarios',
		name: 'Users',
		component: User(UsersPage),
		permission: true,
		id: 48,
	},
	{
		path: '/usuarios/adicionar',
		name: 'UserRegister',
		component: User(UserRegisterPage),
		permission: true,
		id: 48,
	},
	{
		path: '/usuarios/editar/:id',
		name: 'UserEdit',
		component: User(UserRegisterPage),
		permission: true,
		id: 48,
	},
	{
		path: '/usuarios/permissoes',
		name: 'UserPermissions',
		component: User(UserPermissionsPage),
		permission: true,
		id: 48,
	},

	/*PRODUCTS*/
	{
		path: '/products',
		name: 'Products',
		component: User(ProdPage),
		permission: true,
		id: 145,
	},
	{
		path: '/products/add',
		name: 'ProductsAdd',
		component: User(ProdRegisterPage),
		permission: true,
		id: 144,
	},

	/*FORNECEDORES*/
	{
		path: '/forn',
		name: 'forn',
		component: User(FornPage),
		permission: true,
		id: 144,
	},
	{
		path: '/forn/add',
		name: 'addForn',
		component: User(FornRegisterPage),
		permission: true,
		id: 144
	},
	{
		path: '/forn/editar/:id',
		name: 'editForn',
		component: User(FornRegisterPage),
		permission: true,
		id: 144
	},

	/* BRANDS/MARCAS */
	{
		path: '/brand',
		name: 'brand',
		component: User(BrandsPage),
		permission: true,
		id: 146
	},
	{
		path: '/brands/add/',
		name: 'editar',
		component: User(BrandsRegisterPage),
		permission: true,
		id: 146
	},
	{
		path: '/brands/editar/:id',
		name: 'editar',
		component: User(BrandsRegisterPage),
		permission: true,
		id: 146
	},
];

export default routes;
