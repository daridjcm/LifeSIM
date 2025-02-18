
import { jsPDF } from "jspdf";

export const invoiceNumber = localStorage.getItem('invoiceNumber');
export default function handleDownload(invoice) {
  if (!invoice) return;

  const invoiceID = invoice.id; // ID of server
  const invoiceNumber = localStorage.getItem('invoiceNumber'); // Downloads from localStorage
  const doc = new jsPDF();

  const formattedDate = new Date(invoice.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
  
  // doc.addImage("/images/logo.jpg")
  doc.text("Invoice by LifeSIM", 20, 20);
  doc.text("Signatured by CEO: @Daridjcm", 20, 30);
  doc.text(`Date: ${formattedDate}`, 20, 40);
  doc.text(`ID: ${invoiceID}`, 20, 50); 
  doc.text(`Invoice Number: #${invoiceNumber}`, 20, 60); 
  doc.text("Items:", 20, 70);
  invoice.items.forEach((item, index) => {
    doc.text(`${item.title}: $${item.price}`, 20, 80 + index * 10);
  });
  doc.text(`Total amount: $${invoice.totalAmount}`, 20, 80 + invoice.items.length * 10 + 10);
  doc.save(`invoice-lifesim-${invoiceNumber}.pdf`);
}
