import {useState} from 'react';
import FilterLabel from './FilterLabel';
import {useEffect} from 'react';

export default function ProductFilterMobile({
  filters,
  setFilter,
  originFilters,
  clearFilters,
}) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    handleBodyOverflow();
  }, [isOpen]);

  function handleOpenFilters() {
    setIsOpen(true);
  }

  function handleCloseFilters() {
    setIsOpen(false);
  }

  function handleBodyOverflow() {
    const body = document.querySelector('body');
    if (isOpen) body.classList.add('overflow-y-hidden');
    else body.classList.remove('overflow-y-hidden');
  }

  function handleClearFilter() {
    clearFilters();
  }
  const priceFilter = {
    key: 'price',
    values: [
      'do 50 000 Kč',
      'do 100 000 Kč',
      'do 250 000 Kč',
      'do 500 000 Kč',
      'do 750 000 Kč',
      'do 1 000 000 Kč',
      'do 1 250 000 Kč',
      'do 1 500 000 Kč',
      'do 1 750 000 Kč',
      'do 2 000 000 Kč',
    ],
  };

  const filterWithPrice = [...filters, priceFilter];

  if (isOpen) {
    return (
      <section className="absolute top-0 bottom-0 right-0 left-0 flex flex-col p-4 xl:hidden z-50 bg-white ">
        <div className="w-full pb-10">
          <div className="absolute w-full left-0 top-0 p-4 shadow-[0px_5.13384px_33.8082px_rgba(0,_0,_0,_0.075)] flex justify-between">
            <span>Parametry</span>
            <div className="flex gap-3">
              <button
                type="button"
                className="flex gap-2 items-center"
                onClick={handleClearFilter}
              >
                <span className="text-[#5A2382] font-medium text-[15px] underline hover:no-underline">
                  Vyčistit
                </span>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M20.2871 5.24297C20.6761 5.24297 21 5.56596 21 5.97696V6.35696C21 6.75795 20.6761 7.09095 20.2871 7.09095H3.71385C3.32386 7.09095 3 6.75795 3 6.35696V5.97696C3 5.56596 3.32386 5.24297 3.71385 5.24297H6.62957C7.22185 5.24297 7.7373 4.82197 7.87054 4.22798L8.02323 3.54598C8.26054 2.61699 9.0415 2 9.93527 2H14.0647C14.9488 2 15.7385 2.61699 15.967 3.49699L16.1304 4.22698C16.2627 4.82197 16.7781 5.24297 17.3714 5.24297H20.2871ZM18.8058 19.134C19.1102 16.2971 19.6432 9.55712 19.6432 9.48913C19.6626 9.28313 19.5955 9.08813 19.4623 8.93113C19.3193 8.78413 19.1384 8.69713 18.9391 8.69713H5.06852C4.86818 8.69713 4.67756 8.78413 4.54529 8.93113C4.41108 9.08813 4.34494 9.28313 4.35467 9.48913C4.35646 9.50162 4.37558 9.73903 4.40755 10.1359C4.54958 11.8992 4.94517 16.8102 5.20079 19.134C5.38168 20.846 6.50498 21.922 8.13206 21.961C9.38763 21.99 10.6811 22 12.0038 22C13.2496 22 14.5149 21.99 15.8094 21.961C17.4929 21.932 18.6152 20.875 18.8058 19.134Z"
                    fill="#5A2382"
                  ></path>
                </svg>
              </button>
              <button
                type="button"
                className="flex gap-2 items-center"
                onClick={handleCloseFilters}
              >
                <span className="text-[#5A2382] text-[15px] underline hover:no-underline">
                  Zavřít
                </span>
                <svg
                  width="15"
                  height="14"
                  viewBox="0 0 15 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4.9685 7.00619L0.925253 2.94961C0.90355 2.92883 0.882122 2.90734 0.861002 2.88512C0.243859 2.26798 0.243859 1.30798 0.895288 0.656548C1.51243 0.00511908 2.47243 0.00511908 3.12386 0.656548L7.221 4.75369L11.3181 0.656548L11.3258 0.648936C11.977 0.00511908 12.932 0.00765621 13.5467 0.656548C14.1981 1.30798 14.1981 2.26798 13.581 2.88512C13.5599 2.90734 13.5385 2.92883 13.5167 2.94961L9.4735 7.00619L13.5124 11.0451C14.1981 11.7308 14.1639 12.6565 13.5467 13.308C12.8953 13.9594 11.9353 13.9937 11.2496 13.308L7.221 9.2661L3.19243 13.308C2.50672 13.9937 1.54672 13.9594 0.895288 13.308C0.278145 12.6565 0.243859 11.7308 0.929573 11.0451L4.9685 7.00619Z"
                    fill="#5A2382"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div className="flex flex-col overflow-y-auto">
          {filterWithPrice.map((filter) =>
            filter.key != 'year_production' &&
            filter.key != 'power' &&
            filter.key != 'hl_vybava_klimatizace' &&
            filter.key != 'hl_vybava_xenonyled' &&
            filter.key != 'hl_vybava_parkovani' &&
            filter.key != 'hl_vybava_tazne' &&
            filter.key != 'hl_vybava_kuze' &&
            filter.key != 'hl_vybava_nezavisletopeni' &&
            filter.key != 'hl_vybava_panorama' &&
            filter.key != 'featured_installment' &&
            filter.key != 'hl_vybava_4x4' ? (
              <FilterLabel
                filter={filter}
                key={filter.key}
                originFilters={originFilters}
                setFilter={setFilter}
                isMobile={true}
              />
            ) : (
              ''
            ),
          )}
        </div>
      </section>
    );
  } else {
    return (
      <div className="flex justify-between items-center pl-[24px] shadow-[0px_5.13384px_33.8082px_rgba(0,_0,_0,_0.075)] rounded-[20px] h-[58px] xl:hidden">
        <p>Parametry</p>
        <button
          type="button"
          onClick={handleOpenFilters}
          className="w-[58px] grid place-items-center shadow-[0px_5.13384px_33.8082px_rgba(0,_0,_0,_0.075)] rounded-r-[20px] h-full"
        >
          <svg
            width="19"
            height="19"
            viewBox="0 0 19 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.77685 7.63444V2.34409L7.77688 2.33269C7.78267 1.36272 8.52756 0.618164 9.49481 0.618164C10.5032 0.618164 11.2501 1.36857 11.2501 2.34409V7.63444H16.4787L16.4909 7.63448C17.5299 7.6403 18.234 8.38879 18.234 9.39789C18.234 10.3734 17.5244 11.1238 16.4787 11.1238H11.2501V16.3767C11.2501 17.4272 10.5032 18.1401 9.49481 18.1401C8.52379 18.1401 7.77685 17.4272 7.77685 16.3767V11.1238H2.51093L2.49957 11.1238C1.53408 11.118 0.792969 10.3696 0.792969 9.39789C0.792969 8.38485 1.53991 7.63444 2.51093 7.63444H7.77685Z"
              fill="#5A2382"
            ></path>
          </svg>
        </button>
      </div>
    );
  }
}
