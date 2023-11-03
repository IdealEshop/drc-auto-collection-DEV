import ProductCard from './ProductCard';
import { useState, useEffect } from "react";
import ProductSorting from './ProductSorting';
import LoadingSpinner from './LoadingSpinner';



export default function ProductGrid({products}) {

  useEffect(() => {
    setIsLoading(false);
    if(sessionStorage.getItem("sort")){
      setSort(sessionStorage.getItem("sort"))
    } else {
      sessionStorage.setItem("sort", sort);
    }
    
  },[]);
  
  const [sort, setSort] = useState("nejnovejsi") 
  const [isLoading, setIsLoading] = useState(true);

  

  function onChangeHadler(event){
    setSort(event.target.value)
    sessionStorage.setItem("sort", event.target.value);
    
  }



  switch (sort){
    case "najezd-low":
      products.sort((a,b)=>a.metafields[3].value - b.metafields[3].value )
      break;

    case "najezd-high":
      products.sort((a,b)=>b.metafields[3].value - a.metafields[3].value )
      break;

    case "year-youngh":
      products.sort((a,b)=>{
        const timeA = new Date(a.metafields[4].value).getTime()
        const timeB = new Date(b.metafields[4].value).getTime()
        return timeB - timeA
      })
      break;

    case "year-old":
      products.sort((a,b)=>{
        const timeA = new Date(a.metafields[4].value).getTime()
        const timeB = new Date(b.metafields[4].value).getTime()
        return timeA - timeB
      })
      
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
      break;
    
  }


  return (
    <section className="w-full">
       {isLoading ? <LoadingSpinner/> :
      <div className='gap-4 md:gap-8 flex flex-col'>
        <ProductSorting onChange={onChangeHadler} sort={sort}/>
        <div className="grid-flow-row grid gap-2 gap-y-6 md:gap-4 lg:gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
      }
    </section>
  );
}
