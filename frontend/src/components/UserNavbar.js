/* resuable navigation bar for ever user type */
import {Fragment} from 'react';
import {Popover, Transition} from '@headlessui/react';
import {Link} from 'react-router-dom';
import {useFetchUser} from '../context/userContext';
import {
  MenuIcon,
  UserIcon,
  LogoutIcon,
  XIcon,
  CollectionIcon,
} from '@heroicons/react/outline';
// import {ChevronDownIcon} from '@heroicons/react/solid';
import ReactLogo from '../img/logo.svg';
function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}
const patientDropDown = [
  {
    name: "User's profile",
    href: '/patient/profile',
    icon: UserIcon,
  },
  {
    name: 'Medical Record',
    href: '/patient/medicalRecord',
    icon: CollectionIcon,
  },
  {
    name: 'Sign out',
    href: '/',
    icon: LogoutIcon,
  },
];

const doctorDropDown = [
  {
    name: "Doctor's profile",
    href: '/doctor/profile',
    icon: UserIcon,
  },
  {
    name: 'Sign out',
    href: '/doctorLogin',
    icon: LogoutIcon,
  },
];

const staffDropDown = [
  {
    name: "Staff's profile",
    href: '/staff/profile',
    icon: UserIcon,
  },
  {
    name: 'Sign out',
    href: '/staffLogin',
    icon: LogoutIcon,
  },
];

const managementDropDown = [
  {
    name: "Staff",
    href: '/staff/staffManagement',
    icon: UserIcon,
  },
  {
    name: 'Doctor',
    href: '/staff/doctorManagement',
    icon: UserIcon,
  },
];

