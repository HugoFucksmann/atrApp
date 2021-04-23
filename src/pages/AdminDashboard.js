import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Typography,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import EnhancedTable from '../components/tabla';
import Formulario from '../components/formulario';

const useStyles = makeStyles({});

const AdminDashboard = () => {
	const [expanded, setExpanded] = React.useState('panel1');
	const handleChange = (panel) => (event, isExpanded) => {
		setExpanded(isExpanded ? panel : false);
	};

	return (
		<div>
			<br />
			<br />
			<EnhancedTable />
		</div>
	);
};

export default AdminDashboard;
