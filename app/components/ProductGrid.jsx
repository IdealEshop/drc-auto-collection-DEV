import {useState, useEffect} from 'react';
import {useSearchParams} from '@remix-run/react';

import ProductCard from './ProductCard';
import ProductSorting from './ProductSorting';
import LoadingSpinner from './LoadingSpinner';

export default function ProductGrid({products, url}) {
  const [sort, setSort] = useState('nejnovejsi');
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();

  const imagePerRow = 12;
  const [next, setNext] = useState(imagePerRow);

  useEffect(() => {
    setIsLoading(false);
    if (searchParams.size > 0) {
      searchParams.forEach((value, key) => {
        if (key == 'sort_by') setSort(value);
      });
    } else {
      window.history.pushState(null, '', `?sort_by=${sort}`);
    }
  }, []);

  useEffect(() => {
    handleUrl();
  }, [sort, url]);

  function handleUrl() {
    let urlWithSort = url;
    urlWithSort += `sort_by=${sort}`;
    setSearchParams(urlWithSort);
  }

  function handleMoreCars() {
    setNext(next + imagePerRow);
  }

  function onChangeHadler(event) {
    setSort(event.target.value);
    sessionStorage.setItem('sort', event.target.value);
  }

  const yearMetafieldIndex = products[0]?.metafields.findIndex(
    (prvek) => prvek?.key === 'year_production',
  );
  switch (sort) {
    case 'nejnovejsi':
      products.sort((a, b) => {
        const timeA = new Date(a.publishedAt).getTime();
        const timeB = new Date(b.publishedAt).getTime();
        if (timeA == timeB) {
          return a.metafields[3].value - b.metafields[3].value;
        } else {
          return timeB - timeA;
        }
      });
      break;

    case 'nejstarsi':
      products.sort((a, b) => {
        const timeA = new Date(a.publishedAt).getTime();
        const timeB = new Date(b.publishedAt).getTime();
        if (timeA == timeB) {
          return b.metafields[3].value - a.metafields[3].value;
        } else {
          return timeA - timeB;
        }
      });
      break;

    case 'najezd-low':
      products.sort((a, b) => a.metafields[3].value - b.metafields[3].value);
      break;

    case 'najezd-high':
      products.sort((a, b) => b.metafields[3].value - a.metafields[3].value);
      break;

    case 'year-youngh':
      products.sort((a, b) => {
        const timeA = new Date(
          a.metafields[yearMetafieldIndex].value,
        ).getTime();
        const timeB = new Date(
          b.metafields[yearMetafieldIndex].value,
        ).getTime();
        return timeB - timeA;
      });
      break;

    case 'year-old':
      products.sort((a, b) => {
        const timeA = new Date(
          a.metafields[yearMetafieldIndex].value,
        ).getTime();
        const timeB = new Date(
          b.metafields[yearMetafieldIndex].value,
        ).getTime();
        return timeA - timeB;
      });

      break;

    case 'alphabetically-A-Z':
      products.sort((a, b) => {
        return a.title.localeCompare(b.title);
      });

      break;

    case 'alphabetically-Z-A':
      products.sort((a, b) => {
        return b.title.localeCompare(a.title);
      });

      break;

    default:
      break;
  }

  if (isLoading) {
    return (
      <section className="w-full pt-0">
        <LoadingSpinner />
      </section>
    );
  } else if (products.length > 0) {
    return (
      <section className="w-full pt-0">
        <div className="gap-4 md:gap-[20px] flex flex-col">
          <ProductSorting onChange={onChangeHadler} sort={sort} />

          <div className="grid min-[890px]:grid-cols-3 sm:grid-cols-2 grid-cols-1  gap-6">
            {products.slice(0, next).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          {next < products?.length && (
            <button
              className="mt-4 px-[30px] py-[11px] w-[250px] flex justify-center items-center bg-green_direct shrink-0 hover:bg-green_direct_darker hover:ease-in-out duration-200 self-center rounded-full"
              onClick={handleMoreCars}
            >
              Načíst více aut
            </button>
          )}
        </div>
      </section>
    );
  } else {
    return (
      <section className="w-full pt-0">
        <div className="gap-4 md:gap-[20px] flex flex-col">
          <div className="bg-white flex items-center justify-center h-[500px]">
            Pro Váš výběr bohužel nemáme žádné auto. Změňte parametry filtru a
            nebo se zkuste podívat později
          </div>
        </div>
      </section>
    );
  }
}
