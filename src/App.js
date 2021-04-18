import React, { useEffect, useState } from 'react';
import AtrProvider from './context/atrContext';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'fontsource-roboto';
import NavBar from './components/navBar';
import Login from './components/login';
import ProtectedRoute from './helpers/protectedRoute';
import Dashboard from './pages/dashboard';
import Error404 from './pages/404';
import { Container } from '@material-ui/core';
import { getUsersAtr } from './helpers/atrService';

function App() {
	const [loading, setLoading] = useState(true);
	const [personas, setPersonas] = useState([]);
	useEffect(() => {
		(async () => {
			setPersonas(await getUsersAtr());

			setLoading(false);
		})();
	}, []);

	if (loading) return <div>LOADINgGGGGG</div>;
	return (
		<AtrProvider personas={personas}>
			<NavBar />
			<Container>
				<Router>
					<Switch>
						<Route exact path='/' component={Login} />
						<ProtectedRoute path='/dashboard' component={Dashboard} />
						<Route path='*' component={Error404} />
					</Switch>
				</Router>
			</Container>
		</AtrProvider>
	);
}

export default App;
