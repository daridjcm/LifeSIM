import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

// Create invoice in PDF format and handle data
// TODO: Implement reuse component for the invoice and hospital report
export default function handleDownload(invoice, userData) {
  if (!invoice) return;

  const invoiceNumber = invoice.invoiceNumber;
  const doc = new jsPDF();

  const formattedDate = new Date(invoice.createdAt).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    },
  );

  const storedData = JSON.parse(localStorage.getItem("selectedItems") || "{}");
  const items = storedData.items || [];

  if (items.length === 0) {
    console.log("No items found in localStorage.");
  }

  doc.setFontSize(11);
  doc.text("Invoice by LifeSIM", 20, 20);
  doc.text(`Invoice Number: #${invoiceNumber}`, 20, 25);
  doc.text("Signatured by CEO: @Daridjcm", 20, 30);
  doc.text(`Date: ${formattedDate}`, 20, 35);
  doc.text(`User: ${userData?.username}`, 20, 40);
  doc.text(`User ID: ${userData?.id}`, 20, 45);

  doc.text(`Total amount: $${invoice.totalAmount}`, 20, 55);
  doc.text("Purchased products:", 20, 60);

  // Check if items array is valid and has items
  if (Array.isArray(items) && items.length > 0) {
    const rows = items.map((item) => [
      item.name || "N/A",
      item.quantity || "N/A",
      `$${item.price || 0}`,
      `$${item.basePrice || 0}`,
    ]);

    autoTable(doc, {
      startY: 63,
      margin: { top: 10, left: 20, right: 20 },
      headStyles: {
        fontSize: 11.5,
      },
      bodyStyles: {
        fontSize: 11,
      },
      head: [["Product", "Quantity", "Price", "Base Price"]],
      body: rows,
      theme: "plain",
      pageBreak: "auto",
    });
  } else {
    doc.text("No items available", 20, 60);
  }
  doc.save(`invoice-lifesim-${invoiceNumber}.pdf`);
}
