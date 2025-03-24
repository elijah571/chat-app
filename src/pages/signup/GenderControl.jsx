import React from 'react';

const GenderControl = ({ onCheckboxChange, selectedGender }) => {
  return (
    <div className='flex gap-5'>
      {/* Male Selection */}
      <div className="form-control">
        <label className={`label gap-2 cursor-pointer ${selectedGender === 'male' ? 'selected' : ''}`}>
          <span className='text-white'>Male</span>
          <input
            type="radio"
            name="gender"
            className='radio border-white'
            checked={selectedGender === 'male'}
            onChange={() => onCheckboxChange('male')}
          />
        </label>
      </div>
      
      {/* Female Selection */}
      <div className="form-control">
        <label className={`label gap-2 cursor-pointer ${selectedGender === 'female' ? 'selected' : ''}`}>
          <span className='text-white'>Female</span>
          <input
            type="radio"
            name="gender"
            className='radio border-white'
            checked={selectedGender === 'female'}
            onChange={() => onCheckboxChange('female')}
          />
        </label>
      </div>
    </div>
  );
};

export default GenderControl;
