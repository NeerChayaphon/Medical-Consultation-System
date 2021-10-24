import React, {useState, useEffect, Fragment} from 'react';
import {Link} from 'react-router-dom';
import {Menu, Transition} from '@headlessui/react';
import {ChevronDownIcon} from '@heroicons/react/solid';
import ReactLogo from '../img/logo.svg';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function HomeNavBar() {
  const [button, setButton] = useState(true);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
  }, []);

  return (
    <>
      <nav className='relative flex flex-wrap items-center justify-between px-2 py-3 bg-plightBlue mb-3'>
        <div className='container px-4 mx-auto flex flex-wrap items-center justify-between'>
          <div className='flex flex-row w-auto justify-center items-center'>
              <img className="w-24" src={ReactLogo} alt="logo" />
            <Link
              className='text-3xl font-fontPro leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-gray-800'
              to='#'
            >
              Harmore
            </Link>
          </div>
          <Menu as='div' className='relative inline-block text-left'>
            <div>
              <Menu.Button className='inline-flex justify-center w-full text-base texl-2xl font-medium font-fontPro text-gray-800 hover:text-gray-600 '>
                Sign in
                <ChevronDownIcon
                  className='-mr-1 ml-2 h-5 w-5'
                  aria-hidden='true'
                />
              </Menu.Button>
            </div>

            <Transition
              as={Fragment}
              enter='transition ease-out duration-100'
              enterFrom='transform opacity-0 scale-95'
              enterTo='transform opacity-100 scale-100'
              leave='transition ease-in duration-75'
              leaveFrom='transform opacity-100 scale-100'
              leaveTo='transform opacity-0 scale-95'
            >
              <Menu.Items className='origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none'>
                <div className='py-1'>
                  <Menu.Item>
                    {({active}) => (
                      <a
                        href='#'
                        className={classNames(
                          active
                            ? 'bg-gray-100 text-gray-900'
                            : 'text-gray-700',
                          'block px-4 py-2 text-sm'
                        )}
                      >
                        As Patient
                      </a>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({active}) => (
                      <a
                        href='#'
                        className={classNames(
                          active
                            ? 'bg-gray-100 text-gray-900'
                            : 'text-gray-700',
                          'block px-4 py-2 text-sm'
                        )}
                      >
                        As Doctor
                      </a>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({active}) => (
                      <a
                        href='#'
                        className={classNames(
                          active
                            ? 'bg-gray-100 text-gray-900'
                            : 'text-gray-700',
                          'block px-4 py-2 text-sm'
                        )}
                      >
                        As Staff
                      </a>
                    )}
                  </Menu.Item>
                  {/* {<form method="POST" action="#">
              <Menu.Item>
                {({ active }) => (
                  <button
                    type="submit"
                    className={classNames(
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'block w-full text-left px-4 py-2 text-sm'
                    )}
                  >
                    Sign out
                  </button>
                )}
              </Menu.Item>
            </form>} */}
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </nav>
    </>
  );
}
