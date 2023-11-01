export default function FilterLabel({filter}) {
  console.log(filter);
  
    return (
      <div className="flex flex-col gap-3">
        {filter.label}
        <div>
          {filter.values.map((value)=>(
            <div className="flex gap-1">
              <input id="{value.id}" type="checkbox"/>
              <label htmlFor="{value.id}">{value.label} ({value.count})</label>

            </div>
          ))}
        </div>
      </div>
    );
  }

 