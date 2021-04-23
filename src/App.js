import React, { useEffect, useState } from 'react';
import AtrProvider from './context/atrContext';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'fontsource-roboto';
import NavBar from './components/navBar';
import Login from './components/login';
import ProtectedRoute from './helpers/protectedRoute';
import Dashboard from './pages/dashboard';
import Error404 from './pages/404';
import { CircularProgress, Container } from '@material-ui/core';
import { getUsersAtr, getMyUser } from './helpers/atrService';
import AdminDashboard from './pages/AdminDashboard';
import Registro from './components/registro';

function App() {
	const [loading, setLoading] = useState(true);
	const [personas, setPersonas] = useState([]);

	useEffect(() => {
		(async () => {
			setPersonas(await getUsersAtr());

			setLoading(false);
		})();
	}, []);

	if (loading)
		return (
			<CircularProgress
				style={{ marginLeft: '47%', marginTop: '20%' }}
				size={50}
				color='secondary'
			/>
		);
	return (
		<AtrProvider personas={personas}>
			<Router>
				<NavBar />
				<Container>
					<Switch>
						<Route exact path='/' component={Login} />
						<Route exact path='/registro' component={Registro} />
						<ProtectedRoute path='/dashboard' component={Dashboard} />
						<ProtectedRoute path='/admin' component={AdminDashboard} />
						<Route path='*' component={Error404} />
					</Switch>
				</Container>
			</Router>
		</AtrProvider>
	);
}

export default App;
