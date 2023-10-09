import React, { useState } from 'react';
import { getDatabase, ref, set } from "firebase/database";
import { db } from "./firebase";
import './App.css';
import Lpage from './lpage';
import Epage from './epage';


function MultiStepForm() {
  const [isSubmitted, setsubmit] = useState(0);
  const [formData, setFormData] = useState({
    form1: {
      facultyName: '',
      employeeID: '',
      facultyEmail: '',
    },
    form2: [{
      journalName: '',
      authorName: '',
      journalTitle: '',
      volume: '',
      issueNumber: '',
      page: '',
      impactFactor: '',
      doi: '',
      publicationDate: '',
      issn: '',
      academicYear: '',
      type_of_publication: '',
      publisher: '',
    }],
    form3: [{
      journalName: '',
      authorName: '',
      journalTitle: '',
      volume: '',
      issueNumber: '',
      page: '',
      impactFactor: '',
      doi: '',
      publicationDate: '',
      issn: '',
      academicYear: '',
      type_of_publication: '',
      publisher: '',
    }],
    form4: [{
      conferenceName: '',
      conferenceDate: '',
      conferencePlace: '',
      authorsName: '',
      conferenceTitle: '',
      volume: '',
      page: '',
      impactFactor: '',
      doi: '',
      publicationDate: '',
      issn: '',
      issue: '',
      academicYear: '',
      type_of_publication: '',
      publisher: '',
    }],
    form5: [{
      authorName: '',
      paperTitle: '',
      volume: '',
      page: '',
      impactFactor: '',
      doi: '',
      publicationDate: '',
      issn: '',
      academicYear: '',
      type_of_publication: '',
      publisher: '',
    }],
  });
  
  const handleAddEntryForm2 = () => {
    setFormData({
      ...formData,
      form2: [
        ...formData.form2,
        {
          journalName: '',
          authorName: '',
          journalTitle: '',
          volume: '',
          issueNumber: '',
          page: '',
          impactFactor: '',
          doi: '',
          publicationDate: '',
          issn: '',
          academicYear: '',
          type_of_publication: '',
          publisher: '',
        },
      ],
    });
  };
  
  const handleAddEntryForm3 = () => {
    setFormData({
      ...formData,
      form3: [
        ...formData.form3,
        {
          journalName: '',
          authorName: '',
          journalTitle: '',
          volume: '',
          issueNumber: '',
          page: '',
          impactFactor: '',
          doi: '',
          publicationDate: '',
          issn: '',
          academicYear: '',
          type_of_publication: '',
          publisher: '',
        },
      ],
    });
  };

  const handleAddEntryForm4 = () => {
    setFormData({
      ...formData,
      form4: [
        ...formData.form4,
        {
          conferenceName: '',
          conferenceDate: '',
          conferencePlace: '',
          authorsName: '',
          conferenceTitle: '',
          volume: '',
          page: '',
          impactFactor: '',
          doi: '',
          publicationDate: '',
          issn: '',
          issue: '',
          academicYear: '',
          type_of_publication: '',
          publisher: '',
        },
      ],
    });
  };

  const handleAddEntryForm5 = () => {
    setFormData({
      ...formData,
      form5: [
        ...formData.form5,
        {
          authorName: '',
          paperTitle: '',
          volume: '',
          page: '',
          impactFactor: '',
          doi: '',
          publicationDate: '',
          issn: '',
          academicYear: '',
          type_of_publication: '',
          publisher: '',
        },
      ],
    });
  };

  const handleDeleteEntryForm2 = (index) => {
    const updatedFormData = { ...formData };
    updatedFormData.form2.splice(index, 1);
    setFormData(updatedFormData);
  };

  const handleDeleteEntryForm3 = (index) => {
    const updatedFormData = { ...formData };
    updatedFormData.form3.splice(index, 1);
    setFormData(updatedFormData);
  };

  const handleDeleteEntryForm4 = (index) => {
    const updatedFormData = { ...formData };
    updatedFormData.form4.splice(index, 1);
    setFormData(updatedFormData);
  };

  const handleDeleteEntryForm5 = (index) => {
    const updatedFormData = { ...formData };
    updatedFormData.form5.splice(index, 1);
    setFormData(updatedFormData);
  };
  const handleEntryInputChange = (e, formName, index) => {
    const updatedFormData = { ...formData };
    updatedFormData[formName][index][e.target.name] = e.target.value;
    setFormData(updatedFormData);
  };

  const [currentStep, setCurrentStep] = useState(1);

  const handleInputChange = (e, formName) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [formName]: {
        ...prevData[formName],
        [name]: value,
      },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault(); 
    if (currentStep !== 5) return nextStep();

    const publications = {
      SCI_Publications: formData.form2,
      SCOPUS_Publications: formData.form3,
      Conference_Publications: formData.form4,
      Book_chapter: formData.form5
    };

    set(ref(db, 'users/' + formData.form1.employeeID), {
      Faculty_Name: formData.form1.facultyName,
      Email: formData.form1.facultyEmail,
      Employee_Id: formData.form1.employeeID,
      Publications: publications
    });

    setsubmit(1);
    alert('Form Submitted');
    console.log('Form submitted:', formData);
  };

  const nextStep = () => {
    setCurrentStep(i => {
      if (i >= 5) return i
      return i + 1
    });
  };

  const prevStep = () => {
    setCurrentStep(i => {
      if (i <= 0) return i
      return i - 1
    });
  };

  const renderForm = () => {
    switch (currentStep) {
      case 1:
        return (
          <div>
            <h2>Faculty Details</h2>
            <label htmlFor="facultyName">Name:</label>
            <input
              required
              type="text"
              id="facultyName"
              name="facultyName"
              value={formData.form1.facultyName}
              onChange={(e) => handleInputChange(e, 'form1')}
              placeholder="Enter Name"
            />
            <label htmlFor="employeeID">Employee ID:</label>
            <input
              required
              type="text"
              id="employeeID"
              name="employeeID"
              value={formData.form1.employeeID}
              onChange={(e) => handleInputChange(e, 'form1')}
              placeholder="Enter Employee ID"
            />
            <label htmlFor="facultyEmail">Email:</label>
            <input
              required
              type="email"
              id="facultyEmail"
              name="facultyEmail"
              value={formData.form1.facultyEmail}
              onChange={(e) => handleInputChange(e, 'form1')}
              placeholder="Enter Email"
            />
          </div>
        );
      

        case 2:
  return (
    <div>
      <h2>SCI Publications</h2>
      {formData.form2.map((entry, index) => (
        <div key={index}>
          <h3>{`Entry ${index + 1}`}</h3>
          <label htmlFor={`journalName-${index}`}>Name of Journal:</label>
          <input
            required
            type="text"
            id={`journalName-${index}`}
            name="journalName"
            value={entry.journalName}
            onChange={(e) => handleEntryInputChange(e, 'form2', index)}
            placeholder="Enter Journal Name"
          />
          <label htmlFor={`authorName-${index}`}>Author:</label>
          <input
            required
            type="text"
            id={`authorName-${index}`}
            name="authorName"
            value={entry.authorName}
            onChange={(e) => handleEntryInputChange(e, 'form2', index)}
            placeholder="Enter Author's Name"
          />
          <label htmlFor={`journalTitle-${index}`}>Title of Journal Paper:</label>
          <input
            required
            type="text"
            id={`journalTitle-${index}`}
            name="journalTitle"
            value={entry.journalTitle}
            onChange={(e) => handleEntryInputChange(e, 'form2', index)}
            placeholder="Enter Title of Journal Paper"
          />
          <label htmlFor={`volume-${index}`}>Volume:</label>
          <input
            required
            type="text"
            id={`volume-${index}`}
            name="volume"
            value={entry.volume}
            onChange={(e) => handleEntryInputChange(e, 'form2', index)}
            placeholder="Enter Volume"
          />
          <label htmlFor={`issueNumber-${index}`}>Issue:</label>
          <input
          required
            type="text"
            id={`issueNumber-${index}`}
            name="issueNumber"
            value={entry.issueNumber}
            onChange={(e) => handleEntryInputChange(e, 'form2', index)}
            placeholder="Enter Issue Number"
          />
          <label htmlFor={`page-${index}`}>Page(s):</label>
          <input
          required
            type="text"
            id={`page-${index}`}
            name="page"
            value={entry.page}
            onChange={(e) => handleEntryInputChange(e, 'form2', index)}
            placeholder="Enter Page(s)"
          />
          <label htmlFor={`impactFactor-${index}`}>IF:</label>
          <input
          required
            type="text"
            id={`impactFactor-${index}`}
            name="impactFactor"
            value={entry.impactFactor}
            onChange={(e) => handleEntryInputChange(e, 'form2', index)}
            placeholder="Enter IF"
          />
          <label htmlFor={`doi-${index}`}>DOI:</label>
          <input
          required
            type="text"
            id={`doi-${index}`}
            name="doi"
            value={entry.doi}
            onChange={(e) => handleEntryInputChange(e, 'form2', index)}
            placeholder="Enter DOI"
          />
          <label htmlFor={`publicationDate-${index}`}>Date of Publication:</label>
          <input
          required
            type="date"
            id={`publicationDate-${index}`}
            name="publicationDate"
            value={entry.publicationDate}
            onChange={(e) => handleEntryInputChange(e, 'form2', index)}
            placeholder="Enter Date of Publication"
          />
          <label htmlFor={`issn-${index}`}>ISSN:</label>
          <input
          required
            type="text"
            id={`issn-${index}`}
            name="issn"
            value={entry.issn}
            onChange={(e) => handleEntryInputChange(e, 'form2', index)}
            placeholder="Enter ISSN"
          />
          <label htmlFor={`academicYear-${index}`}>Academic Year:</label>
          <select
            required
            id={`academicYear-${index}`}
            name="academicYear"
            value={entry.academicYear}
            onChange={(e) => handleEntryInputChange(e, 'form2', index)}
          >
            <option value="">Select Academic Year</option>
            <option value="2019-2020">2019-2020</option>
            <option value="2020-2021">2020-2021</option>
            <option value="2021-2022">2021-2022</option>
            <option value="2022-2023">2022-2023</option>
            <option value="2023-2024">2023-2024</option>
          </select>
          <label htmlFor={`type_of_publication-${index}`}>Type of publication:</label>
          <select
            required
            id={`type_of_publication-${index}`}
            name="type_of_publication"
            value={entry.type_of_publication}
            onChange={(e) => handleEntryInputChange(e, 'form2', index)}
          >
            <option value="">Select type of publication</option>
            <option value="National">National</option>
            <option value="International">International</option>
          </select>
          <label htmlFor={`publisher-${index}`}>Publisher:</label>
          <input
          required
            type="text"
            id={`publisher-${index}`}
            name="publisher"
            value={entry.publisher}
            onChange={(e) => handleEntryInputChange(e, 'form2', index)}
            placeholder="Enter Publisher"
          />
              <div className="button-container">
              {formData.form2.length > 1 && (
                <button className="delete-button" onClick={() => handleDeleteEntryForm2(index)}>Delete Entry</button>
              )}
              </div>
        </div>
      ))}
      <div className="button-container">
      <button className="custom-button" onClick={handleAddEntryForm2}>Add More Entries</button>
      </div>
    </div>
  );


  case 3:
    return (
      <div>
        <h2>SCOPUS Publications</h2>
        {formData.form3.map((entry, index) => (
          <div key={index}>
            <h3>{`Entry ${index + 1}`}</h3>
            <label htmlFor={`journalName-${index}`}>Name of Journal:</label>
            <input
            required
              type="text"
              id={`journalName-${index}`}
              name="journalName"
              value={entry.journalName}
              onChange={(e) => handleEntryInputChange(e, 'form3', index)}
              placeholder="Enter Journal Name"
            />
            <label htmlFor={`authorName-${index}`}>Author:</label>
            <input
            required
              type="text"
              id={`authorName-${index}`}
              name="authorName"
              value={entry.authorName}
              onChange={(e) => handleEntryInputChange(e, 'form3', index)}
              placeholder="Enter Author's Name"
            />
            <label htmlFor={`journalTitle-${index}`}>Title of Journal Paper:</label>
            <input
            required
              type="text"
              id={`journalTitle-${index}`}
              name="journalTitle"
              value={entry.journalTitle}
              onChange={(e) => handleEntryInputChange(e, 'form3', index)}
              placeholder="Enter Title of Journal Paper"
            />
            <label htmlFor={`volume-${index}`}>Volume:</label>
            <input
            required
              type="text"
              id={`volume-${index}`}
              name="volume"
              value={entry.volume}
              onChange={(e) => handleEntryInputChange(e, 'form3', index)}
              placeholder="Enter Volume"
            />
            <label htmlFor={`issueNumber-${index}`}>Issue:</label>
            <input
            required
              type="text"
              id={`issueNumber-${index}`}
              name="issueNumber"
              value={entry.issueNumber}
              onChange={(e) => handleEntryInputChange(e, 'form3', index)}
              placeholder="Enter Issue Number"
            />
            <label htmlFor={`page-${index}`}>Page(s):</label>
            <input
            required
              type="text"
              id={`page-${index}`}
              name="page"
              value={entry.page}
              onChange={(e) => handleEntryInputChange(e, 'form3', index)}
              placeholder="Enter Page(s)"
            />
            <label htmlFor={`impactFactor-${index}`}>IF:</label>
            <input
            required
              type="text"
              id={`impactFactor-${index}`}
              name="impactFactor"
              value={entry.impactFactor}
              onChange={(e) => handleEntryInputChange(e, 'form3', index)}
              placeholder="Enter IF"
            />
            <label htmlFor={`doi-${index}`}>DOI:</label>
            <input
            required
              type="text"
              id={`doi-${index}`}
              name="doi"
              value={entry.doi}
              onChange={(e) => handleEntryInputChange(e, 'form3', index)}
              placeholder="Enter DOI"
            />
            <label htmlFor={`publicationDate-${index}`}>Date of Publication:</label>
            <input
            required
              type="date"
              id={`publicationDate-${index}`}
              name="publicationDate"
              value={entry.publicationDate}
              onChange={(e) => handleEntryInputChange(e, 'form3', index)}
              placeholder="Enter Date of Publication"
            />
            <label htmlFor={`issn-${index}`}>ISSN:</label>
            <input
            required
              type="text"
              id={`issn-${index}`}
              name="issn"
              value={entry.issn}
              onChange={(e) => handleEntryInputChange(e, 'form3', index)}
              placeholder="Enter ISSN"
            />
            <label htmlFor={`academicYear-${index}`}>Academic Year:</label>
            <select
              required
              id={`academicYear-${index}`}
              name="academicYear"
              value={entry.academicYear}
              onChange={(e) => handleEntryInputChange(e, 'form3', index)}
              placeholder="Enter Academic Year"
            >
            <option value="">Select Academic Year</option>
            <option value="2019-2020">2019-2020</option>
            <option value="2020-2021">2020-2021</option>
            <option value="2021-2022">2021-2022</option>
            <option value="2022-2023">2022-2023</option>
            <option value="2023-2024">2023-2024</option>
            </select>
            <label htmlFor={`type_of_publication-${index}`}>Type of publication:</label>
            <select
              required
              id={`type_of_publication-${index}`}
              name="type_of_publication"
              value={entry.type_of_publication}
              onChange={(e) => handleEntryInputChange(e, 'form3', index)}
            >
              <option value="">Select type of publication</option>
              <option value="National">National</option>
              <option value="International">International</option>
            </select>
            <label htmlFor={`publisher-${index}`}>Publisher:</label>
            <input
            required
              type="text"
              id={`publisher-${index}`}
              name="publisher"
              value={entry.publisher}
              onChange={(e) => handleEntryInputChange(e, 'form3', index)}
              placeholder="Enter Publisher"
            />
              <div className="button-container">
              {formData.form3.length > 1 && (
                <button className="delete-button" onClick={() => handleDeleteEntryForm3(index)}>Delete Entry</button>
              )}
              </div>
          </div>
        ))}
        <div className="button-container">
        <button className="custom-button" onClick={handleAddEntryForm3}>Add More Entries</button>
        </div>
      </div>
    );
  

    case 4:
      return (
        <div>
          <h2>Conference Publications</h2>
          {formData.form4.map((entry, index) => (
            <div key={index}>
              <h3>{`Entry ${index + 1}`}</h3>
              <label htmlFor={`conferenceName-${index}`}>Name of Conference:</label>
              <input
              required
                type="text"
                id={`conferenceName-${index}`}
                name="conferenceName"
                value={entry.conferenceName}
                onChange={(e) => handleEntryInputChange(e, 'form4', index)}
                placeholder="Enter Conference Name"
              />
              <label htmlFor={`conferenceDate-${index}`}>Date of Conference:</label>
              <input
              required
                type="date"
                id={`conferenceDate-${index}`}
                name="conferenceDate"
                value={entry.conferenceDate}
                onChange={(e) => handleEntryInputChange(e, 'form4', index)}
                placeholder="Enter Date of Conference"
              />
              <label htmlFor={`conferencePlace-${index}`}>Place of Conference:</label>
              <input
              required
                type="text"
                id={`conferencePlace-${index}`}
                name="conferencePlace"
                value={entry.conferencePlace}
                onChange={(e) => handleEntryInputChange(e, 'form4', index)}
                placeholder="Enter Place of Conference"
              />
              <label htmlFor={`authorsName-${index}`}>Author:</label>
              <input
              required
                type="text"
                id={`authorsName-${index}`}
                name="authorsName"
                value={entry.authorsName}
                onChange={(e) => handleEntryInputChange(e, 'form4', index)}
                placeholder="Enter Author's Name"
              />
              <label htmlFor={`conferenceTitle-${index}`}>Title of Conference Paper:</label>
              <input
              required
                type="text"
                id={`conferenceTitle-${index}`}
                name="conferenceTitle"
                value={entry.conferenceTitle}
                onChange={(e) => handleEntryInputChange(e, 'form4', index)}
                placeholder="Enter Title of Conference Paper"
              />
              <label htmlFor={`volume-${index}`}>Volume:</label>
              <input
              required
                type="text"
                id={`volume-${index}`}
                name="volume"
                value={entry.volume}
                onChange={(e) => handleEntryInputChange(e, 'form4', index)}
                placeholder="Enter Volume"
              />
              <label htmlFor={`page-${index}`}>Page(s):</label>
              <input
              required
                type="text"
                id={`page-${index}`}
                name="page"
                value={entry.page}
                onChange={(e) => handleEntryInputChange(e, 'form4', index)}
                placeholder="Enter Page(s)"
              />
              <label htmlFor={`impactFactor-${index}`}>IF:</label>
              <input
              required
                type="text"
                id={`impactFactor-${index}`}
                name="impactFactor"
                value={entry.impactFactor}
                onChange={(e) => handleEntryInputChange(e, 'form4', index)}
                placeholder="Enter IF"
              />
              <label htmlFor={`doi-${index}`}>DOI:</label>
              <input
              required
                type="text"
                id={`doi-${index}`}
                name="doi"
                value={entry.doi}
                onChange={(e) => handleEntryInputChange(e, 'form4', index)}
                placeholder="Enter DOI"
              />
              <label htmlFor={`publicationDate-${index}`}>Date of Publication:</label>
              <input
              required
                type="date"
                id={`publicationDate-${index}`}
                name="publicationDate"
                value={entry.publicationDate}
                onChange={(e) => handleEntryInputChange(e, 'form4', index)}
                placeholder="Enter Date of Publication"
              />
              <label htmlFor={`issn-${index}`}>ISSN:</label>
              <input
              required
                type="text"
                id={`issn-${index}`}
                name="issn"
                value={entry.issn}
                onChange={(e) => handleEntryInputChange(e, 'form4', index)}
                placeholder="Enter ISSN"
              />
              <label htmlFor={`issue-${index}`}>Issue:</label>
              <input
              required
                type="text"
                id={`issue-${index}`}
                name="issue"
                value={entry.issue}
                onChange={(e) => handleEntryInputChange(e, 'form4', index)}
                placeholder="Enter Issue"
              />
              <label htmlFor={`academicYear-${index}`}>Academic Year:</label>
              <select
                required
                id={`academicYear-${index}`}
                name="academicYear"
                value={entry.academicYear}
                onChange={(e) => handleEntryInputChange(e, 'form4', index)}
                placeholder="Enter Academic Year"
              >
              <option value="">Select Academic Year</option>
              <option value="2019-2020">2019-2020</option>
              <option value="2020-2021">2020-2021</option>
              <option value="2021-2022">2021-2022</option>
              <option value="2022-2023">2022-2023</option>
              <option value="2023-2024">2023-2024</option>
              </select>
              <label htmlFor={`type_of_publication-${index}`}>Type of publication:</label>
              <select
                required
                id={`type_of_publication-${index}`}
                name="type_of_publication"
                value={entry.type_of_publication}
                onChange={(e) => handleEntryInputChange(e, 'form4', index)}
              >
                <option value="">Select type of publication</option>
                <option value="National">National</option>
                <option value="International">International</option>
              </select>
              <label htmlFor={`publisher-${index}`}>Publisher:</label>
              <input
              required
                type="text"
                id={`publisher-${index}`}
                name="publisher"
                value={entry.publisher}
                onChange={(e) => handleEntryInputChange(e, 'form4', index)}
                placeholder="Enter Publisher"
              />
              <div className="button-container">
              {formData.form4.length > 1 && (
                <button className="delete-button" onClick={() => handleDeleteEntryForm4(index)}>Delete Entry</button>
              )}
              </div>
            </div>
          ))}
          <div className="button-container">
          <button className="custom-button" onClick={handleAddEntryForm4}>Add More Entries</button>
          </div>
        </div>
      );

  case 5:
  return (
    <div>
      <h2>Enter Book Chapter</h2>
      {formData.form5.map((entry, index) => (
        <div key={index}>
          <h3>{`Entry ${index + 1}`}</h3>
          <label htmlFor={`authorName-${index}`}>Author:</label>
          <input
            required
            type="text"
            id={`authorName-${index}`}
            name="authorName"
            value={entry.authorName}
            onChange={(e) => handleEntryInputChange(e, 'form5', index)}
            placeholder="Enter Author's Name"
          />
          <label htmlFor={`paperTitle-${index}`}>Title of Paper:</label>
          <input
            required
            type="text"
            id={`paperTitle-${index}`}
            name="paperTitle"
            value={entry.paperTitle}
            onChange={(e) => handleEntryInputChange(e, 'form5', index)}
            placeholder="Enter Title"
          />
          <label htmlFor={`volume-${index}`}>Volume:</label>
          <input
            required
            type="text"
            id={`volume-${index}`}
            name="volume"
            value={entry.volume}
            onChange={(e) => handleEntryInputChange(e, 'form5', index)}
            placeholder="Enter Volume"
          />
          <label htmlFor={`page-${index}`}>Page(s):</label>
          <input
          required
            type="text"
            id={`page-${index}`}
            name="page"
            value={entry.page}
            onChange={(e) => handleEntryInputChange(e, 'form5', index)}
            placeholder="Enter Page(s)"
          />
          <label htmlFor={`impactFactor-${index}`}>IF:</label>
          <input
          required
            type="text"
            id={`impactFactor-${index}`}
            name="impactFactor"
            value={entry.impactFactor}
            onChange={(e) => handleEntryInputChange(e, 'form5', index)}
            placeholder="Enter IF"
          />
          <label htmlFor={`doi-${index}`}>DOI:</label>
          <input
          required
            type="text"
            id={`doi-${index}`}
            name="doi"
            value={entry.doi}
            onChange={(e) => handleEntryInputChange(e, 'form5', index)}
            placeholder="Enter DOI"
          />
          <label htmlFor={`publicationDate-${index}`}>Date of Publication:</label>
          <input
          required
            type="date"
            id={`publicationDate-${index}`}
            name="publicationDate"
            value={entry.publicationDate}
            onChange={(e) => handleEntryInputChange(e, 'form5', index)}
            placeholder="Enter Date of Publication"
          />
          <label htmlFor={`issn-${index}`}>ISSN:</label>
          <input
          required
            type="text"
            id={`issn-${index}`}
            name="issn"
            value={entry.issn}
            onChange={(e) => handleEntryInputChange(e, 'form5', index)}
            placeholder="Enter ISSN"
          />
          <label htmlFor={`academicYear-${index}`}>Academic Year:</label>
          <select
            required
            id={`academicYear-${index}`}
            name="academicYear"
            value={entry.academicYear}
            onChange={(e) => handleEntryInputChange(e, 'form5', index)}
          >
            <option value="">Select Academic Year</option>
            <option value="2019-2020">2019-2020</option>
            <option value="2020-2021">2020-2021</option>
            <option value="2021-2022">2021-2022</option>
            <option value="2022-2023">2022-2023</option>
            <option value="2023-2024">2023-2024</option>
          </select>
          <label htmlFor={`type_of_publication-${index}`}>Type of publication:</label>
            <select
              required
              id={`type_of_publication-${index}`}
              name="type_of_publication"
              value={entry.type_of_publication}
              onChange={(e) => handleEntryInputChange(e, 'form5', index)}
            >
              <option value="">Select type of publication</option>
              <option value="National">National</option>
              <option value="International">International</option>
            </select>
          <label htmlFor={`publisher-${index}`}>Publisher:</label>
          <input
          required
            type="text"
            id={`publisher-${index}`}
            name="publisher"
            value={entry.publisher}
            onChange={(e) => handleEntryInputChange(e, 'form5', index)}
            placeholder="Enter Publisher"
          />
              <div className="button-container">
              {formData.form5.length > 1 && (
                <button className="delete-button" onClick={() => handleDeleteEntryForm5(index)}>Delete Entry</button>
              )}
              </div>
        </div>
      ))}
      <div className="button-container">
      <button className="custom-button" onClick={handleAddEntryForm5}>Add More Entries</button>
      </div>
    </div>
  );
      default:
        return null;
    }
  };

  
  return (
    <div className='overall'>
      {isSubmitted === 1 ? <Epage/> :
          <div className={currentStep === 1 ? "page-container1" : "page-container"}>
            {currentStep === 1 ? <Lpage/> : <></>}
            <div className="container">
              <form onSubmit={handleSubmit}>
                {renderForm()}
                <div className="button-container"> 
                {currentStep !== 1 && (
                  <button type="button" onClick={prevStep}>
                    Previous
                  </button>
                )}
                <button type="submit">{currentStep === 5 ? "Finish" : "Next"}</button>
                </div>
              </form>
            </div>
          </div>}
      </div>
  );
}

export default MultiStepForm;
