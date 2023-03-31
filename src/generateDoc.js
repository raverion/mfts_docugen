import jsPDF from "jspdf";
import "jspdf-autotable";

export const generatePDF = (selectedOption, inputData, tableData) => {
  const doc = new jsPDF();

  // Load the image file
  const imgData = require("./MFTS_logo.png");
  // Add the image to the PDF document
  doc.addImage(
    imgData,
    "PNG",
    55, // X coordinate of the image
    10, // Y coordinate of the image
    96, // Width of the image
    30 // Height of the image
  );

  // Set the font and font size
  doc.setFont("helvetica");
  doc.setFontSize(11);

  if (selectedOption !== "PAYROLL") {
    // Add content to the PDF document using the input data
    doc.text(`To: ${inputData.input_0}`, 10, 55); // To
    doc.text(`Address: ${inputData.input_1}`, 10, 60); // Address
    doc.text(`Date: ${inputData.input_2}`, 150, 55); // Date
    doc.text(`Quote/Invoice#: ${inputData.input_3}`, 150, 60); // DocNum
  }

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
    doc.text(`PAYROLL`, 95, 60);
  }

  // Set the text to center align
  let textWidth = 0;
  let startY = 0; // for table
  if (selectedOption !== "PAYROLL") {
    textWidth = doc.getTextWidth(inputData.input_4);
    const pageWidth = doc.internal.pageSize.width;
    const centerX = (pageWidth - textWidth) / 2;
    doc.text(`${inputData.input_4}`, centerX, 85); // Add the centered text to the PDF document
    startY = 100;
  } else {
    textWidth = doc.getTextWidth(inputData.input_2); // for PAYROLL, title is index #2
    const pageWidth = doc.internal.pageSize.width;
    const centerX = (pageWidth - textWidth) / 2;
    doc.text(`${inputData.input_2}`, centerX, 70); // Add the centered text to the PDF document
    startY = 80;
  }

  // const totalSum = tableData.reduce((acc, row) => acc + row[4], 0);
  // const totalRow = ["", "", "", "", totalSum, ""];
  doc.autoTable({
    startY,
    head: [["Description", "Quantity", "Unit", "Rate", "Total", "Remarks"]],
    // body: [...tableData, totalRow],
    body: tableData.map((row) => {
      const { description, quantity, unit, rate, remarks } = row;
      return [description, quantity, unit, rate, quantity * rate, remarks];
    }),
    theme: "striped",
  });

  doc.setFontSize(11);
  if (selectedOption === "QUOTE") {
    doc.text(`Terms and Agreemant`, 10, 175);
    doc.text(`1. ${inputData.Downpayment}% downpayment`, 10, 185);
  }

  // Save the PDF document
  doc.save(
    `${selectedOption} - ${inputData.DocNum} - ${inputData.Date} - ${inputData.To}.pdf`
  );
};
