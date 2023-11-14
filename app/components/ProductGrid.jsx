import { useState, useEffect } from "react";
import { useSearchParams } from '@remix-run/react';

import ProductCard from './ProductCard';
import ProductSorting from './ProductSorting';
import LoadingSpinner from './LoadingSpinner';



export default function ProductGrid({products, url}) {
  
  const [sort, setSort] = useState("nejnovejsi") 
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    setIsLoading(false);
    if(searchParams.size > 0){
      searchParams.forEach((value, key) => {
        console.log(key);
        if(key == "sort_by") setSort(value);
      });
    } else {
      window.history.pushState(
        null,
        "",
        `?sort_by=${sort}`)
    }
    
  },[]);

  useEffect(()=>{
    handleUrl()
  },[sort, url])

  function handleUrl(){
    let urlWithSort = url;
    urlWithSort+=`sort_by=${sort}`
    setSearchParams(urlWithSort);
  }



  function onChangeHadler(event){
    setSort(event.target.value)
    sessionStorage.setItem("sort", event.target.value);
  }

  const yearMetafieldIndex = products[0]?.metafields.findIndex(prvek=>prvek.key ==="year_production");
  switch (sort){

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

    case "nejstarsi":
     
      products.sort((a,b)=>{
        const timeA = new Date(a.publishedAt).getTime()
        const timeB = new Date(b.publishedAt).getTime()
        if(timeA == timeB){
          return b.metafields[3].value - a.metafields[3].value
        }else{
          return timeA - timeB} 
        }
          )
    break;
    
    case "najezd-low":
      products.sort((a,b)=>a.metafields[3].value - b.metafields[3].value )
    break;

    case "najezd-high":
      products.sort((a,b)=>b.metafields[3].value - a.metafields[3].value )
    break;

    case "year-youngh":
      
      products.sort((a,b)=>{
        const timeA = new Date(a.metafields[yearMetafieldIndex].value).getTime()
        const timeB = new Date(b.metafields[yearMetafieldIndex].value).getTime()
        return timeB - timeA
      })
      break;

    case "year-old":
          
      products.sort((a,b)=>{
        const timeA = new Date(a.metafields[yearMetafieldIndex].value).getTime()
        const timeB = new Date(b.metafields[yearMetafieldIndex].value).getTime()
        return timeA - timeB
      })
      
    break;

    case "alphabetically-A-Z":
          
      products.sort((a,b)=>{
        return a.title.localeCompare(b.title);
      })
      
    break;

    case "alphabetically-Z-A":
          
      products.sort((a,b)=>{
        return b.title.localeCompare(a.title);
      })
      
    break;

    

    default:
      break;
    
  }


  return (
    <section className="w-full">
       {isLoading ? <LoadingSpinner/> :
      <div className='gap-4 md:gap-8 flex flex-col'>
        <ProductSorting onChange={onChangeHadler} sort={sort}/>
        {products.length > 0 ? <div className="grid xl:grid-cols-3 gap-2 gap-y-6 md:gap-4 lg:gap-6 ">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div> : 
        <div className="bg-white flex items-center justify-center h-[500px]">Pro Váš výběr bohužel nemáme žádné auto. Změňte parametry filtru a nebo se zkuste podívat později</div> }
        
      </div>
      }
    </section>
  );
}
