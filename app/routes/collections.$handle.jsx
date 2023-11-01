import { useLoaderData } from '@remix-run/react';
import { json } from '@shopify/remix-oxygen';
import ProductFilter from '~/components/ProductFilter';
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

  //const [filter, setFilter] = useState(""); 

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
      break; // Zastavit načítání, pokud není další stránka
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

  return (
    <div className='flex gap-3'>
      <ProductFilter filters={collectionFilters}/>
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
