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

const Dashboard = () => {
	const [expanded, setExpanded] = React.useState(false);
	const handleChange = (panel) => (event, isExpanded) => {
		setExpanded(isExpanded ? panel : false);
	};

	return (
		<div>
			<Accordion
				style={{ marginTop: 50, marginBottom: 40 }}
				elevation={2}
				expanded={expanded === 'panel1'}
				onChange={handleChange('panel1')}
			>
				<AccordionSummary
					expandIcon={<ExpandMoreIcon />}
					aria-controls='panel1a-content'
					id='panel1a-header'
				>
					<Typography>Formulario de carga</Typography>
				</AccordionSummary>
				<AccordionDetails>
					<Formulario />
				</AccordionDetails>
			</Accordion>

			<EnhancedTable />
		</div>
	);
};

export default Dashboard;
