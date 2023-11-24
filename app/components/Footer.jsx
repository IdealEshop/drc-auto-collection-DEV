import {useMatches, NavLink} from '@remix-run/react';
import PhoneLogo from '../../public/icons/PhoneIcon.svg';
import InstagramLogo from '../../public/icons/InstagramIcon.svg';
import FacebookLogo from '../../public/icons/FacebookLogo.svg';
import LinkedInLogo from '../../public/icons/LinkedInLogo.svg';
import YoutubeLogo from '../../public/icons/YoutubeLogo.svg';

/**
 * @param {FooterQuery}
 */
export function Footer({menu}) {
  return (
    <footer className="footer">
      <div className="page-width !max-w-[926px]">
        <FooterMenu menu={menu} />
        <FooterBottomSection />
      </div>
    </footer>
  );
}

/**
 * @param {Pick<FooterQuery, 'menu'>}
 */
function FooterMenu({menu}) {
  return (
    <nav
      className="m-auto pt-[46px] pb-[32px] grid lg:grid-cols-4 grid-cols-2 gap-[67px] max-[460px]:grid-cols-1 max-[460px]:gap-[40px] text-white"
      role="navigation"
    >
      <div className="flex items-center gap-[16px] min-[460px]:hidden">
        <img src={PhoneLogo} alt="phone-logo" />

        <span className="tw-text-[18px]">296 183 138</span>
      </div>
      {menu.items.map((item) => (
        <div key={item.title}>
          <p className="text-[20px] font-[600] mb-[24px]">{item.title}</p>
          <ul className="flex flex-col gap-[16px] text-[15px]">
            {item.items.map((item) => (
              <NavLink
                end
                key={item.title}
                prefetch="intent"
                style={activeLinkStyle}
                to={item.url}
              >
                <li className="text-white m-0">{item.title}</li>
              </NavLink>
            ))}
          </ul>
        </div>
      ))}
      <div className="w-[180px] flex flex-col gap-[50px] max-[460px]:hidden">
        <div className="flex items-center gap-[16px]">
          <img src={PhoneLogo} alt="" />
          <span className="text-[18px]">296 183 138</span>
        </div>
        <div>
          <p className="text-[20px] font-[600] mb-[18px]">Sledujte nás</p>
          <div className="flex gap-[28px]">
            <a href="https://instagram.com/direct_auto_cz?igshid=YmMyMTA2M2Y=">
              <img src={InstagramLogo} alt="instagram-logo" />
            </a>
            <a href="https://www.facebook.com/directautocz">
              <img src={FacebookLogo} alt="facebook-logo" />
            </a>
            <a href="https://www.linkedin.com/company/direct-auto-cz/">
              <img src={LinkedInLogo} alt="linkedin-logo" />
            </a>
            <a href="https://youtu.be/ArGTbSVF8uE">
              <img src={YoutubeLogo} alt="youtube-logo" />
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}

function FooterBottomSection() {
  return (
    <div className="flex gap-[32px] flex-wrap-m-auto text-white text-[12px] font-[300] pb-[24px] max-[456px]:gap-[20px]">
      <p>© {new Date().getFullYear()} Direct auto</p>
      {SHOP_POLICY.items.map((item) => (
        <NavLink
          end
          key={item.title}
          prefetch="intent"
          style={activeLinkStyle}
          to={item.url}
        >
          {item.title}
        </NavLink>
      ))}
    </div>
  );
}

const SHOP_POLICY = {
  id: 'gid://shopify/Menu/199655620664',
  items: [
    {
      title: 'Fakturační údaje',
      type: 'SHOP_POLICY',
      url: 'https://or.justice.cz/ias/ui/rejstrik-$firma?jenPlatne=PLATNE&nazev=direct+auto&polozek=50&typHledani=STARTS_WITH',
    },
    {
      title: 'Zpracování osobních údajů',
      type: 'SHOP_POLICY',
      url: 'https://www.direct-auto.cz/osobni-udaje',
    },
    {
      title: 'Cookie Policy',
      type: 'SHOP_POLICY',
      url: 'https://drc-auto.myshopify.com/pages/informace-o-pouzivani-cookies',
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
    color: isPending ? 'grey' : 'white',
  };
}

/** @typedef {import('storefrontapi.generated').FooterQuery} FooterQuery */
