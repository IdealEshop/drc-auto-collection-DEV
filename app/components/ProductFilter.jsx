import FilterLabel from "./FilterLabel";

export default function ProductFilter({filters, setFilter, originFilters, clearFilters}) {

  function clickHandlerer(){
    clearFilters()
  }
  const priceFilter = {
    key:"price",
    values: ["do 50 000 Kč", "do 100 000 Kč", "do 250 000 Kč", "do 500 000 Kč", "do 750 000 Kč", "do 1 000 000 Kč", "do 1 250 000 Kč", "do 1 500 000 Kč", "do 1 750 000 Kč", "do 2 000 000 Kč"]
  }

  const filterWithPrice = [...filters, priceFilter];


    return (
  
      <section className="relative flex flex-col w-[338px] mt-[107px] p-4 shadow-[0px_5.13384px_33.8082px_rgba(0,_0,_0,_0.075)] rounded-[20px] h-fit">
        <div className="w-full pb-14 border-b">
          <div className="absolute w-full left-0 top-0 p-4 shadow-[0px_5.13384px_33.8082px_rgba(0,_0,_0,_0.075)] flex justify-between rounded-[20px]">
            <span>Parametry</span>
            <button type="button" className="flex gap-2" onClick={clickHandlerer}>
              <span className="text-[#5A2382] text-[15px] underline hover:no-underline">Vyčistit</span> 
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M20.2871 5.24297C20.6761 5.24297 21 5.56596 21 5.97696V6.35696C21 6.75795 20.6761 7.09095 20.2871 7.09095H3.71385C3.32386 7.09095 3 6.75795 3 6.35696V5.97696C3 5.56596 3.32386 5.24297 3.71385 5.24297H6.62957C7.22185 5.24297 7.7373 4.82197 7.87054 4.22798L8.02323 3.54598C8.26054 2.61699 9.0415 2 9.93527 2H14.0647C14.9488 2 15.7385 2.61699 15.967 3.49699L16.1304 4.22698C16.2627 4.82197 16.7781 5.24297 17.3714 5.24297H20.2871ZM18.8058 19.134C19.1102 16.2971 19.6432 9.55712 19.6432 9.48913C19.6626 9.28313 19.5955 9.08813 19.4623 8.93113C19.3193 8.78413 19.1384 8.69713 18.9391 8.69713H5.06852C4.86818 8.69713 4.67756 8.78413 4.54529 8.93113C4.41108 9.08813 4.34494 9.28313 4.35467 9.48913C4.35646 9.50162 4.37558 9.73903 4.40755 10.1359C4.54958 11.8992 4.94517 16.8102 5.20079 19.134C5.38168 20.846 6.50498 21.922 8.13206 21.961C9.38763 21.99 10.6811 22 12.0038 22C13.2496 22 14.5149 21.99 15.8094 21.961C17.4929 21.932 18.6152 20.875 18.8058 19.134Z" fill="#5A2382"></path>
              </svg>
            </button>
          </div>
        </div>
        <div className="flex flex-col">
        {filterWithPrice.map((filter)=>(
            filter.key !="year_production" ? <FilterLabel filter={filter} key={filter.key} originFilters={originFilters} setFilter={setFilter}/> : ""
          ))}
          
        </div>
        
      </section>
    );
  }

 