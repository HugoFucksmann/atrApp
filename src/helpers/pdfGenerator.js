import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { CSVLink } from 'react-csv';

export function generatePDF(json, keys) {
	console.log(keys);
	let columns = keys.map((key) => {
		return { header: key, dataKey: key };
	});
	const doc = new jsPDF();
	doc.autoTable({
		body: json,
		columns: columns,
	});

	doc.save('table.pdf');
}
