export default function ProductSorting({onChange}) {
    
    
  
    return (
      <div className="flex justify-end items-center gap-2">
        <label>Seřadit dle:</label>
        <select name="sorting" onChange={onChange}>
        <option value="nejnovejsi">
                Nejnovější
            </option>
            <option value="najezd">
                Nájezdu
            </option>
            <option value="najezd">
                Abecedně A-Z
            </option>
            <option value="najezd">
                Abecedně Z-A
            </option>
        </select>
      </div>
    );
  }

 