import {useMatches, NavLink} from '@remix-run/react';
import PhoneLogo from '../../public/icons/PhoneIcon.svg';

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
  console.log(menu);
  return (
    <nav
      className="m-auto pt-[46px] pb-[32px] grid lg:grid-cols-4 grid-cols-2 gap-[67px] max-[460px]:grid-cols-1 max-[460px]:gap-[40px] text-white"
      role="navigation"
    >
      <div class="flex items-center gap-[16px] min-[460px]:hidden">
        <img src={PhoneLogo} alt="" />

        <span class="tw-text-[18px]">296 183 138</span>
      </div>
      {menu.items.map((item) => (
        <div key={item.title}>
          <p class="text-[20px] font-[600] mb-[24px]">{item.title}</p>
          <ul class="flex flex-col gap-[16px] text-[15px]">
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
      <div class="w-[180px] flex flex-col gap-[50px] max-[460px]:hidden">
        <div class="flex items-center gap-[16px]">
          <img src={PhoneLogo} alt="" />
          <span class="text-[18px]">296 183 138</span>
        </div>
        <div>
          <p class="text-[20px] font-[600] mb-[18px]">Sledujte nás</p>
          <div class="flex gap-[28px]">
            <a href="https://instagram.com/direct_auto_cz?igshid=YmMyMTA2M2Y=">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.1436 15.4771C13.9847 15.4771 15.4772 13.9846 15.4772 12.1435C15.4772 10.3024 13.9847 8.80994 12.1436 8.80994C10.3025 8.80994 8.81006 10.3024 8.81006 12.1435C8.81006 13.9846 10.3025 15.4771 12.1436 15.4771Z"
                  fill="white"
                ></path>
                <path
                  d="M16.3099 2.14282H7.97598C4.75992 2.14282 2.14307 4.76051 2.14307 7.97741V16.3113C2.14307 19.5274 4.76075 22.1443 7.97765 22.1443H16.3116C19.5276 22.1443 22.1445 19.5266 22.1445 16.3097V7.97574C22.1445 4.75968 19.5268 2.14282 16.3099 2.14282ZM12.1438 17.1439C9.38608 17.1439 7.14342 14.9012 7.14342 12.1435C7.14342 9.38584 9.38608 7.14318 12.1438 7.14318C14.9015 7.14318 17.1441 9.38584 17.1441 12.1435C17.1441 14.9012 14.9015 17.1439 12.1438 17.1439ZM17.9775 7.14318C17.5175 7.14318 17.1441 6.76982 17.1441 6.30979C17.1441 5.84975 17.5175 5.47639 17.9775 5.47639C18.4376 5.47639 18.8109 5.84975 18.8109 6.30979C18.8109 6.76982 18.4376 7.14318 17.9775 7.14318Z"
                  fill="white"
                ></path>
              </svg>
            </a>
            <a href="https://www.facebook.com/directautocz">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M7.97598 2.14282H16.3099C19.5268 2.14282 22.1445 4.75968 22.1445 7.97574V16.3097C22.1445 19.5266 19.5276 22.1443 16.3116 22.1443H7.97765C4.76075 22.1443 2.14307 19.5274 2.14307 16.3113V7.97741C2.14307 4.76051 4.75992 2.14282 7.97598 2.14282ZM12.9338 12.4671V17.8675H10.8003V12.4671H9.00021V10.3336H10.8003V8.80017C10.8003 7.00004 11.9338 5.99997 13.5339 5.99997C14.0156 5.99997 14.4687 6.02874 14.7795 6.04848C14.9418 6.05879 15.0654 6.06664 15.134 6.06664V8.00011H14.0006C13.1338 8.00011 12.9338 8.40014 12.9338 9.00018V10.3336H15.0006L14.734 12.4671H12.9338Z"
                  fill="white"
                ></path>
              </svg>
            </a>
            <a href="https://www.linkedin.com/company/direct-auto-cz/">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M16.3099 2.14282H7.97598C4.75992 2.14282 2.14307 4.76051 2.14307 7.97741V16.3113C2.14307 19.5274 4.76075 22.1443 7.97765 22.1443H16.3116C19.5276 22.1443 22.1445 19.5266 22.1445 16.3097V7.97574C22.1445 4.75968 19.5268 2.14282 16.3099 2.14282ZM9.12677 8.19166C9.12677 8.93669 8.5228 9.54066 7.77777 9.54066C7.03275 9.54066 6.42878 8.93669 6.42878 8.19166C6.42878 7.44663 7.03275 6.84267 7.77777 6.84267C8.5228 6.84267 9.12677 7.44663 9.12677 8.19166ZM18.0002 18.0243V13.7329C18.0002 11.434 16.7734 10.3644 15.1369 10.3644C13.816 10.3644 13.2258 11.0918 12.8954 11.601V10.5402H10.4083C10.4418 11.2428 10.4083 18.0243 10.4083 18.0243H12.8956V13.8447C12.8956 13.6207 12.9125 13.3981 12.9781 13.2381C13.158 12.7906 13.5669 12.328 14.254 12.328C15.154 12.328 15.5137 13.0144 15.5137 14.0203V18.0243H18.0002ZM12.8954 11.601V11.6252H12.8791C12.8816 11.6212 12.8846 11.6168 12.8876 11.6125C12.8903 11.6087 12.893 11.6048 12.8954 11.601ZM9.03301 18.0243H6.54657V10.5402H9.03301V18.0243Z"
                  fill="white"
                ></path>
              </svg>
            </a>
            <a href="https://youtu.be/ArGTbSVF8uE">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M7.97598 2.14282H16.3099C19.5268 2.14282 22.1445 4.75968 22.1445 7.97574V16.3097C22.1445 19.5266 19.5276 22.1443 16.3116 22.1443H7.97765C4.76075 22.1443 2.14307 19.5274 2.14307 16.3113V7.97741C2.14307 4.76051 4.75992 2.14282 7.97598 2.14282ZM18.247 12.6477C18.247 13.6848 18.1528 14.7375 18.1528 14.7375C18.1528 14.7375 18.0429 15.6174 17.6818 16.0103C17.2602 16.4743 16.8009 16.5231 16.5402 16.5507C16.5097 16.5539 16.4818 16.5569 16.4571 16.5602C14.73 16.6859 12.1393 16.7016 12.1393 16.7016C12.1393 16.7016 8.92061 16.6545 7.93144 16.5602C7.88906 16.5527 7.83758 16.5468 7.77906 16.5401H7.77905C7.46904 16.5046 6.96169 16.4464 6.56545 16.0103C6.18862 15.6174 6.09442 14.7375 6.09442 14.7375C6.09442 14.7375 6.00021 13.6848 6.00021 12.6477V11.6736C6.00021 10.6365 6.09442 9.58377 6.09442 9.58377C6.09442 9.58377 6.20432 8.70386 6.56545 8.31104C6.99554 7.83759 7.46491 7.78334 7.72253 7.75356C7.74706 7.75073 7.76966 7.74811 7.79013 7.74538C9.53295 7.61968 12.1236 7.60397 12.1236 7.60397C12.1236 7.60397 14.7143 7.61968 16.4414 7.74538C16.463 7.74826 16.487 7.751 16.5132 7.754C16.7741 7.78376 17.2538 7.83851 17.6818 8.29533C18.0586 8.68814 18.1528 9.58377 18.1528 9.58377C18.1528 9.58377 18.247 10.6365 18.247 11.6736V12.6477ZM10.8518 10.2124V13.8264L14.1804 12.0351L10.8518 10.2124Z"
                  fill="white"
                ></path>
              </svg>
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
