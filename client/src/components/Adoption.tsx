import styles from './Adoption.module.css'

export default function Adoption (){
  return(
    <div className={styles.adoption}>
      <h2 className={styles.sectionTitle}>
                    Planning to adopt a pet?
                </h2>
                
                <div className={styles.infoCards}>
                  <div className={styles.infoCard}>
                    <img src="./src/assets/checklist.svg" alt="checklist-img" />
                    <div className={styles.card}>
                    <h2 className={styles.infoTitle}>CHECKLIST FOR NEW ADOPTERS</h2>
                    <p className={styles.infoText}> Make the adoption transition as smooth as possible</p>
                    <button> learn More</button>
                    </div>
                  </div>
                  <div className={styles.infoCard}>
                   <img src="./src/assets/dogBtn.svg" alt="dog-img" />
                    <div className={styles.card}>
                    <h2 className={styles.infoTitle}>ADOPTION ARTICLES</h2>
                    <p className={styles.infoText}> Learn more about caring for your new Pet</p>
                    <button> learn More</button>
                   </div>
                  </div>
                  <div className={styles.infoCard}>
                    <img src="./src/assets/favourite-paw.svg" alt="dogPaw-img" />
                    <div className={styles.card}>
                    <h2 className={styles.infoTitle}>PET ADOPTION FAQS</h2>
                    <p className={styles.infoText}> Get answers to all the you questions you haven't though of for your adoption</p>
                    <button> learn More</button>
                    </div>
                  </div>
                  
                </div>
                <div className={styles.shelter}>
                    <h4 className={styles.shelterHeading}>
                      Shelter near you
                    </h4>
                    <div className={styles.shelterCards}>
                      <div className={styles.shelterCard}>
                        <div className={styles.imgBox}></div>
                        <span className={styles.cardText}>Zürich Animal Shelter</span>
                      </div>
                      <div className={styles.shelterCard}>
                      <div className={styles.imgBox}></div>
                      <span className={styles.cardText}>Zürich Animal Shelter</span>
                      </div>
                      <div className={styles.shelterCard}>
                      <div className={styles.imgBox}></div>
                      <span className={styles.cardText}>Zürich Animal Shelter</span>
                      </div>
                    </div>
                </div>
    </div>
  )
}