export default function ProductSorting({onChange, sort}) {
  
    return (
      <div className="flex justify-end items-center gap-2">
        <label>Seřadit dle:</label>
        <select name="sorting" onChange={onChange} value={sort}>
        <option value="nejnovejsi">
                Nejnovější
            </option>
            <option value="najezd-low">
                Nájezdu-nejnižší
            </option>

            <option value="najezd-high">
                Nájezdu-nejvyšší
            </option>
            <option value="year-youngh">
                Rok výroby-nejmladší
            </option>
            <option value="year-old">
                Rok výroby-nejstarší
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

 