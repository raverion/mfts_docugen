// import logo from "./logo.svg";
import "./App.css";
import React, { useState } from "react";
import { useEffect } from "react";

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
      const { name, label } = field;

      return (
        <div key={index}>
          <label className="labels">{label}</label>
          <input
            type="text"
            name={name}
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
        { name: "To", label: "To:" },
        { name: "Address", label: "Address:" },
        { name: "Date", label: "Date:" },
        { name: "InvoiceNum", label: "Invoice #:" },
        { name: "Title", label: "Title:" },
        { name: "CorpDiscount", label: "Corporate discount (%):" },
      ],
      Option2: [
        // Invoice
        { name: "To", label: "To:" },
        { name: "Address", label: "Address:" },
        { name: "Date", label: "Date:" },
        { name: "InvoiceNum", label: "Invoice #:" },
        { name: "Title", label: "Title:" },
        { name: "CorpDiscount", label: "Corporate discount (%):" },
      ],
      Option3: [
        // Quotation
        { name: "To", label: "To:" },
        { name: "Address", label: "Address:" },
        { name: "Date", label: "Date:" },
        { name: "QuoteNum", label: "Quotation #:" },
        { name: "Title", label: "Title:" },
        { name: "Duration", label: "Project Duration:" },
        { name: "CorpDiscount", label: "Corporate discount (%):" },
        { name: "Warranty", label: "Warranty:" },
      ],
      Option4: [
        // Statement of Account
        { name: "To", label: "To:" },
        { name: "Address", label: "Address:" },
        { name: "Date", label: "Date:" },
        { name: "InvoiceNum", label: "Invoice/s #:" },
        { name: "Title", label: "Title:" },
        { name: "CorpDiscount", label: "Corporate discount (%):" },
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
  const handleGenerateDocument = () => {
    console.log("Generating document:", particularsFields); // Generate document based on input fields
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
              // onChange={(event) => handleInputChange(index, event)}
            />
            {/* <label htmlFor={`quantities${index}`}>Quantity:</label> */}
            <input
              type="text"
              id={`quantities${index}`}
              className="quantityField"
              name="quantities"
              value={field.quantities}
              placeholder="Quantity"
              // onChange={(event) => handleInputChange(index, event)}
            />
            {/* <label htmlFor={`unit_prices${index}`}>Unit Price:</label> */}
            <input
              type="text"
              id={`unit_prices${index}`}
              className="unitPriceField"
              name="unit_prices"
              value={field.unit_prices}
              placeholder="Unit Price (AED)"
              // onChange={(event) => handleInputChange(index, event)}
            />
            {/* <label htmlFor={`amounts${index}`}>Amount:</label> */}
            <input
              type="text"
              id={`amounts${index}`}
              className="amountField"
              name="amounts"
              value={field.amounts}
              placeholder="Total (AED)"
              // onChange={(event) => handleInputChange(index, event)}
            />
            {/* <label htmlFor={`remarks${index}`}>Remarks:</label> */}
            <input
              type="text"
              id={`remarks${index}`}
              className="remarksField"
              name="remarks"
              value={field.remarks}
              placeholder="Remarks"
              // onChange={(event) => handleInputChange(index, event)}
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
      <button className="AddItemButton" onClick={handleAddField}>
        Add Item
      </button>
      <button className="GenerateButton" onClick={handleGenerateDocument}>
        Generate
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
