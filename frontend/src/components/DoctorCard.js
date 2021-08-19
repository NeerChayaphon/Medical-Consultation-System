import React from 'react';
import {Link} from 'react-router-dom';
import '../styles/DoctorCard.css';

const DoctorCard = () => {
  return (
    <div className='doctorCard'>
      <Link className='card' to='/login'>
        <div>
          <img
            className='card-img'
            src='https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortWaved&accessoriesType=Prescription01&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=Blue03&eyeType=Default&eyebrowType=Default&mouthType=Twinkle&skinColor=Light'
            alt='description of image'
          />
        </div>
        <div className='card-text'>
          <h2 className='card-title'>Dr.Chayaphon Bunyakan</h2>

          <span className='card-skills'>
            <p className='skill'>Cardiologist</p>
          </span>

          <p className='card-description'>
            <i className='fas fa-graduation-cap fa-fw'></i>
            <span> Faculty of medicine chulalongkorn</span>
          </p>
          <p className='card-description'>
            <i className='fas fa-map-marker-alt fa-fw'></i>
            <span> Chulalongkorn Hospital</span>
          </p>
          <p className='card-description'>
            <i className='fas fa-clock fa-fw'></i>
            <span> 17:00 - 18:00</span>
          </p>

          {/* <Link to='#' className='card-link'>
            Consult
          </Link> */}
        </div>
      </Link>
    </div>
  );
};

export default DoctorCard;
