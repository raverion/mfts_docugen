// import logo from "./logo.svg";
import "./App.css";
import React, { useState } from "react";
import { useEffect } from "react";
// import jsPDF from "jspdf";
import { generatePDF } from "./generateDoc";

const App = () => {
  useEffect(() => {
    document.title = "MFTS Docugen";
  }, []);

  //-------------------------------------------------------------------------------------------------------
  // HEADER FIELDS
  const [selectedOption, setSelectedOption] = useState("");
  const [inputFields, setInputFields] = useState([]);
  const handleOptionChange = (e) => {
    const value = e.target.value;
    setSelectedOption(value);
    setInputFields([]); // Reset the input fields whenever the selected option changes
  };
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const updatedFields = [...inputFields];
    updatedFields[index] = {
      ...updatedFields[index],
      [name]: value,
    };
    setInputFields(updatedFields);
  };

  const renderInputFields = () => {
    if (selectedOption === "") {
      return null;
    }

    const optionFields = getOptionFields(selectedOption);

    return optionFields.map((field, index) => {
      const { name, label, placeholder } = field;

      return (
        <div key={index}>
          <label className="labels">{label}</label>
          <input
            type="text"
            name={name}
            placeholder={placeholder}
            className="inputField"
            onChange={(e) => handleInputChange(e, index)}
          />
        </div>
      );
    });
  };

  const getOptionFields = (option) => {
    // Define the input fields for each option
    const options = {
      ACKRECEIPT: [
        // Acknowledgement Receipt
        {
          name: "To",
          label: "To:",
          placeholder:
            "Name of Client / Company (e.g. Mr. Jones; Lubeck Shipping, LLC.; etc.)",
        },
        {
          name: "Address",
          label: "Address:",
          placeholder: "Location of Client / Project",
        },
        { name: "Date", label: "Date:", placeholder: "01-October-2022" },
        { name: "DocNum", label: "Invoice #:", placeholder: "INVxxxx" },
        {
          name: "Title",
          label: "Title:",
          placeholder: "Summarize the project in 10 words or less",
        },
        {
          name: "CorpDiscount",
          label: "Corporate discount (%):",
          placeholder: "This is optional",
        },
      ],
      INV: [
        // Invoice
        {
          name: "To",
          label: "To:",
          placeholder:
            "Name of Client / Company (e.g. Mr. Jones; Lubeck Shipping, LLC.; etc.)",
        },
        {
          name: "Address",
          label: "Address:",
          placeholder: "Location of Client / Project",
        },
        { name: "Date", label: "Date:", placeholder: "01-October-2022" },
        { name: "DocNum", label: "Invoice #:", placeholder: "INVxxxx" },
        {
          name: "Title",
          label: "Title:",
          placeholder: "Summarize the project in 10 words or less",
        },
        {
          name: "CorpDiscount",
          label: "Corporate discount (%):",
          placeholder: "This is optional",
        },
      ],
      QUOTE: [
        // Quotation
        {
          name: "To",
          label: "To:",
          placeholder:
            "Name of Client / Company (e.g. Mr. Jones; Lubeck Shipping, LLC.; etc.)",
        },
        {
          name: "Address",
          label: "Address:",
          placeholder: "Location of Client / Project",
        },
        { name: "Date", label: "Date:", placeholder: "01-October-2022" },
        {
          name: "DocNum",
          label: "Quotation #:",
          placeholder: "MFTSxxxxxxxx",
        },
        {
          name: "Title",
          label: "Title:",
          placeholder: "Summarize the project in 10 words or less",
        },
        {
          name: "Duration",
          label: "Project Duration:",
          placeholder: "Total number of working days/hours",
        },
        {
          name: "CorpDiscount",
          label: "Corporate discount (%):",
          placeholder: "This is optional",
        },
        {
          name: "Warranty",
          label: "Warranty:",
          placeholder: "Number of years warranty is valid",
        },
      ],
      SOA: [
        // Statement of Account
        {
          name: "To",
          label: "To:",
          placeholder:
            "Name of Client / Company (e.g. Mr. Jones; Lubeck Shipping, LLC.; etc.)",
        },
        {
          name: "Address",
          label: "Address:",
          placeholder: "Location of Client / Project",
        },
        { name: "Date", label: "Date:", placeholder: "01-October-2022" },
        {
          name: "DocNum",
          label: "Invoice/s #:",
          placeholder: "Relevant invoices, separate by comma",
        },
        {
          name: "Title",
          label: "Title:",
          placeholder: "Summarize the project in 10 words or less",
        },
        {
          name: "CorpDiscount",
          label: "Corporate discount (%):",
          placeholder: "This is optional",
        },
      ],
      PAYROLL: [
        // Payroll
        { name: "Date", label: "Date:", placeholder: "01-October-2022" },
        {
          name: "DocNum",
          label: "Payroll #:",
          placeholder: "",
        },
        {
          name: "Title",
          label: "Title:",
          placeholder: "Summarize the project in 10 words or less",
        },
      ],
    };

    return options[option] || [];
  };
  //-------------------------------------------------------------------------------------------------------

  //-------------------------------------------------------------------------------------------------------
  // TABLE FIELDS
  const [particularsFields, setFields] = useState([{ label: "", value: "" }]);
  const handleAddField = () => {
    setFields([...particularsFields, { label: "", value: "" }]);
  };
  const handleRemoveField = (index) => {
    const values = [...particularsFields];
    values.splice(index, 1);
    setFields(values);
  };
  //-------------------------------------------------------------------------------------------------------

  //-------------------------------------------------------------------------------------------------------
  const handleGeneratePDF = () => {
    // Prepare the input data for the PDF document
    const inputData = {
      To: inputFields[0].To,
      Address: inputFields[1].Address,
      Date: inputFields[2].Date,
      DocNum: inputFields[3].DocNum,

      // ...
    };

    // Call the generatePDF function
    generatePDF(selectedOption, inputData);
  };
  //-------------------------------------------------------------------------------------------------------

  //-------------------------------------------------------------------------------------------------------
  // JSX
  return (
    <div className="App">
      <label htmlFor="dropdown" className="dropdownLabel">
        Select Document Type:
      </label>
      <select
        id="dropdown"
        value={selectedOption}
        onChange={handleOptionChange}
      >
        <option value="">--Please select an option--</option>
        <option value="ACKRECEIPT">Acknowledgement Receipt</option>
        <option value="INV">Invoice</option>
        <option value="QUOTE">Quotation</option>
        <option value="SOA">Statement of Account</option>
        <option value="PAYROLL">Payroll</option>
      </select>

      <div>{renderInputFields()}</div>

      <div className="separator"></div>
      <div className="particulars_label">Particulars:</div>
      <div className="separator"></div>

      <div>
        {particularsFields.map((field, index) => (
          <div key={index}>
            {/* <label htmlFor={`description${index}`}>Description:</label> */}
            <input
              type="text"
              id={`description${index}`}
              className="descriptionField"
              name="description"
              value={field.description}
              placeholder="Description / Name"
            />
            {/* <label htmlFor={`quantities${index}`}>Quantity:</label> */}
            <input
              type="text"
              id={`quantities${index}`}
              className="quantityField"
              name="quantities"
              value={field.quantities}
              placeholder="Quantity"
            />
            {/* <label htmlFor={`unit_prices${index}`}>Unit Price:</label> */}
            <input
              type="text"
              id={`unit_prices${index}`}
              className="unitPriceField"
              name="unit_prices"
              value={field.unit_prices}
              placeholder="Rate (AED)"
            />
            {/* <label htmlFor={`amounts${index}`}>Amount:</label> */}
            <input
              type="text"
              id={`amounts${index}`}
              className="amountField"
              name="amounts"
              value={field.amounts}
              placeholder="Total (AED)"
            />
            {/* <label htmlFor={`remarks${index}`}>Remarks:</label> */}
            <input
              type="text"
              id={`remarks${index}`}
              className="remarksField"
              name="remarks"
              value={field.remarks}
              placeholder="Remarks / Signature"
            />

            <button
              className="RemoveFieldButton"
              onClick={() => handleRemoveField(index)}
            >
              Remove Field
            </button>
          </div>
        ))}
      </div>
      <div>
        <button className="AddItemButton" onClick={handleAddField}>
          Add Item
        </button>
      </div>
      <button className="GenerateButton" onClick={handleGeneratePDF}>
        Generate pdf
      </button>
      <button className="GenerateButton">Generate xlsx</button>
    </div>
  );
};

export default App;
