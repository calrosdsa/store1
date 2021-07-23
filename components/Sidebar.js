import React,{useState,Fragment} from 'react'
import {Menu,Transition} from '@headlessui/react'
import {useSession} from 'next-auth/client'
import {MenuAlt1Icon,UserIcon,PhoneIcon,ShoppingCartIcon,ShareIcon,StarIcon,ExclamationCircleIcon, InformationCircleIcon} from '@heroicons/react/solid'
import Icons from './Icons';
import {useRouter} from 'next/router'
function Sidebar() {
  const [session]=useSession();
  const router=useRouter();
    return (
      <div className=" focus:outline-none absolute -top-28 -mt-3  text-gray-300  lg:-mt-2  left-3">

        <Menu as='object'>
            {({open})=>(
              <Fragment>

          <Menu.Button>

          <MenuAlt1Icon className="h-[26px] lg:h-10" />
          </Menu.Button>
          <Transition show={open}
                    enter="transition ease-out duration-200"
                    enterFrom="transform opacity-0  scale-x-0"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-200"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-x-0"
                    
>
            <Menu.Items className="bg-gray-900 absolute mt-1 -left-4 w-[200px] md:w-[300px] xl:w-[400px] focus:outline-none ">

            <Menu.Item className="ml-2">
              {({active})=>(
                <div className={`${active ? "bg-gray-600 text-white":"text-gray-700"}`} >
                  {!session?
        <Icons Icon={UserIcon} title="Sign in"/>:<Icons src={session.user.image} title={session.user.name}/>
      }
                </div>
                )}
              </Menu.Item>
              <Menu.Item>
              {({active})=>(
                <div className={`${active ? "bg-gray-600 text-white":"text-gray-700"}`} >
        <Icons Icon={PhoneIcon} title="Contact us"/>
                </div>
                )}
              </Menu.Item>
              <Menu.Item>
              {({active})=>(
                <div className={`${active ? "bg-gray-600 text-white":"text-gray-700"}`} >
        <Icons Icon={ShoppingCartIcon} title="Shopping Cart Icon"/>
                </div>
                )}
              </Menu.Item>
              <Menu.Item>
              {({active})=>(
                <div className={`${active ? "bg-gray-600 text-white":"text-gray-700"}`} >
        <Icons Icon={StarIcon} title="Ratings"/>
                </div>
                )}
              </Menu.Item>
              <Menu.Item>
              {({active})=>(
                <div className={`${active ? "bg-gray-600 text-white":"text-gray-700"}`} >
        <Icons Icon={InformationCircleIcon} title="About"/>
                </div>
                )}
              </Menu.Item>
              <Menu.Item>
              {({active})=>(
                <div className={`${active ? "bg-gray-600 text-white":"text-gray-700"}`} >
        <Icons Icon={ShareIcon} title="Shared whit others"/>
                </div>
                )}
              </Menu.Item>
             
          </Menu.Items>
            </Transition>
            </Fragment>
            )}
        </Menu>
            </div>
    )
}

export default Sidebar
