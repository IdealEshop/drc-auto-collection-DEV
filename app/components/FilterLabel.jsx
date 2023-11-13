import { useState } from "react";

export default function FilterLabel({filter, setFilter, originFilters}) {

  const [isOpen, setIsOpen] = useState(false);

  function clickHandlerer(){
    setIsOpen(!isOpen)

  }

  function getLabel(filter){
    let label;
    originFilters.forEach((originFilter)=>{
      if(originFilter.id.slice(originFilter.id.lastIndexOf(".")+1) == filter.key){
         label=originFilter.label;       
      } else if(originFilter.id.slice(originFilter.id.lastIndexOf(".")+1) == "n_jezd_pro_filtr" && filter.key=="mileage") {
        label="Nájezd"
      } else if(filter.key == "price") {
        label = filter.key;
      }
      
    })
    return label;
  }


  if(getLabel(filter)=="Značka"){
    const znackyNaZacatek = ['Škoda', 'Volkswagen', 'Fiat', 'Mazda'];
    let filterSort = filter.values.sort();

  znackyNaZacatek.reverse().forEach((znacka) => {
    
  const index = filterSort.indexOf(znacka);
    if (index !== -1) {
      filterSort.splice(index, 1);
      filterSort.unshift(znacka);
    }
  });
  filter.values = filterSort;
    

  } else if(getLabel(filter)!="Cena"){
    filter.values.sort();
  }

       
    return (
      <div className="flex flex-col gap-2 py-[1.5rem] border-b">
        <p className="hover:underline cursor-pointer flex justify-between" onClick={clickHandlerer}>
          {getLabel(filter)}
          <svg aria-hidden="true" focusable="false" role="presentation" className={`icon icon-caret shrink-0 w-[10px] items-center ${isOpen ? "rotate-180" : ""}`} viewBox="0 0 10 6">
            <path fillRule="evenodd" clipRule="evenodd" d="M9.354.646a.5.5 0 00-.708 0L5 4.293 1.354.646a.5.5 0 00-.708.708l4 4a.5.5 0 00.708 0l4-4a.5.5 0 000-.708z" fill="currentColor">
            </path></svg>
          </p>
        <ul className={`flex flex-col ${isOpen ? "" : "hidden"}`}>
          {getLabel(filter)== "Nájezd" ? 

            originFilters[3].values.map((value)=>(
              <li className="flex gap-1" key={value.id}>
                <input className="filter-input" id={value.id.slice(value.id.lastIndexOf(".")+1)} data-key={"n_jezd_pro_filtr"}  type="checkbox" onChange={setFilter}/>
                <label htmlFor={value.id}>{value.label}</label>
              </li>

            ))
          
          :
          
          filter.values.map((value)=>(
            <li className="flex  gap-1" key={`${filter.key}.${value}`}>
              <input id={value} className="filter-input" data-key={filter.key} type="checkbox" onChange={setFilter}/>
              <label htmlFor={value}>{value.replace(/[\[\]"]/g, '')}</label>

            </li>
          ))}
        </ul>
      </div>
    );
  }

 