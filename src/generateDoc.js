import jsPDF from "jspdf";
import "jspdf-autotable";

export const generatePDF = (selectedOption, inputData, tableData) => {
  const doc = new jsPDF();

  const logoScale = 1;
  const footerScale = 1.4;
  const xLeft = 15;
  const xRight = 140;

  // Load the image file
  let imgData = require("./MFTS_logo.png");
  // Add the image to the PDF document
  doc.addImage(
    imgData,
    "PNG",
    55, // X coordinate of the image
    10, // Y coordinate of the image
    Math.trunc(96 * logoScale), // Width of the image
    Math.trunc(30 * logoScale) // Height of the image
  );

  // Set the font and font size
  doc.setFont("helvetica");
  doc.setFontSize(11);

  if (selectedOption !== "PAYROLL") {
    // Add content to the PDF document using the input data
    doc.text(`To: ${inputData.input_0}`, xLeft, 55); // To
    doc.text(`Address: ${inputData.input_1}`, xLeft, 60); // Address
    doc.text(`Date: ${inputData.input_2}`, xRight, 55); // Date
    doc.text(`Quote/Invoice#: ${inputData.input_3}`, xRight, 60); // DocNum
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

  if (selectedOption === "QUOTE") {
    doc.setFontSize(11);
    // doc.text(`Project Duration: ${}`)
    doc.setFontSize(9);
    doc.text(`Terms and Agreement:`, xLeft, 200);
    doc.text(
      `1. ${
        inputData.input_8
      }% downpayment upon confirmation of this quotation, and ${
        100 - inputData.input_8
      }% upon completion of the project.`,
      xLeft,
      205
    );
    doc.text(
      `2. Work will not commence without the advance payment.`,
      xLeft,
      210
    );
  }

  if (selectedOption !== "PAYROLL") {
    imgData = require("./Footer.png");
    // Add the image to the PDF document
    doc.addImage(
      imgData,
      "PNG",
      xLeft - 3, // X coordinate of the image
      215, // Y coordinate of the image
      Math.trunc(122 * footerScale), // Width of the image
      Math.trunc(50 * footerScale) // Height of the image
    );
  }
  // Save the PDF document
  doc.save(
    `${selectedOption} - ${inputData.DocNum} - ${inputData.Date} - ${inputData.To}.pdf`
  );
};
