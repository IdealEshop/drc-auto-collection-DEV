export default function FilterLabel({filter, setFilter}) {

  function onFilterset(event){
    if(event.target.checked){
      setFilter(event.target);
    }
  }
 
    return (
      <div className="flex flex-col gap-2 pb-3">
        {filter.label}
        <ul>
          {filter.values.map((value)=>(
            <li className="flex gap-1" key={value.id}>
              <input id={value.id} type="checkbox" onChange={onFilterset}/>
              <label htmlFor={value.id}>{value.label} ({value.count})</label>

            </li>
          ))}
        </ul>
      </div>
    );
  }

 