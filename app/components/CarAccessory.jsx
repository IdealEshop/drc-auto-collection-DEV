import {useState} from 'react';

export default function CarAccessory({product, isUsed}) {
  const [showAccessoryCount, setShowAccessoryCount] = useState(4);
  let accessories = [];

  function handleShowAllAccessory() {
    setShowAccessoryCount(accessories.length);
  }

  product.metafields.forEach((metafield) => {
    if (metafield?.key.includes('hl_vybava') && metafield?.value === 'true')
      accessories.push(metafield.key.slice(metafield.key.lastIndexOf('_') + 1));
  });

  for (let index = 0; index < accessories.length; index++) {
    switch (accessories[index]) {
      case 'odpocetdph':
        accessories[index] = 'Odpočet DPH';
        break;
      case 'klimatizace':
        accessories[index] = 'Klimatizace';
        break;
      case 'xenonyled':
        accessories[index] = 'Xenony/LED';
        break;
      case 'parkovani':
        accessories[index] = 'Parkovací asistent';
        break;
      case 'tazne':
        accessories[index] = 'Tažné zařízení';
        break;
      case 'kuze':
        accessories[index] = 'Kožený interiér';
        break;
      case 'nezavisletopeni':
        accessories[index] = 'Nezávislé topení';
        break;
      case 'panorama':
        accessories[index] = 'Panoramatická střecha';
        break;

      default:
        break;
    }
  }

  if (accessories && isUsed) {
    return (
      <div className="flex flex-wrap gap-[8px]">
        {accessories.slice(0, showAccessoryCount).map((accessory) => (
          <p
            key={accessory}
            className="px-[8px] py-[2px] bg-gray_2 rounded-full text-white text-[12px] font-semibold"
          >
            {accessory}
          </p>
        ))}

        {showAccessoryCount < accessories.length && (
          <button
            type="button"
            className="text-indigo_1 text-[12px] font-medium underline hover:no-underline cursor-pointer"
            onClick={handleShowAllAccessory}
          >
            +{accessories.length - showAccessoryCount} další
          </button>
        )}
      </div>
    );
  } else {
    return (
      <div className="flex flex-wrap gap-[8px]">
        <p className="px-[8px] py-[2px] bg-gray_2 rounded-full text-white text-[12px] font-semibold">
          4x4
        </p>
        <p className="px-[8px] py-[2px] bg-gray_2 rounded-full text-white text-[12px] font-semibold">
          Klimatizace
        </p>
        <p className="px-[8px] py-[2px] bg-gray_2 rounded-full text-white text-[12px] font-semibold">
          Odpočet DPH
        </p>
        <button className="text-indigo_1 text-[12px] font-medium underline hover:no-underline">
          {' '}
          + 5 dalších
        </button>
      </div>
    );
  }
}
