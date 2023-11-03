export default function FilterLabel({filter, setFilter, originFilters}) {

  function onFilterset(event){
    if(event.target.checked){
      setFilter(event.target);
    }
  }

  function getLabel(filter){
    let label;
    console.log(filter.key);
    originFilters.forEach((originFilter)=>{
      if(originFilter.id.slice(originFilter.id.lastIndexOf(".")+1) == filter.key){
         label=originFilter.label;
         console.log("shoda");
         
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
                <input id={value.id} type="checkbox" onChange={onFilterset}/>
                <label htmlFor={value.id}>{value.label}</label>
              </li>

            ))
          
          :
          filter.values.sort().map((value)=>(
            <li className="flex gap-1" key={`${filter.key}.${value}`}>
              <input id={value} type="checkbox" onChange={onFilterset}/>
              <label htmlFor={value}>{value}</label>

            </li>
          ))}
        </ul>
      </div>
    );
  }

 