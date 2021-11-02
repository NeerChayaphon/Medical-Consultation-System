import React from 'react';
import {Link} from 'react-router-dom';

const CardDoctor = ({doctor}) => {
  return (
    <Link className='card' to={`/doctorinfo/${doctor._id}`}>
      <div className='bg-white rounded-lg px-6 py-3 shadow-md'>
        <div className='flex items-start space-x-6'>
          <img
            className='border border-gray-200 ml-2 h-16 w-16 object-cover object-center rounded-full'
            src='https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortWaved&accessoriesType=Prescription01&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=Blue03&eyeType=Default&eyebrowType=Default&mouthType=Twinkle&skinColor=Light'
            alt='description of '
          />
          <div>
            <p className='text-base text-gray-700 font-fontPro font-semibold mb-2'>
            {doctor.name}
            </p>
            <p className='text-sm font-medium text-gray-900 font-fontPro mb-3 bg-red-300 inline-block px-1 rounded-md text-center justify-center'>
            {doctor.specialization.specialization}
            </p>
            <p className='text-xs text-gray-700 font-fontPro mb-2'>
              <i className='fas fa-graduation-cap fa-fw'></i>
              <span> {doctor.backgroud}</span>
            </p>
            <p className='text-xs text-gray-700 font-fontPro mb-2'>
              <i className='fas fa-map-marker-alt fa-fw'></i>
              <span> {doctor.hospital}</span>
            </p>
            <p className='text-xs text-gray-700 font-fontPro'>
              <i className='fas fa-phone-alt fa-fw'></i>
              <span> {doctor.phone}</span>
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CardDoctor;
