import React, { useContext } from 'react';
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
import { eliminarUserAtr } from '../helpers/atrService';
import { AtrContext } from '../context/atrContext';
import {
	Button,
	FormControl,
	InputAdornment,
	InputLabel,
	MenuItem,
	Select,
	SvgIcon,
	TextField,
} from '@material-ui/core';
import pdfIcon from '../assets/iconos/pdf.svg';
import excelIcon from '../assets/iconos/excel.svg';

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
	} = props;
	const createSortHandler = (property) => (event) => {
		onRequestSort(event, property);
	};

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
				{headCells.map((headCell) => (
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
	const classes = useToolbarStyles();
	const { numSelected, idPersona, personas } = props;

	const handlerEliminar = () => {
		eliminarUserAtr(idPersona);
	};
	const handlreEditar = () => {};

	return (
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
				>
					{numSelected} seleccionados
				</Typography>
			) : (
				<Typography
					className={classes.title}
					variant='h6'
					id='tableTitle'
					component='div'
				>
					Tabla Personas
				</Typography>
			)}

			{numSelected > 0 ? (
				<>
					<IconButton style={{ marginRight: 10 }}>
						<img
							src={pdfIcon}
							style={{ height: 25, width: 25 }}
							alt='fireSpot'
						/>
					</IconButton>
					<IconButton style={{ marginRight: 10 }}>
						<img
							src={excelIcon}
							style={{ height: 25, width: 25 }}
							alt='fireSpot'
						/>
					</IconButton>
				</>
			) : (
				<>
					<TextField
						size='small'
						id='outlined-basic'
						label='Buscar'
						variant='outlined'
						className={classes.searchers}
						InputProps={{
							endAdornment: (
								<InputAdornment position='start'>
									<SearchIcon />
								</InputAdornment>
							),
						}}
					/>
					<FormControl
						size='small'
						variant='outlined'
						className={classes.searchers}
					>
						<InputLabel id='demo-simple-select-outlined-label'>
							Filtrar
						</InputLabel>
						<Select
							labelId='demo-simple-select-outlined-label'
							id='demo-simple-select-outlined'
							label='Age'
						>
							<MenuItem value={10}>Ten</MenuItem>
							<MenuItem value={20}>Twenty</MenuItem>
							<MenuItem value={30}>Thirty</MenuItem>
						</Select>
					</FormControl>
				</>
			)}
			{numSelected === 1 && (
				<>
					<Tooltip title='Editar' style={{ marginRight: 10 }}>
						<IconButton aria-label='Editar' onClick={() => handlreEditar()}>
							<EditIcon />
						</IconButton>
					</Tooltip>
					<Tooltip title='Eliminar' style={{ marginRight: 10 }}>
						<IconButton aria-label='Eliminar' onClick={() => handlerEliminar()}>
							<DeleteIcon />
						</IconButton>
					</Tooltip>
				</>
			)}
		</Toolbar>
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
}));

const handlerBusqueda = (parametro, value) => {};

const personaModel = {
	nombre: '',
	apellido: '',
	edad: '',
	dni: '',
	cuil: '',
	fechaNacimiento: '',
	direccion: '',
	numeroDireccion: '',
	barrio: '',
	ciudad: '',
	cp: '',
	telefono: '',
	mail: '',
	tematica: '',
	proyecto: '',
	nacionalidad: '',
};
const keys = Object.keys(personaModel);

const headCells = keys.map((key) => {
	return {
		id: key,
		numeric: false,
		disablePadding: true,
		label: key,
	};
});

export default function EnhancedTable() {
	const { personas } = useContext(AtrContext);
	const classes = useStyles();
	const [order, setOrder] = React.useState('asc');
	const [orderBy, setOrderBy] = React.useState('nombre');
	const [selected, setSelected] = React.useState([]);
	const [page, setPage] = React.useState(0);
	const [dense, setDense] = React.useState(false);
	const [rowsPerPage, setRowsPerPage] = React.useState(5);

	const handleRequestSort = (event, property) => {
		const isAsc = orderBy === property && order === 'asc';
		setOrder(isAsc ? 'desc' : 'asc');
		setOrderBy(property);
	};

	const handleSelectAllClick = (event) => {
		if (event.target.checked) {
			const newSelecteds = personas.map((n) => n._id);
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
		rowsPerPage - Math.min(rowsPerPage, personas.length - page * rowsPerPage);

	return (
		<div className={classes.root}>
			<Paper elevation={3} className={classes.paper}>
				<EnhancedTableToolbar
					numSelected={selected.length}
					idPersona={selected}
					personas={personas}
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
							rowCount={personas.length}
						/>
						<TableBody>
							{stableSort(personas, getComparator(order, orderBy))
								.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
								.map((row, index) => {
									const isItemSelected = isSelected(row._id);
									const labelId = `enhanced-table-checkbox-${index}`;

									return (
										<TableRow
											hover
											onClick={(event) => handleClick(event, row._id)}
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
											<TableCell align='center'>{row.nombre}</TableCell>
											<TableCell align='center'>{row.apellido}</TableCell>
											<TableCell align='center'>{row.edad}</TableCell>
											<TableCell align='center'>
												{row.fechaNacimiento}
											</TableCell>
											<TableCell align='center'>{row.dni}</TableCell>
											<TableCell align='center'>{row.cuil}</TableCell>
											<TableCell align='center'>{row.direccion}</TableCell>
											<TableCell align='center'>
												{row.numeroDireccion}
											</TableCell>
											<TableCell align='center'>{row.barrio}</TableCell>
											<TableCell align='center'>{row.ciudad}</TableCell>
											<TableCell align='center'>{row.cp}</TableCell>
											<TableCell align='center'>{row.telefono}</TableCell>
											<TableCell align='center'>{row.mail}</TableCell>
											<TableCell align='center'>{row.proyecto}</TableCell>
											<TableCell align='center'>{row.tematica}</TableCell>
											<TableCell align='center'>{row.nacionalidad}</TableCell>
										</TableRow>
									);
								})}
							{emptyRows > 0 && (
								<TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
									<TableCell colSpan={6} />
								</TableRow>
							)}
						</TableBody>
					</Table>
				</TableContainer>
				<TablePagination
					rowsPerPageOptions={[5, 10, 25]}
					component='div'
					count={personas.length}
					rowsPerPage={rowsPerPage}
					page={page}
					onChangePage={handleChangePage}
					onChangeRowsPerPage={handleChangeRowsPerPage}
				/>
			</Paper>
		</div>
	);
}
