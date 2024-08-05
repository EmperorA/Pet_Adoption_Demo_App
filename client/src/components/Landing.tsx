import styles from "./Landing.module.css"
import dog from "../assets/dog.png";
import cat from "../assets/cat.png";
import other from "../assets/otherAnimalsBtn.svg"

import Header from './Header'
import Footer from './Footer';
import Adoption from './Adoption'
import Discover from './Discover';
import ChatRoom from './ChatModal';
import { useState, useEffect } from 'react';
import { useAuth } from '../AuthContext';


export default function Landing (){
  const { showLoginModal, showRegisterModal } = useAuth();
  const [ currentSlide, setCurrentSlide] = useState(0)
  const [isChatRoomVisible, setIsChatRoomVisible] = useState(false);
  const totalSlides = 3;

  const handleDotClick = (index: number) => {
    setCurrentSlide(index);
  };

  const handleChatClick = () => {
    {
     setIsChatRoomVisible(true)
    } }

    //donate page

    const handleDonateClick = () => {
      window.location.href = "https://www.paypal.com"; // Replace with your actual PayPal link
    };

    // makes the slides automatic every 5s
    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % totalSlides);
      }, 5000); // Change slide every 5 seconds
  
      return () => clearInterval(interval); // Clean up the interval on component unmount
    }, []);

  return(
    <div className="app-container">
    
      <Header handleShowLogin={showLoginModal} handleShowRegister={showRegisterModal} handleChatClick={handleChatClick} />
      <div className={styles.mainContent}>
      <div className={styles.landing}>
      <div className={styles.frontPage}>    
        <div className={styles.slides} style={{ transform: `translateX(-${currentSlide * 100}vw)` }}>
          <div className={`${styles.slide} ${styles.slide1}`}>
              <div>
                <h2 className={styles.helpText}>Want to help homeless pets today?</h2>
                <button onClick={showRegisterModal} className={styles.join}>Help Now</button>
              </div>
              <img src={other} alt="otherAnimals" className={styles.slide1Img} />
          </div>
          
          <div className={`${styles.slide} ${styles.slide2}`}>
            <div className="div">
          <h2 className={styles.joinText}>Join our animal lovers community</h2>
            <button onClick={showRegisterModal} className={styles.join}>Join Now</button>
            </div>
          <img src={cat} alt="cat-img" className={styles.dogImg} />
          </div>
          <div className={`${styles.slide} ${styles.slide3}`}>
            <div className="div">
                <h2 className={styles.donateText}>Street pets need our protection!</h2>
                <button onClick={handleDonateClick} className={styles.join}>Donate Now</button>
                </div>
                <img src={dog} alt="dog-img" className={styles.dogImg} />
          </div>
        </div>
        <div className={styles.navDots}>
          {[0, 1, 2].map((index) => (
            <div
              key={index}
              className={`${styles.navDot} ${currentSlide === index ? styles.active : ''}`}
              onClick={() => handleDotClick(index)}
            />
          ))}
        </div>
      </div>
      <Adoption />
      <Discover />
      </div>
      <Footer />
      <ChatRoom isVisible={isChatRoomVisible} onClose={() => setIsChatRoomVisible(false)} />
    </div>
    </div>
  )  
}