import { useLoaderData } from '@remix-run/react';
import { json } from '@shopify/remix-oxygen';
import ProductSorting from '~/components/ProductSorting';
import ProductGrid from '../components/ProductGrid';
import { useState } from "react";


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
      break; // Zastavit načítání, pokud není další stránka
    }

    cursor = collection.products.pageInfo.endCursor;
  }

  return json({
    products,
  });
}

export default function Collection() {
  const { products } = useLoaderData();

  const [sort, setSort] = useState("nejnovejsi") 
  console.log(sort);



    function onChangeHadler(event){
        setSort(event.target.value)
      }

      switch (sort){
        case "najezd":
          products.sort((a,b)=>a.metafields[3].value - b.metafields[3].value )
          break;
        
        case "nejnovejsi":
         
          products.sort((a,b)=>{
            const timeA = new Date(a.publishedAt).getTime()
            const timeB = new Date(b.publishedAt).getTime()
            if(timeA == timeB){
              return a.metafields[3].value - b.metafields[3].value
            }else{
              return timeB - timeA} 
            }
              )
          break;

        default:
          console.log("bez změny");
      }

      console.log(products);
      
      

  return (
    <div>
      <ProductSorting onChange={onChangeHadler}/>
      <ProductGrid products={products}/>

    </div>
  );
}

const COLLECTION_QUERY = `#graphql
  query CollectionDetails($handle: String!, $first: Int!, $after: String) {
    collection(handle: $handle) {
      id
      title
      description
      products(first: $first, after: $after) {
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
