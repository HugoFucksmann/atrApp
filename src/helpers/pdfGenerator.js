import jsPDF from "jspdf";
import "jspdf-autotable";
import { CSVLink } from "react-csv";


export function generatePDF(json){
    const doc = new jsPDF();
    doc.autoTable({
      body: json,
      columns: [
        { header: "Taller", dataKey: "taller" },
        { header: "Nombre", dataKey: ["nombre"] },
        { header: "Apellido", dataKey: "apellido" },
        { header: "DNI", dataKey: "dni" },
        //{ header: "Edad", dataKey: "edad" },
        { header: "Fecha Nacimiento", dataKey: "fechaNacimiento" },
        { header: "Contacto", dataKey: "telefono" },
        //{ header: "Calle", dataKey: "calle" },
        //{ header: "Numero Calle", dataKey: "numeroCalle" },
        //{ header: "Ciudad", dataKey: "ciudad" },
      ],
    });

    doc.save("table.pdf");

}


