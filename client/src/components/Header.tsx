import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../AuthContext';
import styles from './Header.module.css'
import Location from './Location'

import profile from "../assets/profile-icon.svg"


interface HeaderProps {
    handleShowLogin: () => void;
    handleShowRegister: () => void;
    handleChatClick: () => void;
  }

export default function Header({handleShowLogin, handleShowRegister, handleChatClick }: HeaderProps) {
    const { user, logout } = useAuth();
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [dropdownVisible, setDropdownVisible] = useState<boolean>(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(event.target.value);
    };
  
    const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      console.log('Search query:', searchQuery);
    }
    const handleLogout = async () => {
        await logout();
      };

      const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);
      };
// dropdown event listeners doe clicks outside
const handleClickOutside = (event: MouseEvent) => {
  if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
    setDropdownVisible(false);
  }
};      

useEffect(() => {
        if (dropdownVisible) {
          document.addEventListener('mousedown', handleClickOutside);
        } else {
          document.removeEventListener('mousedown', handleClickOutside);
        }
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
      }, [dropdownVisible]);
    return(
        <header className={styles.header} >
            <Location />
       
            <h4 className={styles.appName}>Pawfect Match</h4>
            <form className={styles.searchForm} onSubmit={handleSearchSubmit}>
            
              <input
                type="text"
                placeholder="Search...   "
                value={searchQuery}
                onChange={handleInputChange}
                className={styles.searchInput}
              />
              
            </form>
           <div className={styles.userActions}>
           <div className={styles.profileIcon} onClick={toggleDropdown}>
           <img src={profile} alt="Profile" />
            </div>
            {dropdownVisible && (
          <div className={styles.dropdownMenu} ref={dropdownRef}>
            {user ? (
            <>
          <span>Welcome, {user.username}</span>
          <button onClick={handleLogout}>Logout</button>
          <button onClick={handleChatClick}>Chat</button>
           </>
           ) : (
            <div>
            <button onClick={handleShowLogin}>Login</button>
            <button onClick={handleShowRegister}>Register</button>
          </div>
          )}</div>
        )}
        </div>
        </header >
    )   
}