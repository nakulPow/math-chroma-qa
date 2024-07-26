'use client';
import data from '../data.json';
import React, { useState, useEffect } from 'react';
import EditableParagraph from '../components/EditableParagraph';
import { GrNext, GrPrevious } from 'react-icons/gr';
// import React, {useState}  from 'react';
export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(data[0].question);
  const [answers, setAnswers] = useState(data.map(() => new Object()));
  const [comments, setComments] = useState(data.map(() => new Object()));
  const colorCode = {'0':'white','1':'purple','2':'blue','3':'green','4':'red','5':'yellow','6':'cyan','7':'orange','8':'gray','9':'pink'}
  useEffect(() => {
    setCurrentQuestion(data[currentIndex].question);
  }, [currentIndex, data]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted Answers:', answers);
    console.log('Submitted Comments:', comments);
    // if (currentQuestion < data.length - 1) {
    //   setCurrentQuestion(currentQuestion + 1);
    // }
    // else{
    //  alert('All Questions are Answered') 
    // }
    // Handle form submission logic here
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex > 0 ? prevIndex - 1 : 0
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex < data.length - 1 ? prevIndex + 1 : 0
    );
  };

  const item = data[currentIndex]
  
  return(
<div className="container">
      <div style={{textAlign:'end'}}>
        <button onClick={goToPrevious} className="qNavBtn"><GrPrevious/></button>
        <button onClick={goToNext} className="qNavBtn"><GrNext /></button>
      </div>
      <div>
      <EditableParagraph placeholder={`Question ${currentIndex+1}: ${currentQuestion}`}/>
      </div>
      <form onSubmit={handleSubmit}>
          {/* <div key={currentQuestion}> */}
            {/* <h1 className="text-2xl font-bold mb-4">Question {currentQuestion + 1}: {item.question}</h1>
            <EditableParagraph placeholder={item.question}/>
            <p style={{fontSize:'26px'}}>Question {currentQuestion + 1}: {item.question}</p> */}
            <div className="matrices">
            
            <p style={{fontSize:'22px'}}>Input Matrices:</p>
              {item.matrices.map((mItem, mIndex) => (
                <div key={mIndex} className="matrix">
                  <p style={{fontSize:'22px'}}>{(mIndex + 10).toString(36).toUpperCase()}.</p>
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
                    <label htmlFor={`answer-${currentQuestion}-${(mIndex + 10).toString(36).toUpperCase()}`} style={{fontSize:'22px'}}>Answer:</label>
                    <textarea
                      id={`answer-${currentQuestion}-${(mIndex + 10).toString(36).toUpperCase()}`}
                      name={`answer-${currentQuestion}-${(mIndex + 10).toString(36).toUpperCase()}`}
                      rows="4"
                      onChange={(e) => {
                        const newAnswers = [...answers];
                        newAnswers[currentQuestion][(mIndex + 10).toString(36)]= e.target.value;
                        setAnswers(newAnswers);
                      }}    
                    ></textarea>
                  </div>
                  <div className="form-group">
                    <label htmlFor={`comments-${currentQuestion}-${(mIndex + 10).toString(36).toUpperCase()}`} style={{fontSize:'22px'}}>Comments:</label>
                    <textarea
                      id={`comments-${currentQuestion}-${(mIndex + 10).toString(36).toUpperCase()}`}
                      name={`comments-${currentQuestion}-${(mIndex + 10).toString(36).toUpperCase()}`}
                      rows="4"
                      onChange={(e) => {
                        const newComments = [...comments];
                        newComments[currentQuestion][(mIndex + 10).toString(36)]= e.target.value;
                        setComments(newComments);
                      }}
                    ></textarea>
                  </div>
                </div>
              ))}
              
            </div>
          {/* </div> */}
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
        .blue {
          background-color: #90EE90;
        }
        .default{
          background-color: #cacaca;
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
