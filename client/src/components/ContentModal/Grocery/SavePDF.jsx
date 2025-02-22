import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

export const invoiceNumber = localStorage.getItem('invoiceNumber');

export default function handleDownload(invoice) {
  if (!invoice) return;

  const invoiceID = invoice.id;
  const invoiceNumber = localStorage.getItem('invoiceNumber');
  const doc = new jsPDF();

  const formattedDate = new Date(invoice.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });

  doc.setFontSize(11);
  doc.text("Invoice by LifeSIM", 20, 20);
  doc.text("Signatured by CEO: @Daridjcm", 20, 25);
  doc.text(`Date: ${formattedDate}`, 20, 30);
  doc.text(`ID: ${invoiceID}`, 20, 35); 
  doc.text(`Invoice Number: #${invoiceNumber}`, 20, 40); 
  doc.text(`Total amount: $${invoice.totalAmount}`, 20, 50);
  doc.text("Purchased products:", 20, 55);

  const rows = invoice.items.map(item => [
    item.title,
    item.quantity,
    `$${item.price}`,
    `$${item.basePrice}`
  ]);

  autoTable(doc, {
    startY: 58,
    margin: { top: 10, left: 20, right: 20 },
    headStyles: {
      fontSize: 11.5,
    },
    bodyStyles: {
      fontSize: 11,
    },
    head: [['Product', 'Quantity', 'Price', 'Base Price']],
    body: rows,
    theme: 'plain',
    pageBreak: 'auto',
  }
);
  doc.save(`invoice-lifesim-${invoiceNumber}.pdf`);
}
