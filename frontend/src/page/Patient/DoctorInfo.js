import Waiting from '../../components/Waiting';
import {useState} from 'react';

const DoctorInfo = ({match}) => {
  const [waiting, setWaiting] = useState(false);
  // call doctor
  if (waiting) {
    return <Waiting doctorId={match.params.id} />;
  }

  const call = () => {
    setWaiting(true);
  };

  return (
    <div>
      <button onClick={call}>Call</button>
    </div>
  );
};

export default DoctorInfo;
