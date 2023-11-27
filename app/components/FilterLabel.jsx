import {useState} from 'react';

export default function FilterLabel({
  filter,
  setFilter,
  originFilters,
  isMobile,
}) {
  const [isOpen, setIsOpen] = useState(isMobile);

  function clickHandlerer() {
    if (!isMobile) setIsOpen(!isOpen);
  }

  function getLabel(filter) {
    let label;
    originFilters?.forEach((originFilter) => {
      if (
        originFilter.id.slice(originFilter.id.lastIndexOf('.') + 1) ==
        filter.key
      ) {
        label = originFilter.label;
      } else if (
        originFilter.id.slice(originFilter.id.lastIndexOf('.') + 1) ==
          'n_jezd_pro_filtr' &&
        filter.key == 'mileage'
      ) {
        label = 'Nájezd';
      } else if (filter.key == 'price') {
        label = filter.key;
      } else if (filter.key == 'finance') {
        label = 'Finance';
      } else if (filter.key == 'hl_vybava_odpocetdph') {
        label = 'Odpočet DPH';
      }
    });
    return label;
  }

  if (getLabel(filter) == 'Značka') {
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
  } else if (getLabel(filter) != 'Cena') {
    filter.values.sort();
  } else if (getLabel(filter) != 'Odpočet DPH') {
  }

  return (
    <div className="flex flex-col gap-6 py-[1.5rem] border-b">
      <p
        className={` ${
          isMobile ? '' : 'cursor-pointer hover:underline'
        }  flex justify-between`}
        onClick={clickHandlerer}
      >
        {getLabel(filter)}
        <svg
          aria-hidden="true"
          focusable="false"
          role="presentation"
          className={`icon icon-caret shrink-0 w-[10px] items-center ${
            isOpen ? 'rotate-180' : ''
          } ${isMobile && 'hidden'}`}
          viewBox="0 0 10 6"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M9.354.646a.5.5 0 00-.708 0L5 4.293 1.354.646a.5.5 0 00-.708.708l4 4a.5.5 0 00.708 0l4-4a.5.5 0 000-.708z"
            fill="currentColor"
          ></path>
        </svg>
      </p>
      <ul className={`flex flex-col gap-4 ${isOpen ? '' : 'hidden'}`}>
        {getLabel(filter) == 'Nájezd'
          ? originFilters[3].values.map((value) => (
              <li className="m-0" key={value.id}>
                <label className="flex gap-1">
                  <input
                    className="filter-input peer"
                    id={value.id.slice(value.id.lastIndexOf('.') + 1)}
                    data-key={'n_jezd_pro_filtr'}
                    type="checkbox"
                    onChange={setFilter}
                  />
                  <svg
                    className="peer-checked:hidden"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <rect
                      x="0.5"
                      y="0.5"
                      width="23"
                      height="23"
                      rx="3.5"
                      fill="#F7F7F7"
                      stroke="#444444"
                    ></rect>
                  </svg>
                  <svg
                    className="peer-checked:block hidden"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <rect width="24" height="24" rx="4" fill="#BECD00"></rect>
                    <path
                      d="M8.71947 11.9998C8.53181 11.8311 8.28729 11.7395 8.03494 11.7435C7.78259 11.7475 7.54109 11.8468 7.35888 12.0214C7.17666 12.196 7.06721 12.4331 7.05249 12.685C7.03776 12.937 7.11884 13.1852 7.27947 13.3798L9.49947 15.7098C9.59242 15.8073 9.7041 15.885 9.82783 15.9383C9.95155 15.9916 10.0848 16.0193 10.2195 16.0198C10.3535 16.0206 10.4862 15.9944 10.6099 15.9429C10.7336 15.8914 10.8457 15.8155 10.9395 15.7198L17.7195 8.71982C17.8114 8.62526 17.8838 8.51353 17.9325 8.391C17.9813 8.26847 18.0054 8.13753 18.0036 8.00567C18.0017 7.87382 17.9739 7.74361 17.9217 7.6225C17.8695 7.50139 17.794 7.39174 17.6995 7.29982C17.6049 7.20789 17.4932 7.13549 17.3707 7.08674C17.2481 7.038 17.1172 7.01387 16.9853 7.01572C16.8535 7.01758 16.7233 7.04539 16.6022 7.09757C16.481 7.14974 16.3714 7.22526 16.2795 7.31982L10.2295 13.5798L8.71947 11.9998Z"
                      fill="black"
                    ></path>
                  </svg>

                  <span>{value.label}</span>
                </label>
              </li>
            ))
          : filter.values.map((value) => (
              <li className="m-0" key={`${filter.key}.${value}`}>
                <label className="flex gap-[1rem]">
                  <input
                    id={value}
                    className="filter-input peer"
                    data-key={filter.key}
                    type="checkbox"
                    onChange={setFilter}
                  />
                  <svg
                    className="peer-checked:hidden"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <rect
                      x="0.5"
                      y="0.5"
                      width="23"
                      height="23"
                      rx="3.5"
                      fill="#F7F7F7"
                      stroke="#444444"
                    ></rect>
                  </svg>
                  <svg
                    className="peer-checked:block hidden"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <rect width="24" height="24" rx="4" fill="#BECD00"></rect>
                    <path
                      d="M8.71947 11.9998C8.53181 11.8311 8.28729 11.7395 8.03494 11.7435C7.78259 11.7475 7.54109 11.8468 7.35888 12.0214C7.17666 12.196 7.06721 12.4331 7.05249 12.685C7.03776 12.937 7.11884 13.1852 7.27947 13.3798L9.49947 15.7098C9.59242 15.8073 9.7041 15.885 9.82783 15.9383C9.95155 15.9916 10.0848 16.0193 10.2195 16.0198C10.3535 16.0206 10.4862 15.9944 10.6099 15.9429C10.7336 15.8914 10.8457 15.8155 10.9395 15.7198L17.7195 8.71982C17.8114 8.62526 17.8838 8.51353 17.9325 8.391C17.9813 8.26847 18.0054 8.13753 18.0036 8.00567C18.0017 7.87382 17.9739 7.74361 17.9217 7.6225C17.8695 7.50139 17.794 7.39174 17.6995 7.29982C17.6049 7.20789 17.4932 7.13549 17.3707 7.08674C17.2481 7.038 17.1172 7.01387 16.9853 7.01572C16.8535 7.01758 16.7233 7.04539 16.6022 7.09757C16.481 7.14974 16.3714 7.22526 16.2795 7.31982L10.2295 13.5798L8.71947 11.9998Z"
                      fill="black"
                    ></path>
                  </svg>
                  {value.replace(/[\[\]"]/g, '')}
                </label>
              </li>
            ))}
      </ul>
    </div>
  );
}
