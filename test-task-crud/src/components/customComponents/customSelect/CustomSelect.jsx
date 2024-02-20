import React, { useState, useRef, useEffect } from 'react';
import './CustomSelect.css';

const CustomSelect = ({ options, placeholder, onSelect, required = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const wrapperRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
         
        if (required && !selectedOption) {
          onSelect(null);
        }
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [wrapperRef, onSelect, required, selectedOption]);

  const toggling = () => setIsOpen(!isOpen);

  const onOptionClicked = value => () => {
    setSelectedOption(value);
    onSelect(value);  
    setIsOpen(false);
  };

  return (
    <div className="custom-select-wrapper" ref={wrapperRef}>
      <div className="custom-select-header" onClick={toggling}>
        <div className="custom-select-selected-value">
          {selectedOption || placeholder}
        </div>
        <div className={`custom-select-arrow ${isOpen ? 'open' : ''}`} />
      </div>
      {isOpen && (
        <ul className="custom-select-list">
          {options.map(option => (
            <li className="custom-select-list-item" onClick={onOptionClicked(option)} key={option}>
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomSelect;