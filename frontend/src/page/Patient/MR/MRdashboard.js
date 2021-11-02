
import {Link} from 'react-router-dom';
const people = [
  {
    name: 'Jane Cooper',
    date: '12/10/2021',
    illness: 'Insomnia',
    image:
      'https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortWaved&accessoriesType=Prescription01&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=Blue03&eyeType=Default&eyebrowType=Default&mouthType=Twinkle&skinColor=Light',
  },
  {
    name: 'Example 2',
    date: '10/10/2021',
    illness: 'fewer',
    image:
      'https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortWaved&accessoriesType=Prescription01&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=Blue03&eyeType=Default&eyebrowType=Default&mouthType=Twinkle&skinColor=Light',
  },
  {
    name: 'Example 3',
    date: '21/10/2022',
    illness: 'Cancer',
    image:
      'https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortWaved&accessoriesType=Prescription01&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=Blue03&eyeType=Default&eyebrowType=Default&mouthType=Twinkle&skinColor=Light',
  },
  {
    name: 'Example 4',
    date: '21/10/2022',
    illness: 'Sample',
    image:
      'https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortWaved&accessoriesType=Prescription01&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=Blue03&eyeType=Default&eyebrowType=Default&mouthType=Twinkle&skinColor=Light',
  },
  // More people...
];

export default function Example() {
  return (
    <div className='font-fontPro'>
      <div className='p-5'>
        <a className='text-base' href='#'>
          <i class='fas fa-chevron-left'></i> Back
        </a>
      </div>
      <div className='mb-5 mx-auto max-w-7xl w-full px-10 flex flex-col space-y-4'>
        <div className='mx-auto max-w-7xl w-full flex justify-between mb-3'>
          <h1 className='text-3xl'>Medical Record</h1>
          {/* { <button className="px-4 py-2 rounded-md bg-blue-400 text-white">Add</button>} */}
        </div>
        <div className='flex flex-col'>
          <div className='-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
            <div className='py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8'>
              <div className='shadow overflow-hidden border-b border-gray-200 sm:rounded-lg'>
                <table className='min-w-full divide-y divide-gray-200'>
                  <thead className='bg-gray-50'>
                    <tr>
                      <th
                        scope='col'
                        className='px-6 py-3 text-left text-base font-medium  text-gray-500 uppercase tracking-wider'
                      >
                        Doctor
                      </th>
                      <th
                        scope='col'
                        className='px-6 py-3 text-left text-base font-medium text-gray-500 uppercase tracking-wider'
                      >
                        Date
                      </th>
                      <th
                        scope='col'
                        className='px-6 py-3 text-left text-base font-medium text-gray-500 uppercase tracking-wider'
                      >
                        Illness
                      </th>
                    </tr>
                  </thead>
                  <tbody className='bg-white divide-y divide-gray-200'>
                    {people.map((person) => (
                      <tr key={person.email}>
                        <td className='px-6 py-4 whitespace-nowrap'>
                          <div className='flex items-center'>
                            <div className='flex-shrink-0 h-10 w-10'>
                              <img
                                className='h-10 w-10 rounded-full'
                                src={person.image}
                                alt=''
                              />
                            </div>
                            <div className='ml-4'>
                              <div className='text-base font-medium text-gray-900'>
                                {person.name}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className='px-6 py-4 whitespace-nowrap'>
                          <div className='text-base text-gray-900'>
                            {person.date}
                          </div>
                        </td>
                        <td className='px-6 py-4 whitespace-nowrap'>
                          <span className='px-2 inline-flex text-base leading-5 '>
                            {person.illness}
                          </span>
                        </td>
                        <td className='px-6 py-4 whitespace-nowrap text-base font-bold text-purple-500'>
                          <Link>View</Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
