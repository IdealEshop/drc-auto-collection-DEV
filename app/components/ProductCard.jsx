import {Link} from '@remix-run/react';
import {Image, Money} from '@shopify/hydrogen';
export default function ProductCard({product}) {
  const {price, compareAtPrice} = product.variants?.nodes[0] || {};
  const isDiscounted = compareAtPrice?.amount > price?.amount;

  return (
    <Link to={`https://drc-auto-dev.myshopify.com//products/${product.handle}`} className='rounded-[2rem]'>
      <div className="flex flex-col gap-y-[2.4rem]">
        <div className="shadow-sm relative rounded-t-[20px]">
          <Image
            data={product.variants.nodes[0].image}
            alt={product.title}
            className='rounded-t-[20px]'
          />
        </div>
        <div className="flex justify-between">
          <h3 className="text-[20px] min-[761px]:max-w-[240px] font-semibold font-serif">
            {product.title.slice(0, product.title.indexOf("/"))}
          </h3>
        </div>
        <div className="flex gap-4">
          <span className="max-w-prose whitespace-pre-wrap inherit text-copy flex gap-4">
            <Money withoutTrailingZeros data={price} />
            {isDiscounted && (
              <Money
                className="line-through opacity-50"
                withoutTrailingZeros
                data={compareAtPrice}
              />
            )}
          </span>
        </div>
      </div>
    </Link>
  );
}