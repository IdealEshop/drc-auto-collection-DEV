import {useLoaderData, Link} from '@remix-run/react';
import {Image} from '@shopify/hydrogen';
import {useEffect} from 'react';
import LoadingSpinner from '~/components/LoadingSpinner';

export function meta() {
  return [
    {title: 'Hydrogen'},
    {description: 'A custom storefront powered by Hydrogen'},
  ];
}

export async function loader({context}) {
  return await context.storefront.query(COLLECTIONS_QUERY);
}

export default function Index() {
  const {collections} = useLoaderData();

  useEffect(() => {
    collections.nodes.forEach((collection) => {
      if (collection.handle.includes('ojete'))
        window.location.href = 'collections/' + collection.handle;
    });
  }, []);

  return (
    <section className="w-full gap-4">
      <LoadingSpinner />
    </section>
  );
}

const COLLECTIONS_QUERY = `#graphql
  query FeaturedCollections {
    collections(first: 3, query: "collection_type:smart") {
      nodes {
        id
        title
        handle
        image {
          altText
          width
          height
          url
        }
      }
    }
  }
`;
