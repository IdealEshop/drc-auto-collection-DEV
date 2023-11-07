export default function FilterLabel({filter, setFilter, originFilters}) {

  function getLabel(filter){
    let label;
    originFilters.forEach((originFilter)=>{
      if(originFilter.id.slice(originFilter.id.lastIndexOf(".")+1) == filter.key){
         label=originFilter.label;       
      } else if(originFilter.id.slice(originFilter.id.lastIndexOf(".")+1) == "n_jezd_pro_filtr" && filter.key=="mileage") {
        label="Nájezd"
      }
      
    })
    return label;
  }


     
    return (
      <div className="flex flex-col gap-2 pb-3">
        {getLabel(filter)}
        <ul>{
          getLabel(filter)== "Nájezd" ? 
            originFilters[3].values.map((value)=>(
              <li className="flex gap-1" key={value.id}>
                <input className="filter-input" id={value.id}  type="checkbox" onChange={setFilter}/>
                <label htmlFor={value.id}>{value.label}</label>
              </li>

            ))
          
          :
          
          filter.values.sort().map((value)=>(
            <li className="flex gap-1" key={`${filter.key}.${value}`}>
              <input id={value} className="filter-input" data-key={filter.key} type="checkbox" onChange={setFilter}/>
              <label htmlFor={value}>{value}</label>

            </li>
          ))}
        </ul>
      </div>
    );
  }

 