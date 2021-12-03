/* reuseable card component for homepage */
import React from 'react';
import {Link} from 'react-router-dom';

const DoctorCard = ({doctor}) => {
  const colorDoc = (doctor) => { // color of the specialization
    let color = ""
    switch (doctor.specialization.specialization) {
      case "Physician":
        color = "blue-300"
        break;
      case "Otolaryngologist":
        color = "green-300"
        break;
      case "Pediatricians":
        color = "yellow-300"
        break;
      case "Obstetrician-Gynecologist":
        color = "pink-300"
        break;
      case "Cardiologist":
        color = "red-300"
        break;
      case "Urologists":
        color = "indigo-300"
        break;
      case "Orthopedist":
        color = "purple-300"
        break;
      case "Psychiatrist":
        color = "blue-200"
        break;
      case "Surgeon":
        color = "green-200"
        break;
      case "Dermatologist":
        color = "yellow-200"
        break;
      case "Neurologist":
        color = "pink-200"
        break;
      case "Dentist":
        color = "red-200"
        break;
      case "Ophthalmologist":
        color = "indigo-200"
        break;
      default:
        color = "grap-200"
        break;
      // code block
    }
    return color;
  };
  return (
    <Link className='card' key={doctor.name} to={ {pathname : `/doctorinfo/${doctor._id}`,state : {data:doctor}}}>
      <div className='bg-white rounded-lg px-6 py-3 shadow-md'>
        <div className='flex items-start space-x-6'>
          <img
            className='border border-gray-200 ml-2 h-16 w-16 object-cover object-center rounded-full'
            src={doctor.photo}
            alt='description of '
          />
          <div>
            <p className='text-base text-gray-700 font-fontPro font-semibold mb-2'>
              {doctor.name}
            </p>
            <p className={`text-sm font-medium text-gray-700 font-fontPro mb-3 bg-${colorDoc(doctor)}  inline-block px-1 rounded-md text-center justify-center`}>
              {doctor.specialization.specialization}
            </p>
            <p className='text-xs text-gray-700 font-fontPro mb-2'>
              <i className='fas fa-graduation-cap fa-fw'></i>
              <span> {doctor.background}</span>
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

export default DoctorCard;
