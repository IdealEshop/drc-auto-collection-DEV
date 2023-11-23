import {Link} from '@remix-run/react';
import React, {useEffect} from 'react';
import {useState} from 'react';

export default function HamburgerMenu({menu}) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.querySelector('body').classList.add('overflow-y-hidden');
    } else {
      document.querySelector('body').classList.remove('overflow-y-hidden');
    }
  }, [isOpen]);

  function handleOpenMenu(e) {
    if (e.target.id != 'menu-drawer') setIsOpen(!isOpen);
  }

  return (
    <div>
      <div
        className={`max-w-[298px] flex gap-3 items-center cursor-pointer ${
          isOpen && 'opacity-0'
        }`}
        onClick={handleOpenMenu}
      >
        <svg
          width="24"
          height="7"
          viewBox="0 0 24 7"
          fill="none"
          className="icon icon-hamburger w-[20px] h-[20px]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0.727273 0C0.325611 0 0 0.325611 0 0.727273C0 1.12893 0.32561 1.45455 0.727272 1.45455H23.2727C23.6744 1.45455 24 1.12893 24 0.727273C24 0.325611 23.6744 0 23.2727 0H0.727273ZM6.54545 5.09091C6.14379 5.09091 5.81818 5.41652 5.81818 5.81818C5.81818 6.21984 6.14379 6.54545 6.54545 6.54545H23.2727C23.6744 6.54545 24 6.21984 24 5.81818C24 5.41652 23.6744 5.09091 23.2727 5.09091H6.54545Z"
            fill="black"
          ></path>
        </svg>
        <span className="text-[15px]">Menu</span>
      </div>
      {/* Opened menu */}
      <div
        className={`top-0 left-0 right-0 bottom-0 backdrop-blur-lg fixed ${
          isOpen || 'hidden'
        }`}
        onClick={handleOpenMenu}
      >
        <div
          id="menu-drawer"
          className="max-w-[298px] shadow-[0_41px_270px_#00000026,0_17.1288px_112.8px_#0000001b,0_5.13384px_33.8082px_#00000013,0_2.72654px_17.9553px_#0000000f] bg-white flex flex-col mt-5 ml-5 p-[24px] rounded-[20px]"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            focusable="false"
            role="presentation"
            className="icon icon-close w-[20px] h-[20px] self-end mb-6 cursor-pointer"
            fill="none"
            viewBox="0 0 18 17"
            onClick={handleOpenMenu}
          >
            <path
              d="M.865 15.978a.5.5 0 00.707.707l7.433-7.431 7.579 7.282a.501.501 0 00.846-.37.5.5 0 00-.153-.351L9.712 8.546l7.417-7.416a.5.5 0 10-.707-.708L8.991 7.853 1.413.573a.5.5 0 10-.693.72l7.563 7.268-7.418 7.417z"
              fill="currentColor"
            ></path>
          </svg>
          <div className="menu">
            {menu.items.map((item) => (
              <div key={item.title}>
                <p className="text-[14px] text-body_text_off_black mb-[16px]">
                  {item.title}
                </p>
                <ul className="flex flex-col gap-[32px] mb-[3rem]">
                  {item.items.map((childItem) => (
                    <Link to={childItem.url} key={childItem.title}>
                      <li className="text-black text-[18px] font-[500]">
                        {childItem.title}
                      </li>
                    </Link>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
