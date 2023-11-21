export default function ProductSorting({onChange, sort}) {
  return (
    <div className="flex justify-end items-center">
      <label>Seřadit dle:</label>
      <div className="flex items-center relative">
        <select
          id="sorting"
          name="sorting"
          onChange={onChange}
          value={sort}
          className="border-none pr-0 cursor-pointer"
        >
          <option value="nejnovejsi">Přidání: Nejnovější</option>
          <option value="nejstarsi">Přidání: Nejstarší</option>
          <option value="najezd-low">Nájezdu: Nejnižší</option>

          <option value="najezd-high">Nájezdu: Nejvyšší</option>
          <option value="year-youngh">Rok výroby: Nejmladší</option>
          <option value="year-old">Rok výroby: Nejstarší</option>
          <option value="alphabetically-A-Z">Abecedně A-Z</option>
          <option value="alphabetically-Z-A">Abecedně Z-A</option>
        </select>
        <svg
          aria-hidden="true"
          focusable="false"
          role="presentation"
          className="icon icon-caret h-[6px] absolute right-0"
          viewBox="0 0 10 6"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M9.354.646a.5.5 0 00-.708 0L5 4.293 1.354.646a.5.5 0 00-.708.708l4 4a.5.5 0 00.708 0l4-4a.5.5 0 000-.708z"
            fill="currentColor"
          ></path>
        </svg>
      </div>
    </div>
  );
}
