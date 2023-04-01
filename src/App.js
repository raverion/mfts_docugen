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
          name: "input_0",
          label: "To:",
          placeholder:
            "Name of Client / Company (e.g. Mr. Jones; Lubeck Shipping, LLC.; etc.)",
        },
        {
          name: "input_1",
          label: "Address:",
          placeholder: "Location of Client / Project",
        },
        { name: "input_2", label: "Date:", placeholder: "01-October-2022" },
        { name: "input_3", label: "Invoice #:", placeholder: "INVxxxx" },
        {
          name: "input_4",
          label: "Title:",
          placeholder: "Summarize the project in 10 words or less",
        },
        {
          name: "input_5",
          label: "Corporate discount (%):",
          placeholder: "This is optional",
        },
      ],
      INV: [
        // Invoice
        {
          name: "input_0",
          label: "To:",
          placeholder:
            "Name of Client / Company (e.g. Mr. Jones; Lubeck Shipping, LLC.; etc.)",
        },
        {
          name: "input_1",
          label: "Address:",
          placeholder: "Location of Client / Project",
        },
        { name: "input_2", label: "Date:", placeholder: "01-October-2022" },
        { name: "input_3", label: "Invoice #:", placeholder: "INVxxxx" },
        {
          name: "input_4",
          label: "Title:",
          placeholder: "Summarize the project in 10 words or less",
        },
        {
          name: "input_5",
          label: "Corporate discount (%):",
          placeholder: "This is optional",
        },
      ],
      QUOTE: [
        // Quotation
        {
          name: "input_0",
          label: "To:",
          placeholder:
            "Name of Client / Company (e.g. Mr. Jones; Lubeck Shipping, LLC.; etc.)",
        },
        {
          name: "input_1",
          label: "Address:",
          placeholder: "Location of Client / Project",
        },
        { name: "input_2", label: "Date:", placeholder: "01-October-2022" },
        {
          name: "input_3",
          label: "Quotation #:",
          placeholder: "MFTSxxxxxxxx",
        },
        {
          name: "input_4",
          label: "Title:",
          placeholder: "Summarize the project in 10 words or less",
        },
        {
          name: "input_5",
          label: "Project Duration:",
          placeholder: "Total number of working days/hours",
        },
        {
          name: "input_6",
          label: "Corporate discount (%):",
          placeholder: "This is optional",
        },
        {
          name: "input_7",
          label: "Warranty:",
          placeholder: "Number of years warranty is valid",
        },
        {
          name: "input_8",
          label: "Downpayment (%):",
          placeholder: "Initial payment from client to begin work",
        },
      ],
      SOA: [
        // Statement of Account
        {
          name: "input_0",
          label: "To:",
          placeholder:
            "Name of Client / Company (e.g. Mr. Jones; Lubeck Shipping, LLC.; etc.)",
        },
        {
          name: "input_1",
          label: "Address:",
          placeholder: "Location of Client / Project",
        },
        { name: "input_2", label: "Date:", placeholder: "01-October-2022" },
        {
          name: "input_3",
          label: "Invoice/s #:",
          placeholder: "Relevant invoices, separate by comma",
        },
        {
          name: "input_4",
          label: "Title:",
          placeholder: "Summarize the project in 10 words or less",
        },
        {
          name: "input_5",
          label: "Corporate discount (%):",
          placeholder: "This is optional",
        },
      ],
      PAYROLL: [
        // Payroll
        { name: "input_0", label: "Date:", placeholder: "01-October-2022" },
        {
          name: "input_1",
          label: "Payroll #:",
          placeholder: "",
        },
        {
          name: "input_2",
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
  const [particularsFields, setFields] = useState([
    {
      description: "",
      quantity: "",
      unit: "",
      rate: "",
      total: "",
      remarks: "",
    },
  ]);
  const handleAddField = () => {
    setFields([
      ...particularsFields,
      {
        description: "",
        quantity: "",
        unit: "",
        rate: "",
        total: "",
        remarks: "",
      },
    ]);
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
                  value={field.description}
                  onChange={(e) => {
                    const values = [...particularsFields];
                    values[index].description = e.target.value;
                    setFields(values);
                  }}
                  placeholder="Description"
                  className="descriptionField"
                />
              </td>
              <td>
                <input
                  type="number"
                  value={field.quantity}
                  onChange={(e) => {
                    const values = [...particularsFields];
                    values[index].quantity = e.target.value;
                    setFields(values);
                  }}
                  placeholder="Quantity"
                  className="quantityField"
                />
              </td>
              <td>
                <input
                  type="text"
                  value={field.unit}
                  onChange={(e) => {
                    const values = [...particularsFields];
                    values[index].unit = e.target.value;
                    setFields(values);
                  }}
                  placeholder="e.g. pcs, boxes"
                  className="unitField"
                />
              </td>
              <td>
                <input
                  type="number"
                  value={field.rate}
                  onChange={(e) => {
                    const values = [...particularsFields];
                    values[index].rate = e.target.value;
                    setFields(values);
                  }}
                  placeholder="AED"
                  className="rateField"
                />
              </td>
              <td>
                <input
                  type="number"
                  value={field.total}
                  onChange={(e) => {
                    const values = [...particularsFields];
                    values[index].total = e.target.value;
                    setFields(values);
                  }}
                  placeholder="AED"
                  className="totalField"
                />
              </td>
              <td>
                <input
                  type="text"
                  value={field.remarks}
                  onChange={(e) => {
                    const values = [...particularsFields];
                    values[index].remarks = e.target.value;
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
    let inputData = {};
    if (selectedOption === "QUOTE") {
      inputData = {
        input_0: inputFields[0].input_0,
        input_1: inputFields[1].input_1,
        input_2: inputFields[2].input_2,
        input_3: inputFields[3].input_3,
        input_4: inputFields[4].input_4,
        input_5: inputFields[5].input_5,
        input_6: inputFields[6].input_6,
        input_7: inputFields[7].input_7,
        input_8: inputFields[8].input_8,
      };
    } else if (selectedOption !== "PAYROLL") {
      inputData = {
        input_0: inputFields[0].input_0,
        input_1: inputFields[1].input_1,
        input_2: inputFields[2].input_2,
        input_3: inputFields[3].input_3,
        input_4: inputFields[4].input_4,
        input_5: inputFields[5].input_5,
      };
    } else {
      inputData = {
        input_0: inputFields[0].input_0,
        input_1: inputFields[1].input_1,
        input_2: inputFields[2].input_2,
      };
    }

    const tableData = particularsFields.map((field) => ({
      description: field.description,
      quantity: field.quantity,
      unit: field.unit,
      rate: field.rate,
      total: field.total,
      remarks: field.remarks,
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
