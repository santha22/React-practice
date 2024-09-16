
import { useState } from 'react'
import './App.css'
import usePasswordGenerator from './hooks/use-password-generator';
import PasswordStrengthIndicator from './components/StrengthChecker';
import Button from './components/Button';
import Checkbox from './components/Checkbox';

function App() {

  const [length, setLength] = useState(4);
  const [checkboxData, setCheckboxData] = useState([
    { title: "Include Uppercase Letters", state: false },
    { title: "Include Loswercase Letters", state: false },
    { title: "Include Numbers", state: false },
    { title: "Include Symbols", state: false },
  ]);

  const [copied, setCopied] = useState(false);

  const handleCheckboxChange = (i) => {
    const updatedCheckboxData = [...checkboxData];
    updatedCheckboxData[i].state = !updatedCheckboxData[i].state;
    setCheckboxData(updatedCheckboxData);
  }

  const {password, errorMessage, generatePassword} = usePasswordGenerator();
  
  const handleCopy = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1000);
  }

  return (
    <div className='container'>
      {/* password text and copy */}
      {password && (
        <div className='header'>
          <div className='title'>{password}</div>
          <Button 
            text={copied ? "copied" : "copy"} 
            className="copyBtn" 
            onClick={handleCopy} 
          />
        </div>
      )}
      {/* character length */}
      <div className='charlength'>
        <span>
          <label>Character Length</label>
          <label>{length}</label>
        </span> 
        <input 
         type='range'
         min='4'
         max='20'
         value={length}
         onChange={(e) => setLength(e.target.value)}
        />
      </div>
      {/* checkbox  */}
      <div className='checkboxes'>
        {checkboxData.map((checkbox, index) => {
          return (
            <Checkbox 
              key={index}
              title={checkbox.title} 
              onChage={() => handleCheckboxChange(index)}
              checked={checkbox.state}
            />
          )
        })}
      </div>
      {/* strength  */}
      <PasswordStrengthIndicator password={password}/>

      {/* Error Handling */}
      {errorMessage && <div className="errorMessage">{errorMessage}</div>}
      {/* generate button  */}
      <Button 
        text="Generate Password" 
        className="generateBtn" 
        onClick={() => generatePassword(checkboxData, length)} 
      />
    </div>
  )
}

export default App
