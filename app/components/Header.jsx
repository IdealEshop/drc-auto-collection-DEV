import {Await, NavLink, useMatches} from '@remix-run/react';
import {Suspense} from 'react';
import HamburgerMenu from './HamburgerMenu';
import logo from '../../public/images/direct-auto-logo.webp';
import {useState, useEffect} from 'react';

/**
 * @param {HeaderProps}
 */
export function Header({header, isLoggedIn, cart}) {
  const {shop, menu} = header;
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const controlNavbar = () => {
    if (window.scrollY < lastScrollY) {
      setShow(false);
    } else {
      setShow(true);
    }
    console.log(window.scrollY, lastScrollY, show);
    setLastScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener('scroll', controlNavbar);

    return () => {
      window.removeEventListener('scroll', controlNavbar);
    };
  }, [lastScrollY]);

  return (
    <header className={`header !  w-full  ${show || '!sticky'}`}>
      <div className="page-width grid grid-cols-[1fr_1fr_1fr] !py-[12px] !h-[85px] w-full items-center">
        <HamburgerMenu menu={menu} />
        <NavLink
          prefetch="intent"
          to="/"
          style={activeLinkStyle}
          end
          className="place-self-center"
        >
          <img src={logo} alt="logo" className="max-w-[80px]" />
        </NavLink>
        <HeaderMenu menu={menu} viewport="desktop" />
      </div>
    </header>
  );
}

/**
 * @param {{
 *   menu: HeaderProps['header']['menu'];
 *   viewport: Viewport;
 * }}
 */
export function HeaderMenu({menu, viewport}) {
  const [root] = useMatches();
  const publicStoreDomain = root?.data?.publicStoreDomain;
  const className = `header-menu-${viewport}`;

  return (
    <nav
      className={className}
      role="navigation "
      className="flex gap-4 justify-self-end"
    >
      {SMALL_HEADER_MENU.items.map((item) => {
        return (
          <NavLink
            className="header-menu-item text-[15px] lg:block hidden"
            end
            key={item.title}
            prefetch="intent"
            style={activeLinkStyle}
            to={item.url}
          >
            {item.title}
          </NavLink>
        );
      })}
    </nav>
  );
}

/**
 * @param {Pick<HeaderProps, 'isLoggedIn' | 'cart'>}
 */
function HeaderCtas({isLoggedIn, cart}) {
  return (
    <nav className="header-ctas" role="navigation">
      <HeaderMenuMobileToggle />
      <NavLink prefetch="intent" to="/account" style={activeLinkStyle}>
        {isLoggedIn ? 'Account' : 'Sign in'}
      </NavLink>
      <SearchToggle />
      <CartToggle cart={cart} />
    </nav>
  );
}

function HeaderMenuMobileToggle() {
  return (
    <a className="header-menu-mobile-toggle" href="#mobile-menu-aside">
      <h3>☰</h3>
    </a>
  );
}

function SearchToggle() {
  return <a href="#search-aside">Search</a>;
}

/**
 * @param {{count: number}}
 */
function CartBadge({count}) {
  return <a href="#cart-aside">Cart {count}</a>;
}

/**
 * @param {Pick<HeaderProps, 'cart'>}
 */
function CartToggle({cart}) {
  return (
    <Suspense fallback={<CartBadge count={0} />}>
      <Await resolve={cart}>
        {(cart) => {
          if (!cart) return <CartBadge count={0} />;
          return <CartBadge count={cart.totalQuantity || 0} />;
        }}
      </Await>
    </Suspense>
  );
}

const SMALL_HEADER_MENU = {
  id: 'gid://shopify/Menu/199655587896',
  items: [
    {
      title: 'O nás',
      type: 'LINK',
      url: 'https://www.direct-auto.cz/pages/o-nas',
    },
    {
      title: 'Kontakty',
      type: 'LINK',
      url: 'https://www.direct-auto.cz/pages/kontaktujte-nas',
    },
  ],
};

/**
 * @param {{
 *   isActive: boolean;
 *   isPending: boolean;
 * }}
 */
function activeLinkStyle({isActive, isPending}) {
  return {
    fontWeight: isActive ? 'bold' : undefined,
    color: isPending ? 'grey' : 'black',
  };
}

/** @typedef {Pick<LayoutProps, 'header' | 'cart' | 'isLoggedIn'>} HeaderProps */
/** @typedef {'desktop' | 'mobile'} Viewport */

/** @typedef {import('./Layout').LayoutProps} LayoutProps */
