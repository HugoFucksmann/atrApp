import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import SearchIcon from '@material-ui/icons/Search';
import { CSVLink } from 'react-csv';

import {
	editarUserAtr,
	eliminarUserAtr,
	miUsuarioLocal,
} from '../helpers/atrService';
import { AtrContext } from '../context/atrContext';
import Swal from 'sweetalert2';
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Grid,
	TextField,
} from '@material-ui/core';

function descendingComparator(a, b, orderBy) {
	if (b[orderBy] < a[orderBy]) {
		return -1;
	}
	if (b[orderBy] > a[orderBy]) {
		return 1;
	}
	return 0;
}

function getComparator(order, orderBy) {
	return order === 'desc'
		? (a, b) => descendingComparator(a, b, orderBy)
		: (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
	const stabilizedThis = array.map((el, index) => [el, index]);
	stabilizedThis.sort((a, b) => {
		const order = comparator(a[0], b[0]);
		if (order !== 0) return order;
		return a[1] - b[1];
	});
	return stabilizedThis.map((el) => el[0]);
}

function EnhancedTableHead(props) {
	const {
		classes,
		onSelectAllClick,
		order,
		orderBy,
		numSelected,
		rowCount,
		onRequestSort,
		keys,
	} = props;
	const createSortHandler = (property) => (event) => {
		onRequestSort(event, property);
	};
	console.log(keys);
	return (
		<TableHead>
			<TableRow>
				<TableCell padding='checkbox'>
					<Checkbox
						indeterminate={numSelected > 0 && numSelected < rowCount}
						checked={rowCount > 0 && numSelected === rowCount}
						onChange={onSelectAllClick}
						inputProps={{ 'aria-label': 'select all desserts' }}
					/>
				</TableCell>
				{keys.map((headCell) => (
					<TableCell
						key={headCell.id}
						align={headCell.numeric ? 'right' : 'left'}
						padding={headCell.disablePadding ? 'none' : 'default'}
						sortDirection={orderBy === headCell.id ? order : false}
					>
						<TableSortLabel
							active={orderBy === headCell.id}
							direction={orderBy === headCell.id ? order : 'asc'}
							onClick={createSortHandler(headCell.id)}
						>
							{headCell.label}
							{orderBy === headCell.id ? (
								<span className={classes.visuallyHidden}>
									{order === 'desc' ? 'sorted descending' : 'sorted ascending'}
								</span>
							) : null}
						</TableSortLabel>
					</TableCell>
				))}
			</TableRow>
		</TableHead>
	);
}

EnhancedTableHead.propTypes = {
	classes: PropTypes.object.isRequired,
	numSelected: PropTypes.number.isRequired,
	onRequestSort: PropTypes.func.isRequired,
	onSelectAllClick: PropTypes.func.isRequired,
	order: PropTypes.oneOf(['asc', 'desc']).isRequired,
	orderBy: PropTypes.string.isRequired,
	rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
	root: {
		paddingLeft: theme.spacing(2),
		paddingRight: theme.spacing(1),
	},
	highlight:
		theme.palette.type === 'light'
			? {
					color: theme.palette.secondary.main,
					backgroundColor: lighten(theme.palette.secondary.light, 0.85),
			  }
			: {
					color: theme.palette.text.primary,
					backgroundColor: theme.palette.secondary.dark,
			  },
	title: {
		flex: '1 1 100%',
	},
	searchers: {
		width: 220,
		marginRight: 15,
	},
}));