export default function UserNavbar() {
  const {state} = useFetchUser();
  const signOut = () => {
    localStorage.removeItem('token');
  };

  let dropdown = []
  let home = "/"
  if (state && state.data) {
    if(state.data.type === 'patient') {
      dropdown = patientDropDown
      home = "/home"
    } else if (state.data.type === 'doctor') {
      dropdown = doctorDropDown
      home = "/doctor"
    } else if (state.data.type === 'staff') {
      dropdown = staffDropDown
      home = "/staff/doctorManagement"
    }
  }
  

  return (
    <>
      <Popover className='relative bg-plightBlue font-fontPro z-10'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6'>
          <div className='flex justify-between items-center py-3 md:justify-start md:space-x-10'>
            <div className='flex justify-start lg:w-0 lg:flex-1'>
              <img className='h-16 w-16' src={ReactLogo} alt='logo' />
              <Link
                className='text-3xl font-fontPro leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-gray-800'
                to={home}
              >
                Harmore
              </Link>
            </div>
            <div className='-mr-2 -my-2 md:hidden'>
              <Popover.Button className='rounded-md p-2 inline-flex items-center justify-center text-gray-800 hover:text-gray-500  '>
                <MenuIcon className='h-6 w-6' aria-hidden='true' />
              </Popover.Button>
            </div>

            <div className='hidden md:flex items-center justify-end md:flex-1 lg:w-0 gap-6'>
            {state.data && state.data.type === "staff" && <Popover.Group
                as='nav'
                className='hidden md:flex space-x-10 mr-3'
              >
                <Popover className='relative'>
                  {({open}) => (
                    <>
                      <Popover.Button
                        className={classNames(
                          open ? 'text-gray-900' : 'text-gray-500',
                          'font-fontPro'
                        )}
                      >
                        <span className='text-lg font-fontPro text-gray-800 hover:text-gray-500'>
                          {' '}
                          User Management{' '}
                          <i className='fas fa-chevron-down text-sm'></i>
                        </span>
                      </Popover.Button>

                      <Transition
                        as={Fragment}
                        enter='transition ease-out duration-200'
                        enterFrom='opacity-0 translate-y-1'
                        enterTo='opacity-100 translate-y-0'
                        leave='transition ease-in duration-150'
                        leaveFrom='opacity-100 translate-y-0'
                        leaveTo='opacity-0 translate-y-1'
                      >
                        {state && <Popover.Panel className='origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white'>
                          <div className='rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden'>
                            <div className='relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8'>
                              {managementDropDown.map((item) => (
                                <a
                                  key={item.name}
                                  href={item.href}
                                  onClick={
                                    item.name === 'Sign out' ? signOut : null
                                  }
                                  className='-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50'
                                >
                                  <item.icon
                                    className='flex-shrink-0 h-6 w-6 text-indigo-600'
                                    aria-hidden='true'
                                  />
                                  <div className='ml-4'>
                                    <p className='text-base font-fontPro text-gray-900'>
                                      {item.name}
                                    </p>
                                  </div>
                                </a>
                              ))}
                            </div>
                          </div>
                        </Popover.Panel>}
                      </Transition>
                    </>
                  )}
                </Popover>
              </Popover.Group>}
              <Popover.Group
                as='nav'
                className='hidden md:flex space-x-10 mr-3'
              >
                <Popover className='relative'>
                  {({open}) => (
                    <>
                      <Popover.Button
                        className={classNames(
                          open ? 'text-gray-900' : 'text-gray-500',
                          'font-fontPro'
                        )}
                      >
                        <span className='text-lg font-fontPro text-gray-800 hover:text-gray-500'>
                          {' '}
                          Profile{' '}
                          <i className='fas fa-chevron-down text-sm'></i>
                        </span>
                      </Popover.Button>

                      <Transition
                        as={Fragment}
                        enter='transition ease-out duration-200'
                        enterFrom='opacity-0 translate-y-1'
                        enterTo='opacity-100 translate-y-0'
                        leave='transition ease-in duration-150'
                        leaveFrom='opacity-100 translate-y-0'
                        leaveTo='opacity-0 translate-y-1'
                      >
                        {state && <Popover.Panel className='origin-top-right absolute right-0 mt-2 w-60 rounded-md shadow-lg bg-white'>
                          <div className='rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden'>
                            <div className='relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8'>
                              {dropdown.map((item) => (
                                <a
                                  key={item.name}
                                  href={item.href}
                                  onClick={
                                    item.name === 'Sign out' ? signOut : null
                                  }
                                  className='-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50'
                                >
                                  <item.icon
                                    className='flex-shrink-0 h-6 w-6 text-indigo-600'
                                    aria-hidden='true'
                                  />
                                  <div className='ml-4'>
                                    <p className='text-base font-fontPro text-gray-900'>
                                      {item.name}
                                    </p>
                                  </div>
                                </a>
                              ))}
                            </div>
                          </div>
                        </Popover.Panel>}
                      </Transition>
                    </>
                  )}
                </Popover>
              </Popover.Group>
            </div>
          </div>
        </div>

        <Transition
          as={Fragment}
          enter='duration-200 ease-out'
          enterFrom='opacity-0 scale-95'
          enterTo='opacity-100 scale-100'
          leave='duration-100 ease-in'
          leaveFrom='opacity-100 scale-100'
          leaveTo='opacity-0 scale-95'
        >
          <Popover.Panel
            focus
            className='absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden'
          >
            <div className='rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50'>
              <div className='pt-5 pb-6 px-5'>
                <div className='flex items-center justify-between'>
                  <h1 className='text-lg'>HARMORE</h1>
                  <div className='-mr-2'>
                    <Popover.Button className='bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-800 hover:text-gray-500 hover:bg-gray-100 '>
                      <span className='sr-only'>Close menu</span>
                      <XIcon className='h-6 w-6' aria-hidden='true' />
                    </Popover.Button>
                  </div>
                </div>
                <div className='mt-6'>
                  <nav className='grid gap-y-8'>
                    {dropdown.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className='-m-3 p-3 flex items-center rounded-md hover:bg-gray-50'
                      >
                        <item.icon
                          className='flex-shrink-0 h-6 w-6 text-indigo-600'
                          aria-hidden='true'
                        />
                        <span className='ml-3 text-base font-fontPro text-gray-900'>
                          {item.name}
                        </span>
                      </a>
                    ))}
                  </nav>
                </div>
              </div>
            </div>
          </Popover.Panel>
        </Transition>
      </Popover>
    </>
  );
}
