import jsPDF from "jspdf";
import "jspdf-autotable";

export const generatePDF = (
  selectedOption,
  inputData,
  tableDataA,
  tableData,
  tableDataB
) => {
  const doc = new jsPDF();

  const logoScale = 0.8;
  const footerScale = 1.4;
  const xLeft = 15;
  const xRight = 140;

  let totalSumA = tableDataA.reduce(
    (acc, obj) => acc + Number(obj.quantity * obj.rate),
    0
  );
  let totalSum = tableData.reduce(
    (acc, obj) => acc + Number(obj.quantity * obj.rate),
    0
  );
  let totalFinalSum = totalSumA + totalSum;

  let currY = 0;

  let imgData = require("./MFTS_logo.png"); // Load the image file
  doc.addImage(
    imgData,
    "PNG",
    65, // X coordinate of the image
    5, // Y coordinate of the image
    Math.trunc(96 * logoScale), // Width of the image
    Math.trunc(30 * logoScale) // Height of the image
  );

  // Set the font and font size
  doc.setFont("helvetica");
  doc.setFontSize(9);

  if (selectedOption !== "PAYROLL") {
    // Add content to the PDF document using the input data
    doc.text(`To: ${inputData.input_0}`, xLeft, 35); // To
    doc.text(`Address: ${inputData.input_1}`, xLeft, 40); // Address
    doc.text(`Date: ${inputData.input_2}`, xRight, 35); // Date
    doc.text(`Quote/Invoice#: ${inputData.input_3}`, xRight, 40); // DocNum
  }

  doc.setFontSize(14);
  if (selectedOption === "ACKRECEIPT") {
    doc.text(`ACKNOWLEDGEMENT RECEIPT`, 70, 50);
  } else if (selectedOption === "INV") {
    doc.text(`INVOICE`, 95, 50);
  } else if (selectedOption === "QUOTE") {
    doc.text(`QUOTATION`, 90, 50);
  } else if (selectedOption === "SOA") {
    doc.text(`STATEMENT OF ACCOUNT`, 70, 50);
  } else if (selectedOption === "PAYROLL") {
    doc.text(`PAYROLL`, 95, 40);
  }

  // Set the text to center align
  let textWidth = 0;
  doc.setFontSize(11);
  if (selectedOption !== "PAYROLL") {
    textWidth = doc.getTextWidth(inputData.input_4);
    const pageWidth = doc.internal.pageSize.width;
    const centerX = (pageWidth - textWidth) / 2;
    doc.text(`${inputData.input_4}`, centerX, 57); // Add the centered text to the PDF document
    currY = 64;
  } else {
    textWidth = doc.getTextWidth(inputData.input_2); // for PAYROLL, title is index #2
    const pageWidth = doc.internal.pageSize.width;
    const centerX = (pageWidth - textWidth) / 2;
    doc.text(`${inputData.input_2}`, centerX, 42); // Add the centered text to the PDF document
    currY = 49;
  }

  doc.setFontSize(10);

  doc.text(`PARTICULARS:`, xLeft, currY);
  currY += 2;
  doc.autoTable({
    startY: currY,
    // headStyles: { halign: "center", fillColor: [52, 79, 188] },
    headStyles: {
      halign: "center",
      fillColor: [120, 120, 120],
      fontSize: 8,
      lineColor: [0, 0, 0],
      lineWidth: 0.1,
    },
    footStyles: {
      halign: "left",
      fillColor: [190, 190, 190],
      textColor: [0, 0, 0],
      fontSize: 8,
      lineColor: [0, 0, 0],
      lineWidth: 0.1,
    },
    bodyStyles: {
      fontSize: 8,
    },
    head: [["Description", "Quantity", "Unit", "Rate", "Amount", "Remarks"]],
    body: tableDataA.map((row) => {
      const { description, quantity, unit, rate, remarks } = row;
      return [description, quantity, unit, rate, quantity * rate, remarks];
    }),
    foot: [["", "", "", "Subtotal", `${totalSumA}   AED`, ""]],
    theme: "striped",
  });

  currY = currY + tableDataA.length * 10 + 13;

  doc.text(`MATERIALS:`, xLeft, currY);
  currY += 2;
  doc.autoTable({
    startY: currY,
    // headStyles: { halign: "center", fillColor: [52, 79, 188] },
    headStyles: {
      halign: "center",
      fillColor: [120, 120, 120],
      fontSize: 8,
      lineColor: [0, 0, 0],
      lineWidth: 0.1,
    },
    footStyles: {
      halign: "left",
      fillColor: [190, 190, 190],
      textColor: [0, 0, 0],
      fontSize: 8,
      lineColor: [0, 0, 0],
      lineWidth: 0.1,
    },
    bodyStyles: {
      fontSize: 8,
    },
    head: [["Description", "Quantity", "Unit", "Rate", "Amount", "Remarks"]],
    body: tableData.map((row) => {
      const { description, quantity, unit, rate, remarks } = row;
      return [description, quantity, unit, rate, quantity * rate, remarks];
    }),
    foot: [["", "", "", "Subtotal", `${totalSum}   AED`, ""]],
    theme: "striped",
  });

  currY = currY + tableData.length * 10 + 10;

  // Total
  doc.autoTable({
    startY: currY,
    footStyles: {
      halign: "left",
      fillColor: [0, 0, 0],
      // textColor: [0, 0, 0],
      fontSize: 8,
      lineColor: [0, 0, 0],
    },
    foot: [
      ["", "", "", "", "", "", "", "", "", "Total", `${totalFinalSum}   AED`],
    ],
    theme: "striped",
  });

  currY += 15;

  doc.text(`SCOPE OF WORK:`, xLeft, currY);
  currY += 2;
  doc.autoTable({
    startY: currY,
    bodyStyles: {
      fontSize: 8,
    },
    body: tableDataB.map((row) => {
      const { description, remarks } = row;
      return [description, remarks];
    }),
    theme: "striped",
  });

  if (selectedOption === "QUOTE") {
    doc.setFontSize(11);
    doc.text(`Project Duration: ${inputData.input_5}`, xLeft, 195);
    doc.setFontSize(8);
    doc.text(`Terms and Agreement:`, xLeft, 203);
    doc.text(
      `1. ${
        inputData.input_8
      }% downpayment upon confirmation of this quotation, and ${
        100 - inputData.input_8
      }% upon completion of the project.`,
      xLeft,
      208
    );
    doc.text(
      `2. Work will not commence without the advance payment.`,
      xLeft,
      213
    );
    if (inputData.input_7) {
      // if Warranty field is populated
      doc.text(
        `3. Warranty is valid for ${inputData.input_7} starting from date of project commencement.`,
        xLeft,
        218
      );
    }
  }

  if (selectedOption !== "PAYROLL") {
    imgData = require("./Footer.png");
    doc.addImage(
      imgData,
      "PNG",
      xLeft - 3, // X coordinate of the image
      221, // Y coordinate of the image
      Math.trunc(122 * footerScale), // Width of the image
      Math.trunc(50 * footerScale) // Height of the image
    );
  }
  // Save the PDF document
  if (selectedOption === "QUOTE") {
    doc.save(
      `${inputData.input_3} - ${inputData.input_2} - ${inputData.input_0}.pdf`
    );
  } else if (selectedOption !== "PAYROLL") {
    doc.save(
      `${selectedOption} - ${inputData.input_3} - ${inputData.input_2} - ${inputData.input_0}.pdf`
    );
  } else {
    doc.save(`${inputData.input_1} - ${inputData.input_0}.pdf`);
  }
};
