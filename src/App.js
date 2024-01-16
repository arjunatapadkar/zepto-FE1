import React, { useState } from 'react';

import './App.css';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [chips, setChips] = useState([]);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const allItems = ['Emma Wilson', 'Abigail Cooper', 'Evelyn Adams', 'Mason Turner' ,'Noah Anderson', 'Ava Martinez', 'Lucas Taylor', 'Jackson Brown', 'Aiden Harris', 'Logan Mitchell']; 

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleItemClick = (item) => {
    setChips([...chips, item]);
    setSearchTerm('');
  };

  const handleChipRemove = (chip) => {
    setChips(chips.filter((item) => item !== chip));
  };

  const handleInputFocus = () => {
    setIsInputFocused(true);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Backspace' && searchTerm === '' && chips.length > 0) {
      
      const lastChip = chips[chips.length - 1];
      handleChipRemove(lastChip);
    }
  };


  const filteredItems = allItems.filter(
    (item) =>
      item.toLowerCase().includes(searchTerm.toLowerCase()) && !chips.includes(item)
  );


  return (
    <div className='w-full h-full flex flex-col justify-center items-center mt-10 gap-20' >

      <h1 className='text-3xl font-bold'>Pick User</h1>

      <div className='flex gap-2 border-b-2 border-violet-700 w-full items-center justify-center px-32'>

        <div className='flex flex-wrap gap-4 py-2'>
          {chips.map((chip) => (
            <div key={chip} className='bg-slate-200 px-4 py-1 rounded-full'>
              {chip} <span className='ml-4' onClick={() => handleChipRemove(chip)}>X</span>
            </div>
          ))}
        </div>
        <div>

          <input
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          // onBlur={() =>setIsInputFocused(false)}
          onKeyDown={handleKeyDown}
          placeholder="Add new user"
          className=' border-none outline-none'
          />
          <ul className={ isInputFocused ? 'block absolute border p-5 shadow-md  z-10' : 'hidden' }>
            {filteredItems.map((item) => (
              <li key={item}  onClick={() => {
                    handleItemClick(item);
                    setIsInputFocused(false);
                  }}>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      
    </div>
  );
}

export default App;




