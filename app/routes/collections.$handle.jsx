import {useLoaderData} from '@remix-run/react';
import {json} from '@shopify/remix-oxygen';
import ProductFilterDesktop from '~/components/ProductFilterDesktop';
import ProductGrid from '../components/ProductGrid';
import {useState, useMemo} from 'react';
import {useEffect} from 'react';
import {useSearchParams} from '@remix-run/react';
import ProductFilterMobile from '~/components/ProductFilterMobile';

export const handle = {
  seo,
};

function seo({data}) {
  return {
    title: data?.collection?.title,
    description: data?.collection?.description,
  };
}

export async function loader({params, context}) {
  const {handle} = params;

  const productsPerPage = 250; // Počet produktů na stránku
  let products = [];
  let cursor = null;
  let collectionFilters;
  let wholeCollection;

  while (true) {
    const {collection} = await context.storefront.query(COLLECTION_QUERY, {
      variables: {
        handle,
        first: productsPerPage,
        after: cursor,
      },
    });

    if (!collection) {
      throw new Response(null, {status: 404});
    }

    products = products.concat(collection.products.nodes);

    collectionFilters = collection.products.filters;
    if (!collection.products.pageInfo.hasNextPage) {
      break;
    }

    cursor = collection.products.pageInfo.endCursor;
  }

  return json({
    products,
    collectionFilters,
  });
}

export default function Collection() {
  const {products, collectionFilters} = useLoaderData();
  const [filters, setFilters] = useState();
  const [filteredCars, setFilteredCars] = useState(products);
  const [url, setUrl] = useState();
  const [searchParams, setSearchParams] = useSearchParams();

  useMemo(() => {
    renderFilters(products);
  }, []);

  useEffect(() => {
    lookforSearchParams();
  }, []);

  function lookforSearchParams() {
    const inputs = document.querySelectorAll('.filter-input');
    searchParams.forEach((value, key) => {
      inputs.forEach((input) => {
        if (input.id == value) {
          input.checked = true;
        }
      });
    });

    setFiltersHandler();
  }

  // Vytvoří filtry dle metafiledů dostupných aut
  function renderFilters(cars, checkedInputs) {
    let carFilters = {};
    cars.forEach((product) => {
      product.metafields.forEach((metafield) => {
        if (metafield) {
          if (carFilters[metafield.key]) {
            if (!carFilters[metafield.key].values.includes(metafield.value)) {
              carFilters[metafield.key].values.push(metafield.value);
            }
          } else {
            carFilters[metafield.key] = {
              key: metafield?.key,
              values: [metafield.value],
            };
          }
        }
      });
    });

    const filtersArrayByCars = Object.values(carFilters);

    // Pokud jsou filtry prázdné, vyplň je podle metadfieldů všech aut. - Inicializace před pervním renderem
    if (!filters) {
      setFilters(filtersArrayByCars);
    } else {
      // Pokud se nejedná o první render
      let filtersWithAllBrands = [];

      filtersArrayByCars.forEach((object, index) => {
        // Pro filtr značka nech všechny značky z dostuponých aut pokud je eventKey výrobce
        if (index == 1 && checkedInputs?.hasOwnProperty('v_robce')) {
          filtersWithAllBrands[index] = filters[index];
        } else if (index == 2 && checkedInputs?.hasOwnProperty('model')) {
          filtersWithAllBrands[index] = filters[index];
        } else {
          // Zbytek filtrů (model) uprav dle vyfiltrovaných značek
          filtersWithAllBrands.push(object);
          setFilters(filtersWithAllBrands);
        }
      });
    }
  }

  // Z inputů, které jsou check vytvoří objekt "checkedInputs", kde key je název souborů filtrů hodnota je array zaškrtnutých filtrů daného souboru. Například v_robce:[Audi, BMW]...
  function setFiltersHandler(event) {
    let checkedInputs = {};
    const inputs = getInputs();
    inputs.forEach((input) => {
      if (input.checked) {
        if (checkedInputs[input.dataset.key]) {
          checkedInputs[input.dataset.key].push(input.id);
        } else {
          checkedInputs[input.dataset.key] = [input.id];
        }
      } else {
        if (checkedInputs[input.dataset.key]) {
          if (checkedInputs[input.dataset.key].indexOf(input.id) > 1) {
            const index = checkedInputs[input.dataset.key].indexOf(input.id);
            checkedInputs[input.dataset.key].splice(index, 1);
          }
        }
      }
    });

    // Do proměnné filteredCars uloží všechny auta a postupně je profiltruje dle obsahu checkedInputs.
    let urlFilter = '';

    if (Object.keys(checkedInputs).length != 0) {
      let filteredCars = products;
      Object.keys(checkedInputs).forEach((key) => {
        checkedInputs[key].forEach((value) => {
          urlFilter += `${key}=${value}&`;
        });

        // Zjjisti index metafieldu který se použije pro filtrování
        let metafieldIndex;

        products[0].metafields.some((prvek, index) => {
          if (key === 'n_jezd_pro_filtr') {
            if (prvek && prvek.key === 'mileage') {
              metafieldIndex = index;
              return true;
            }
          } else if (prvek != null) {
            if (prvek.key == key) {
              metafieldIndex = index;
              return true;
            }
          } else {
            metafieldIndex = index;
            return false;
          }
          return false;
        });
        // Najezd pro filtr je custom filtr, který se názvem liší od metafieldu productu, proto je zde podmínka if
        if (key == 'n_jezd_pro_filtr') {
          // Převede stringy nejvyšího nájezdu na čísla a vybere ten nejvyšší nájezd
          const stringsToNumbers = checkedInputs[key].map((value) =>
            parseInt(value.replace(/\D/g, '')),
          );
          const nejvyssiNajezd = Math.max.apply(null, stringsToNumbers);
          checkedInputs[key].forEach((value) => {
            // Jestli je vybraná možnost nad, změna podmínky ve filtrování
            if (!value.includes('nad'))
              filteredCars = filteredCars.filter(
                (product) =>
                  product.metafields[metafieldIndex].value < nejvyssiNajezd,
              );
            else
              filteredCars = filteredCars.filter(
                (product) =>
                  product.metafields[metafieldIndex].value > nejvyssiNajezd,
              );
          });
        } else if (key == 'price') {
          const stringsToNumbers = checkedInputs[key].map((value) =>
            parseInt(value.replace(/\D/g, '')),
          );
          const nejvyssiCena = Math.max.apply(null, stringsToNumbers);

          filteredCars = filteredCars.filter((product) => {
            const {price} = product.variants?.nodes[0] || 0;
            return price.amount < nejvyssiCena;
          });
        } else {
          filteredCars = filteredCars.filter((product) => {
            return checkedInputs[key].includes(
              product.metafields[metafieldIndex]?.value,
            );
          });
        }

        setFilteredCars(filteredCars);
        renderFilters(filteredCars, checkedInputs);
      });
    } else {
      //Pokud není žádný filtr zaškrtnut, zobrazuej všechny produkty.
      setFilteredCars(products);
      renderFilters(products);
    }

    //Nastaví url query podle vybraných inputů
    setUrl(urlFilter);
  }

  function clearFilters() {
    getInputs().forEach((input) => (input.checked = false));
    setFiltersHandler();
  }

  function getInputs() {
    return document.querySelectorAll('.filter-input');
  }

  return (
    <section className="page-width">
      <h1 className="font-normal !font-serif text-[32px] mb-[32px] text-center mt-[3rem]">
        Nabídka aut
      </h1>
      <div className="flex xl:flex-row flex-col xl:gap-[3rem] gap-[2rem] ">
        <ProductFilterMobile
          filters={filters}
          originFilters={collectionFilters}
          setFilter={setFiltersHandler}
          clearFilters={clearFilters}
        />

        <ProductFilterDesktop
          filters={filters}
          originFilters={collectionFilters}
          setFilter={setFiltersHandler}
          clearFilters={clearFilters}
        />
        <ProductGrid products={filteredCars} url={url} />
      </div>
    </section>
  );
}