const EnhancedTableToolbar = (props) => {
	const { numSelected, personasSelec, handlerAtr } = props;
	const classes = useToolbarStyles();
	const [open, setOpen] = React.useState(false);

	const handlerEliminar = () => {
		Swal.fire({
			title: 'seguro de eliminar ?',
			text: '',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Eliminar !',
		}).then(async (result) => {
			if (result.isConfirmed) {
				let resp = await eliminarUserAtr(personasSelec[0]._id);
				if (resp) handlerAtr('eliminar', personasSelec[0]);
				else Swal.fire('Error!', 'error al eliminar', 'error');
			}
		});
	};

	return (
		<>
			<Toolbar
				className={clsx(classes.root, {
					[classes.highlight]: numSelected > 0,
				})}
			>
				{numSelected > 0 ? (
					<Typography
						className={classes.title}
						color='inherit'
						variant='subtitle1'
						component='div'
						key='text1'
					>
						{numSelected} seleccionados
					</Typography>
				) : (
					<Typography
						key='text2'
						className={classes.title}
						variant='h6'
						id='tableTitle'
						component='div'
					>
						Tabla Personas
					</Typography>
				)}

				{numSelected === 1 && (
					<>
						<Tooltip key='icon3' title='Editar' style={{ marginRight: 10 }}>
							<IconButton aria-label='Editar' onClick={() => setOpen(true)}>
								<EditIcon />
							</IconButton>
						</Tooltip>
						<Tooltip key='icon4' title='Eliminar' style={{ marginRight: 10 }}>
							<IconButton
								aria-label='Eliminar'
								onClick={() => handlerEliminar()}
							>
								<DeleteIcon />
							</IconButton>
						</Tooltip>
					</>
				)}
			</Toolbar>
			<Dialog
				maxWidth='md'
				open={open}
				onClose={() => setOpen(false)}
				aria-labelledby='alert-dialog-title'
				aria-describedby='alert-dialog-description'
			>
				<ModalEditar
					persona={personasSelec[0]}
					handlerAtr={handlerAtr}
					setOpen={setOpen}
				/>
			</Dialog>
		</>
	);
};

EnhancedTableToolbar.propTypes = {
	numSelected: PropTypes.number.isRequired,
};

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100%',
	},
	paper: {
		width: '100%',
		marginBottom: theme.spacing(2),
	},
	table: {
		minWidth: 750,
	},
	visuallyHidden: {
		border: 0,
		clip: 'rect(0 0 0 0)',
		height: 1,
		margin: -1,
		overflow: 'hidden',
		padding: 0,
		position: 'absolute',
		top: 20,
		width: 1,
	},
	input: {
		margin: 20,
	},
}));

