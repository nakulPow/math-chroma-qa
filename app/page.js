'use client';
import data from '../data.json';
import React, { useState, useEffect } from 'react';
import EditableParagraph from '../components/EditableParagraph';
import styles from '../components/SwitchToggle.module.css';
import { GrNext, GrPrevious } from 'react-icons/gr';

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(data[0].question);
  const [responses, setResponses] = useState(data.map(() => ({
    id: "",
    question: {
      value: "",
      to_keep: true
    },
    matrices: {
      A: {
        value: "",
        to_keep: true,
        comments: "",
        explanation: ""
      },
      B: {
        value: "",
        to_keep: true,
        comments: "",
        explanation: ""
      },
      C: {
        value: "",
        to_keep: true,
        comments: "",
        explanation: ""
      }
    }
  })));

  const colorCode = {'0':'white','1':'purple','2':'blue','3':'green','4':'red','5':'yellow','6':'cyan','7':'orange','8':'gray','9':'pink'};

  useEffect(() => {
    setCurrentQuestion(data[currentIndex].question);
  }, [currentIndex]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(responses);
    if (currentIndex < data.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const goToPrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const goToNext = () => {
    if (currentIndex < data.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleChildData = (data) => {
    setCurrentQuestion(data);
  };

  const updateResponse = (matrixKey, field, value) => {
    const newResponses = [...responses];
    newResponses[currentIndex].id = currentIndex;
    newResponses[currentIndex].question.value = currentQuestion;
    newResponses[currentIndex].matrices[matrixKey][field] = value;
    setResponses(newResponses);
  };

  const item = data[currentIndex];
  
  return(
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div style={{textAlign:'end'}}>
          <button type="button" onClick={goToPrevious} className="qNavBtn"><GrPrevious/></button>
          <button type="button" onClick={goToNext} className="qNavBtn"><GrNext /></button>
        </div>
        <div>
          <EditableParagraph onDataSend={handleChildData} placeholder={`Question ${currentIndex+1}: ${currentQuestion}`}/>
        </div>
        <div className="matrices">
          <br/>
          <p style={{fontSize:'22px'}}>Input Matrices:</p>
          {item.matrices.map((mItem, mIndex) => {
            const matrixKey = (mIndex + 10).toString(36).toUpperCase();
            return (
              <div key={mIndex} className="matrix">
                <p style={{fontSize:'22px'}}>{matrixKey}.</p>
                <table>
                  <tbody>
                    {mItem.replace(/\[|\]/g, '').split(',\n').map((row, rowIndex) => (
                      <tr key={rowIndex}>
                        {row.split(',').map((col, colIndex) => (
                          <td key={colIndex} style={{backgroundColor: col in colorCode ? colorCode[col] : 'white'}}></td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
               
                <div className="form-group">
                  <label htmlFor={`answer-${currentIndex}-${matrixKey}`} style={{fontSize:'22px'}}>Answer:</label>
                  <textarea
                    id={`answer-${currentIndex}-${matrixKey}`}
                    name={`answer-${currentIndex}-${matrixKey}`}
                    rows="4"
                    required={true}
                    value={responses[currentIndex].matrices[matrixKey].value}
                    onChange={(e) => updateResponse(matrixKey, 'value', e.target.value)}
                  ></textarea>
                </div>
                <div className="form-group">
                  <label htmlFor={`comments-${currentIndex}-${matrixKey}`} style={{fontSize:'22px'}}>Comments:</label>
                  <textarea
                    id={`comments-${currentIndex}-${matrixKey}`}
                    name={`comments-${currentIndex}-${matrixKey}`}
                    rows="4"
                    value={responses[currentIndex].matrices[matrixKey].comments}
                    onChange={(e) => updateResponse(matrixKey, 'comments', e.target.value)}
                  ></textarea>
                </div>
                <div className="Explanations">
                  <label htmlFor={`explanation-${currentIndex}-${matrixKey}`} style={{fontSize:'22px'}}>Explanation:</label>
                  <textarea
                    id={`explanation-${currentIndex}-${matrixKey}`}
                    rows="4"
                    style={{fontSize:'16px'}}
                    value={responses[currentIndex].matrices[matrixKey].explanation || item.explanation[mIndex]}
                    onChange={(e) => updateResponse(matrixKey, 'explanation', e.target.value)}
                  ></textarea>
                </div>
                <div>
                  <br/>
                  <p style={{fontSize:'22px'}}> Keep Matrix: </p>
                  <label className={styles.switch}>
                    <input
                      type="checkbox"
                      checked={responses[currentIndex].matrices[matrixKey].to_keep}
                      onChange={(e) => updateResponse(matrixKey, 'to_keep', e.target.checked)}
                    />
                    <span className={styles.slider}></span>
                  </label>
                </div>
              </div>
            );
          })}
          <div>
            <br/>
            <p style={{fontSize:'22px'}}> Keep Question: </p>
            <label className={styles.switch}>
              <input
                type="checkbox"
                checked={responses[currentIndex].question.to_keep}
                onChange={(e) => {
                  const newResponses = [...responses];
                  newResponses[currentIndex].question.to_keep = e.target.checked;
                  setResponses(newResponses);
                }}
              />
              <span className={styles.slider}></span>
            </label>
          </div>
        </div>
        <button type="submit" className="submit-btn">Submit</button>
      </form>
      <style>{`
        .container {
          font-family: Arial, sans-serif;
          max-width: 800px;
          margin: 0 auto;
          padding: 10px;
        }
        .matrices {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .matrix {
          margin-bottom: 20px;
        }
        table {
          border-collapse: separate;
          margin-left: 32px;
          margin-bottom: 10px;
        }
        td {
          width: 30px;
          height: 30px;
          text-align: center;
          border: 1px solid #ccc;
          box-shadow: 4px 2px 8px 2px rgba(0, 0, 0, 0.28)
        }
        .form-group {
          margin-bottom: 20px;
        }
        label {
          display: block;
          margin-bottom: 5px;
        }
        textarea {
          width: 100%;
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 4px;
          box-shadow: 4px 2px 8px 2px rgba(0, 0, 0, 0.28)
        }
        .submit-btn {
          background-color: #000000;
          border: none;
          color: white;
          padding: 15px 32px;
          text-align: center;
          text-decoration: none;
          display: inline-block;
          font-size: 16px;
          margin: 4px 2px;
          cursor: pointer;
          border-radius: 4px;
          float:right;
        }
        .qNavBtn {
          border: 1px solid black;
          padding: 6px;
          font-size: 30px;
          margin: 4px;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}