export default function ProductSorting({onChange, sort}) {
  
    return (
      <div className="flex justify-end items-center gap-2">
        <label>Seřadit dle:</label>
        <select id="sorting" name="sorting" onChange={onChange} value={sort}>
            <option value="nejnovejsi">
                Přidání: Nejnovější
            </option>
            <option value="nejstarsi">
                Přidání: Nejstarší
            </option>
            <option value="najezd-low">
                Nájezdu: Nejnižší
            </option>

            <option value="najezd-high">
                Nájezdu: Nejvyšší
            </option>
            <option value="year-youngh">
                Rok výroby: Nejmladší
            </option>
            <option value="year-old">
                Rok výroby: Nejstarší
            </option>
            <option value="alphabetically-A-Z">
                Abecedně A-Z
            </option>
            <option value="alphabetically-Z-A">
                Abecedně Z-A
            </option> 
        </select>
      </div>
    );
  }

 