export default function EnhancedTable() {
	const { personas, handlerAtr } = useContext(AtrContext);
	const classes = useStyles();
	const [order, setOrder] = React.useState('asc');
	const [orderBy, setOrderBy] = React.useState('nombre');
	const [selected, setSelected] = React.useState([]);
	const [page, setPage] = React.useState(0);
	const [dense, setDense] = React.useState(false);
	const [rowsPerPage, setRowsPerPage] = React.useState(5);

	let personasIdCarga = personas.filter(
		(persona) => persona.usuarioCarga === miUsuarioLocal().uid
	);

	function headersss() {
		if (personasIdCarga.length === 0) return [];
		else
			return Object.keys(personasIdCarga[0])
				.filter((key) => key !== '_id' && key !== 'usuarioCarga')
				.map((key) => {
					return {
						id: key,
						numeric: false,
						disablePadding: true,
						label: key,
					};
				});
	}

	const headCells = headersss();

	const handleRequestSort = (event, property) => {
		const isAsc = orderBy === property && order === 'asc';
		setOrder(isAsc ? 'desc' : 'asc');
		setOrderBy(property);
	};

	const handleSelectAllClick = (event) => {
		if (event.target.checked) {
			const newSelecteds = personasIdCarga.map((n) => n);
			setSelected(newSelecteds);
			return;
		}
		setSelected([]);
	};

	const handleClick = (event, name) => {
		const selectedIndex = selected.indexOf(name);
		let newSelected = [];

		if (selectedIndex === -1) {
			newSelected = newSelected.concat(selected, name);
		} else if (selectedIndex === 0) {
			newSelected = newSelected.concat(selected.slice(1));
		} else if (selectedIndex === selected.length - 1) {
			newSelected = newSelected.concat(selected.slice(0, -1));
		} else if (selectedIndex > 0) {
			newSelected = newSelected.concat(
				selected.slice(0, selectedIndex),
				selected.slice(selectedIndex + 1)
			);
		}

		setSelected(newSelected);
	};

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	const isSelected = (name) => selected.indexOf(name) !== -1;

	const emptyRows =
		rowsPerPage -
		Math.min(rowsPerPage, personasIdCarga.length - page * rowsPerPage);

	return (
		<div className={classes.root}>
			<Paper elevation={3} className={classes.paper}>
				{personasIdCarga.length > 0 ? (
					<>
						<EnhancedTableToolbar
							numSelected={selected.length}
							personasSelec={selected}
							handlerAtr={handlerAtr}
						/>
						<TableContainer style={{ maxHeight: 550 }}>
							<Table
								stickyHeader
								className={classes.table}
								aria-labelledby='tableTitle'
								aria-label='enhanced table'
							>
								<EnhancedTableHead
									classes={classes}
									numSelected={selected.length}
									order={order}
									orderBy={orderBy}
									onSelectAllClick={handleSelectAllClick}
									onRequestSort={handleRequestSort}
									rowCount={personasIdCarga.length}
									keys={headCells}
								/>
								<TableBody>
									{stableSort(personasIdCarga, getComparator(order, orderBy))
										.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
										.map((row, index) => {
											const isItemSelected = isSelected(row);
											const labelId = `enhanced-table-checkbox-${index}`;

											return (
												<TableRow
													hover
													onClick={(event) => handleClick(event, row)}
													role='checkbox'
													aria-checked={isItemSelected}
													tabIndex={-1}
													key={row._id}
													selected={isItemSelected}
												>
													<TableCell padding='checkbox'>
														<Checkbox
															checked={isItemSelected}
															inputProps={{ 'aria-labelledby': labelId }}
														/>
													</TableCell>
													{Object.keys(row)
														.filter(
															(key) => key !== '_id' && key !== 'usuarioCarga'
														)
														.map((key) => (
															<TableCell key={key} align='center'>
																{row[key]}
															</TableCell>
														))}
												</TableRow>
											);
										})}
									{emptyRows > 0 && (
										<TableRow
											key={'rororo'}
											style={{ height: (dense ? 33 : 53) * emptyRows }}
										>
											<TableCell colSpan={6} />
										</TableRow>
									)}
								</TableBody>
							</Table>
						</TableContainer>
						<TablePagination
							labelRowsPerPage='filas por pagina'
							labelDisplayedRows={({ from, to, count }) =>
								`${from}-${to} de ${count !== -1 ? count : `mas de ${to}`}`
							}
							rowsPerPageOptions={[5, 10, 25]}
							component='div'
							count={personasIdCarga.length}
							rowsPerPage={rowsPerPage}
							page={page}
							onChangePage={handleChangePage}
							onChangeRowsPerPage={handleChangeRowsPerPage}
						/>
					</>
				) : (
					<p style={{ padding: 20 }}>No hay personas cargadas</p>
				)}
			</Paper>
		</div>
	);
}

const ModalEditar = ({ persona, handlerAtr, setOpen }) => {
	const classes = useStyles();
	const [formData, setFormData] = useState(persona);

	async function handlerEditar() {
		let result = await editarUserAtr(formData);
		console.log(result);
		if (result) {
			handlerAtr('editar', result);
			setOpen(false);
		}
	}

	return (
		<>
			<DialogTitle id='alert-dialog-title'>{'Editar Persona'}</DialogTitle>
			<DialogContent>
				<Grid container>
					{Object.keys(formData).map((key, index) => {
						if (key === 'fechaNacimiento')
							return (
								<TextField
									key={key}
									value={formData[key]}
									onChange={(e) =>
										setFormData({ ...formData, [key]: e.target.value })
									}
									id='date'
									label='fecha Nacimiento'
									className={classes.input}
									type='date'
									defaultValue='aaaa-mm-dd'
									InputLabelProps={{
										shrink: true,
									}}
								/>
							);
						return (
							<TextField
								value={formData[key]}
								onChange={(e) =>
									setFormData({ ...formData, [key]: e.target.value })
								}
								key={key}
								size='small'
								id={index}
								label={key}
								className={classes.input}
							/>
						);
					})}
				</Grid>
			</DialogContent>
			<DialogActions>
				<Button size='large' color='primary' onClick={() => handlerEditar()}>
					Editar !
				</Button>
			</DialogActions>
		</>
	);
};
