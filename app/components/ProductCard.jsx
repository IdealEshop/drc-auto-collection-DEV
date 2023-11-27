import {Link} from '@remix-run/react';
import {Image, Money} from '@shopify/hydrogen';
import CardParameters from './CarParameters';
import CarAccessory from './CarAccessory';
import CarPrice from './CarPrice';
import CebiaLogo from '../../public/images/cebia_badge.webp';

export default function ProductCard({product}) {
  const {price, compareAtPrice} = product.variants?.nodes[0] || {};
  const isDiscounted = compareAtPrice?.amount > price?.amount;
  const isUsed =
    product.metafields.find((metafield) => metafield?.key === 'condition')
      ?.value === 'OJETÉ';
  const featuredInstallment = product.metafields.find(
    (metafield) => metafield?.key === 'featured_installment',
  )?.value;

  const conditionIndex = product.metafields.findIndex(
    (metafield) => metafield.key == 'condition',
  );

  return (
    <div className="flex flex-col gap-y-[2.4rem] h-full rounded-[2rem] shadow-[0px_5.13384px_33.8082px_rgba(0,_0,_0,_0.075)] hover:no-underline">
      <Link
        to={`https://drc-auto-dev.myshopify.com//products/${product.handle}`}
      >
        <div className="shadow-sm relative rounded-t-[20px]">
          <div
            id="product-badge"
            className="absolute px-[8px] py-[10px] flex gap-2"
          >
            {isDiscounted && (
              <span
                id="NoMediaStandardBadge-template--17542616711490__product-grid-8720056746311"
                className="badge flex items-center uppercase text-white border-none text-[12px] leading-[1.43em] font-normal font-serif px-[8px] py-[2px] rounded-[3rem] gap-[0.5rem] bg-red_1_70"
              >
                Akční nabídka
              </span>
            )}
            {isUsed && <img src={CebiaLogo} className=" h-[20px]" />}
          </div>

          <Image
            data={product.variants.nodes[0].image}
            alt={product.title}
            className="rounded-t-[20px]"
          />
        </div>
      </Link>
      <div className="px-[16px] pb-[16px] flex flex-col gap-y-[1.6rem] h-full">
        <Link
          to={`https://drc-auto-dev.myshopify.com//products/${product.handle}`}
          className="hover:no-underline"
        >
          <div className="flex justify-between">
            <h3 className="text-[20px] min-[761px]:max-w-[240px] font-semibold car-title ">
              {product.title.slice(0, product.title.indexOf('/'))}
            </h3>
            <span className="text-[12px] py-[8px] px-[10px] bg-[rgb(247,247,247)] h-fit rounded-full">
              {product.metafields[conditionIndex].value}
            </span>
          </div>
        </Link>
        <CardParameters product={product} />
        <CarAccessory product={product} isUsed={isUsed} />
        <Link
          className="!no-underline mt-auto"
          to={`https://drc-auto-dev.myshopify.com//products/${product.handle}#ie-pp-kalkulacka`}
        >
          <CarPrice
            price={price}
            compareAtPrice={compareAtPrice}
            isDiscounted={isDiscounted}
            isUsed={isUsed}
            featuredInstallment={featuredInstallment}
          />
        </Link>
      </div>
    </div>
  );
}
