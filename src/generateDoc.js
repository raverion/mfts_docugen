import jsPDF from "jspdf";

export const generatePDF = (inputData, selectedOption) => {
  const doc = new jsPDF();

  // Load the image file
  const imgData = require("./MFTS_logo.png");
  // Add the image to the PDF document
  doc.addImage(
    imgData,
    "PNG",
    50, // X coordinate of the image
    10, // Y coordinate of the image
    96, // Width of the image
    30 // Height of the image
  );

  // Set the font and font size
  doc.setFont("helvetica");
  doc.setFontSize(11);

  // Add content to the PDF document using the input data
  doc.text(`To: ${inputData.To}`, 10, 55);
  doc.text(`Address: ${inputData.Address}`, 10, 60);
  doc.text(`Date: ${inputData.Date}`, 150, 55);
  doc.text(`Quote/Invoice#: ${inputData.DocNum}`, 150, 60);

  doc.setFontSize(14);
  if (selectedOption === "ACKRECEIPT") {
    doc.text(`ACKNOWLEDGEMENT RECEIPT`, 70, 75);
  } else if (selectedOption === "INV") {
    doc.text(`INVOICE`, 95, 75);
  } else if (selectedOption === "QUOTE") {
    doc.text(`QUOTATION`, 90, 75);
  } else if (selectedOption === "SOA") {
    doc.text(`STATEMENT OF ACCOUNT`, 70, 75);
  } else if (selectedOption === "PAYROLL") {
    doc.text(`PAYROLL`, 70, 75);
  }
  // ...

  // Save the PDF document
  doc.save(
    `${selectedOption} - ${inputData.DocNum} - ${inputData.Date} - ${inputData.To}.pdf`
  );
};

export const handleGeneratePDF = (inputFields, selectedOption) => {
  // Prepare the input data for the PDF document
  const inputData = {
    To: inputFields[0].To,
    Address: inputFields[1].Address,
    Date: inputFields[2].Date,
    DocNum: inputFields[3].DocNum,

    // ...
  };

  // Call the generatePDF function
  generatePDF(inputData, selectedOption);
};
