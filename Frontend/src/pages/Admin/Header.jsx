import React from 'react';
import { BsSearch } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();

  return (
    <header className="header">
      <div className="header-left">
        <input 
          type="text" 
          className="search-bar" 
          placeholder="Search books, members..."
        />
        <BsSearch className="icon" />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <button 
          onClick={() => navigate('/')} 
          style={{ background: 'none', border: 'none', color: '#8b8fa3', cursor: 'pointer', fontSize: '14px' }}
        >
          Library
        </button>
        <button 
          onClick={() => navigate('/members')} 
          style={{ background: 'none', border: 'none', color: '#8b8fa3', cursor: 'pointer', fontSize: '14px' }}
        >
          Members
        </button>
      </div>
    </header>
  );
}

export default Header;
