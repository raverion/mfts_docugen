// import logo from "./logo.svg";
import "./App.css";
import React, { useState } from "react";
import { useEffect } from "react";
import jsPDF from "jspdf";

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
      Option1: [
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
        { name: "InvoiceNum", label: "Invoice #:", placeholder: "INVxxxx" },
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
      Option2: [
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
        { name: "InvoiceNum", label: "Invoice #:", placeholder: "INVxxxx" },
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
      Option3: [
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
          name: "QuoteNum",
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
      Option4: [
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
          name: "InvoiceNum",
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
  // "Generate" BUTTON

  const generatePDF = (inputData) => {
    const doc = new jsPDF();

    // Add content to the PDF document using the input data

    doc.text(`To: ${inputData.To}`, 10, 10);
    doc.text(`Address: ${inputData.Address}`, 10, 20);
    // ...

    // Save the PDF document
    doc.setPageSize("A4");
    doc.save("document1.pdf");
  };
  const handleGeneratePDF = () => {
    // Prepare the input data for the PDF document
    const inputData = {
      To: inputFields[0].To,
      Address: inputFields[1].Address,

      // ...
    };

    // Call the generatePDF function
    generatePDF(inputData);
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
        <option value="Option1">Acknowledgement Receipt</option>
        <option value="Option2">Invoice</option>
        <option value="Option3">Quotation</option>
        <option value="Option4">Statement of Account</option>
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
              placeholder="Description"
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
              placeholder="Unit Price (AED)"
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
              placeholder="Remarks"
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
        Generate Document
      </button>
    </div>
  );
};

export default App;

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }
// export default App;
