import "./App.css";
import React, { useState } from "react";
import { useEffect } from "react";
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

      // alert(`OptionFields0=>${name}`);

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

  const renderTableFields = () => {
    return (
      <table>
        <thead>
          <tr>
            <th>Description</th>
            <th>Quantity</th>
            <th>Unit</th>
            <th>Rate</th>
            <th>Total</th>
            <th>Remarks</th>
          </tr>
        </thead>
        <tbody>
          {particularsFields.map((field, index) => (
            <tr key={index}>
              <td>
                <input
                  type="text"
                  value={field.label}
                  onChange={(e) => {
                    const values = [...particularsFields];
                    values[index].label = e.target.value;
                    setFields(values);
                  }}
                  placeholder="Description"
                  className="descriptionField"
                />
              </td>
              <td>
                <input
                  type="number"
                  value={field.value}
                  onChange={(e) => {
                    const values = [...particularsFields];
                    values[index].value = e.target.value;
                    setFields(values);
                  }}
                  placeholder="Quantity"
                  className="quantityField"
                />
              </td>
              <td>
                <input
                  type="text"
                  value={field.value}
                  onChange={(e) => {
                    const values = [...particularsFields];
                    values[index].value = e.target.value;
                    setFields(values);
                  }}
                  placeholder="e.g. pcs, boxes"
                  className="unitField"
                />
              </td>
              <td>
                <input
                  type="number"
                  value={field.value}
                  onChange={(e) => {
                    const values = [...particularsFields];
                    values[index].value = e.target.value;
                    setFields(values);
                  }}
                  placeholder="AED"
                  className="rateField"
                />
              </td>
              <td>
                <input
                  type="number"
                  value={field.value}
                  onChange={(e) => {
                    const values = [...particularsFields];
                    values[index].value = e.target.value;
                    setFields(values);
                  }}
                  placeholder="AED"
                  className="totalField"
                />
              </td>
              <td>
                <input
                  type="text"
                  value={field.value}
                  onChange={(e) => {
                    const values = [...particularsFields];
                    values[index].value = e.target.value;
                    setFields(values);
                  }}
                  placeholder="Comments"
                  className="remarksField"
                />
              </td>
              <td>
                <button onClick={() => handleRemoveField(index)}>Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
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
    };

    const tableData = particularsFields.map((field) => ({
      description: field.label,
      quantity: field.value,
      unit: "",
      rate: "",
      total: "",
      remarks: "",
    }));

    // Call the generatePDF function
    generatePDF(selectedOption, inputData, tableData);
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

      <div>{renderTableFields()}</div>
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
