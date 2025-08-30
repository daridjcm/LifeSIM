import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

// Función para manejar la descarga de PDF
export default function handleDownload(type, data, userData) {
  const doc = new jsPDF();

  if (type === 'Invoice') {
    createInvoicePDF(doc, data, userData);
  } else if (type === 'HealthReport') {
    createHealthReportPDF(doc, data, userData);
  } else {
    console.error('Tipo no reconocido:', type);
    return;
  }

  doc.save(`${type}-${userData?.username || 'user'}.pdf`);
}

function createInvoicePDF(doc, invoice, userData) {
  if (!invoice) return;

  const invoiceNumber = invoice.invoice_number;
  const formattedDate = new Date(invoice.createdAt).toLocaleDateString(
    'en-US',
    { year: 'numeric', month: 'long', day: 'numeric' },
  );

  const storedData = JSON.parse(localStorage.getItem('selectedItems') || '{}');
  const items = storedData.items || [];
  console.log(items);

  doc.setFontSize(11);
  doc.text('Invoice by LifeSIM', 20, 20);
  doc.text(`Invoice Number: #${invoiceNumber}`, 20, 25);
  doc.text('Signatured by CEO: @Daridjcm', 20, 30);
  doc.text(`Date: ${formattedDate}`, 20, 35);
  doc.text(`User: ${userData?.username}`, 20, 40);
  doc.text(`User ID: ${userData?.id}`, 20, 45);
  doc.text(`Total amount: $${invoice.total_amount}`, 20, 55);
  doc.text('Purchased products:', 20, 60);

  if (Array.isArray(items) && items.length > 0) {
    const rows = items.map((item) => [
      item.name || 'N/A',
      item.quantity || 'N/A',
      `$${item.price || 0}`,
      `$${item.base_price || 0}`,
    ]);

    autoTable(doc, {
      startY: 63,
      margin: { top: 10, left: 20, right: 20 },
      headStyles: { fontSize: 11.5 },
      bodyStyles: { fontSize: 11 },
      head: [['Product', 'Quantity', 'Price', 'Base Price']],
      body: rows,
      theme: 'plain',
      pageBreak: 'auto',
    });
  } else {
    doc.text('No items available', 20, 60);
  }
}

function createHealthReportPDF(doc, healthReport, userData) {
  if (!healthReport) return;

  doc.setFontSize(11);
  doc.text('Health Report', 20, 20);
  doc.text(`User: ${userData?.username || 'N/A'}`, 20, 30);
  doc.text(`Appointment ID: ${healthReport.appointment_id || 'N/A'}`, 20, 35);
  doc.text(`Appointment Status: ${healthReport.status || 'N/A'}`, 20, 40);
  doc.text(`Doctor: ${healthReport.doctor || 'N/A'}`, 20, 45);
  doc.text(`Diagnosis: ${healthReport.disease || 'N/A'}`, 20, 50);

  // Symptoms Section
  doc.text('Symptoms:', 20, 60);
  const symptoms = healthReport.symptoms
    ? healthReport.symptoms.split(', ')
    : [];
  if (symptoms.length > 0) {
    symptoms.forEach((symptom, index) => {
      doc.text(`- ${symptom}`, 20, 65 + index * 5);
    });
  } else {
    doc.text('No symptoms reported', 20, 65);
  }

  // Treatments Section
  doc.text('Treatments:', 20, 70 + symptoms.length * 5);
  let treatments = Array.isArray(healthReport.treatments)
    ? healthReport.treatments
    : [];

  if (treatments.length > 0) {
    treatments.forEach((treatment, index) => {
      if (typeof treatment === 'object') {
        const treatmentDetails = `- ${treatment.pill_name || 'N/A'}: ${treatment.pill_description || 'No description'} (${treatment.pill_tablets || 'N/A'} tablets - ${treatment.pill_weight || 'N/A'})`;
        doc.text(treatmentDetails, 20, 75 + symptoms.length * 5 + index * 5);
      } else {
        doc.text(`- ${treatment}`, 20, 75 + symptoms.length * 5 + index * 5);
      }
    });
  } else {
    doc.text('No treatments reported', 20, 75 + symptoms.length * 5);
  }

  // Doctor's Notes Section
  doc.text(
    "Doctor's Notes:",
    20,
    85 + symptoms.length * 5 + treatments.length * 5,
  );
  doc.text(
    healthReport.notes || 'No notes available',
    20,
    90 + symptoms.length * 5 + treatments.length * 5,
  );
}
