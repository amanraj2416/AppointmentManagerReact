import docImage from '../images/docHome.png';

function Home(){
    
    return(
        <>
          <div className='row' style={{alignItems:'center'}}>
            <div className='col'>
              <div>
                <img src={docImage}></img>
              </div>
            </div>
            <div className='col'>
              <div>
                <p>Our web app is designed to streamline the process of scheduling medical appointments, 
                  making it easy and convenient for patients to book their visits with healthcare professionals.</p>
              </div>
            </div>
          </div>
            
        </>
    )
}
export default Home;
