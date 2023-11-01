import ProductCard from './ProductCard';
import { useState } from "react";
import ProductSorting from '~/components/ProductSorting';


export default function ProductGrid({products}) {
  
  const [sort, setSort] = useState("nejnovejsi") 

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
    <section className="w-full gap-4 md:gap-8 grid">
            <ProductSorting onChange={onChangeHadler}/>
      <div className="grid-flow-row grid gap-2 gap-y-6 md:gap-4 lg:gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
