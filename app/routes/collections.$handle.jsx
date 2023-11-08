import { useLoaderData } from '@remix-run/react';
import { json } from '@shopify/remix-oxygen';
import ProductFilter from '~/components/ProductFilter';
import ProductGrid from '../components/ProductGrid';
import { useState, useMemo } from "react";
import { useEffect } from 'react';
import { useSearchParams } from '@remix-run/react';



export const handle = {
  seo,
};

function seo({ data }) {
  return {
    title: data?.collection?.title,
    description: data?.collection?.description,
  };
}

export async function loader({ params, context }) {
  const { handle } = params;

  const productsPerPage = 250; // Počet produktů na stránku
  let products = [];
  let cursor = null;
  let collectionFilters;

  while (true) {
    const { collection } = await context.storefront.query(COLLECTION_QUERY, {
      variables: {
        handle,
        first: productsPerPage,
        after: cursor,
      },
    });

    if (!collection) {
      throw new Response(null, { status: 404 });
    }

    products = products.concat(collection.products.nodes);

    if (!collection.products.pageInfo.hasNextPage) {
      break;
    }

    cursor = collection.products.pageInfo.endCursor;
    collectionFilters = collection.products.filters;
  }

  return json({
    products,
    collectionFilters
  });
}

export default function Collection() {
  
  const { products, collectionFilters } = useLoaderData();
  const [filters, setFilters] = useState()
  const [filteredCars, setFilteredCars] = useState(products);
  const [searchParams, setSearchParams] = useSearchParams();

  useMemo(() => {
    renderFilters(products)
    
  },[]);

  useEffect(()=>{
    lookforSearchParams();
  },[])

  function lookforSearchParams(){
    const inputs = document.querySelectorAll(".filter-input");
    searchParams.forEach((value, key) => {
      inputs.forEach((input)=>{
        
        if(input.id == value){
          input.checked = true;
        }
      })
    });
   
    setFiltersHandler();
  }

   

  // Vytvoří filtry dle metafiledů dostupných aut
  function renderFilters(cars, checkedInputs){
    let carFilters = {};
    cars.forEach(product => {
      product.metafields.forEach(metafield => {
        if (carFilters[metafield.key]) {
          if (!carFilters[metafield.key].values.includes(metafield.value)) {
            carFilters[metafield.key].values.push(metafield.value);
          }
        } else {
          carFilters[metafield.key] = {
            key: metafield.key,
            values: [metafield.value],
          };
        }
      });
    });

       
    const carFiltersArray = Object.values(carFilters);

    // Pokud jsou filtry prázdné, vyplň je podle metadfieldů všech aut. - Inicializace před pervním renderem
    if (!filters){
      setFilters(carFiltersArray);
    } else {
      // Pokud se nejedná o první render
      let filtersWithAllBrands=[];
      
      carFiltersArray.forEach((object,index)=>{
        // Pro filtr značka nech všechny značky z dostuponých aut pokud je eventKey výrobce
        if(index == 0 && checkedInputs?.hasOwnProperty("v_robce")){
          filtersWithAllBrands[index] = filters[index]
        } else if(index == 1 && checkedInputs?.hasOwnProperty("model")){
          filtersWithAllBrands[index] = filters[index]
        } else {

          // Zbytek filtrů (model) uprav dle vyfiltrovaných značek
          filtersWithAllBrands.push(object)
          setFilters(filtersWithAllBrands);
        }
      })
     
    }
    

  }



// Z inputů, které jsou check vytvoří objekt "checkedInputs", kde key je název souborů filtrů hodnota je array zaškrtnutých filtrů daného souboru. Například v_robce:[Audi, BMW]...
  function setFiltersHandler(event){
    
     
    let checkedInputs={};
    const inputs = document.querySelectorAll(".filter-input");
    inputs.forEach((input)=>{
     if(input.checked){
      if(checkedInputs[input.dataset.key]){
        checkedInputs[input.dataset.key].push(input.id);

      } else {
        checkedInputs[input.dataset.key]=[input.id]
        
      }      
     } else {
      if(checkedInputs[input.dataset.key]){
        if(checkedInputs[input.dataset.key].indexOf(input.id) > 1){
          const index = checkedInputs[input.dataset.key].indexOf(input.id)
          checkedInputs[input.dataset.key].splice(index,1);
        }
       }
      }
    })


// Do proměnné filteredCars uloží všechny auta a postupně je profiltruje dle obsahu checkedInputs. 
    let urlFilter="";
    if(Object.keys(checkedInputs).length != 0){
      let filteredCars = products;
    Object.keys(checkedInputs).forEach((key)=>{

      let metafieldIndex;
      
      checkedInputs[key].forEach((value)=>{
        urlFilter+=`${key}=${value}&`
      })      
      
      switch (key) {
        case "v_robce":
          metafieldIndex = 0
          
          break;
        
          case "model":
            metafieldIndex = 1
          break;

          case "condition":
            metafieldIndex = 2
          break;
      
        default:
          break;
      }


      filteredCars = filteredCars.filter((product)=>{
        return checkedInputs[key].includes(product.metafields[metafieldIndex].value)
      });
      setFilteredCars(filteredCars);
      renderFilters(filteredCars, checkedInputs)
    })
  } else {
    //Pokud není žádný filtr zaškrtnut, zobrazuej všechny produkty.
    setFilteredCars(products)
    renderFilters(products)
  }
  setSearchParams(urlFilter)


  }


  return (
    <section className='flex gap-3 page-width'>
      <ProductFilter filters={filters} originFilters={collectionFilters} setFilter={setFiltersHandler}/>
      <ProductGrid products={filteredCars}/>
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
            {namespace: "custom", key: "v_robce"},
            {namespace: "custom", key: "model"},
            {namespace: "parameters", key: "condition"},
            {namespace: "parameters", key: "mileage"},
            {namespace: "parameters", key: "year_production"},
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
