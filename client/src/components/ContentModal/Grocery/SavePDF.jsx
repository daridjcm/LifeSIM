import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

export default function handleDownload(invoice) {
  if (!invoice) return;

  const invoiceNumber = invoice.invoiceNumber;
  const doc = new jsPDF();

  const formattedDate = new Date(invoice.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });

  doc.setFontSize(11);
  doc.text("Invoice by LifeSIM", 20, 20);
  doc.text("Signatured by CEO: @Daridjcm", 20, 25);
  doc.text(`Date: ${formattedDate}`, 20, 30);
  doc.text(`User ID: ${invoice.userID}`, 20, 35); 
  doc.text(`Invoice Number: #${invoiceNumber}`, 20, 40); 
  doc.text(`Total amount: $${invoice.totalAmount}`, 20, 50);
  doc.text("Purchased products:", 20, 55);

  if (Array.isArray(invoice.items) && invoice.items.length > 0) {
    const rows = invoice.items.map(item => [
      item.name || "N/A",
      item.quantity || "N/A",
      `$${item.price || 0}`,
      `$${item.basePrice || 0}`
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
    });
  } else {
    doc.text("No items available", 20, 60); 
  }
  doc.save(`invoice-lifesim-${invoiceNumber}.pdf`);
}