const COLLECTION_QUERY = `#graphql
  query CollectionDetails($handle: String!, $first: Int!, $after: String) {
    collection(handle: $handle) {
      id
      title
      description
      products(first: $first, after: $after) {
        filters {
        id
        label
        type
        values {
          id
          label
          count
          input
        }
      }
        nodes {
          id
          title
          publishedAt
          handle
          metafields (identifiers: [ 
            {namespace: "parameters", key: "condition"},
            {namespace: "custom", key: "v_robce"},
            {namespace: "custom", key: "model"},
            {namespace: "parameters", key: "mileage"},
            {namespace: "custom", key: "karoserie"},
            {namespace: "parameters", key: "fuel"},
            {namespace: "parameters", key: "transmission"},
            {namespace: "parameters", key: "drive"},
            {namespace: "custom", key: "barva"},
            {namespace: "parameters", key: "year_production"},
            {namespace: "parameters", key: "finance"},
            {namespace: "custom", key: "hl_vybava_odpocetdph"},
            {namespace: "parameters", key: "power"},
            {namespace: "custom", key: "hl_vybava_4x4"},
            {namespace: "custom", key: "hl_vybava_klimatizace"},
            {namespace: "custom", key: "hl_vybava_xenonyled"},
            {namespace: "custom", key: "hl_vybava_parkovani"},
            {namespace: "custom", key: "hl_vybava_tazne"},
            {namespace: "custom", key: "hl_vybava_kuze"},
            {namespace: "custom", key: "hl_vybava_nezavisletopeni"},
            {namespace: "custom", key: "hl_vybava_panorama"},
            {namespace: "custom", key: "featured_installment"},
            ]) {
              key
              value
            }
          variants(first: 1) {
            nodes {
              id
              image {
                url
                altText
                width
                height
              }
              price {
                amount
                currencyCode
              }
              compareAtPrice {
                amount
                currencyCode
              }
            }
          }
        }
        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }
  }
`;
