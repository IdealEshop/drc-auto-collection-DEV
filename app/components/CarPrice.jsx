export default function CarPrice({
  price,
  compareAtPrice,
  isDiscounted,
  isUsed,
  featuredInstallment,
}) {
  const formatedPrice = parseInt(price.amount, 10).toLocaleString();
  const formatedcompareAtPrice = parseInt(
    compareAtPrice?.amount,
    10,
  ).toLocaleString();
  const formatedfeaturedInstallment = parseInt(
    featuredInstallment,
    10,
  ).toLocaleString();

  return (
    <div className="flex min-[1400px]:flex-row flex-col gap-[16px]">
      {isUsed && (
        <div className="sm:px-[16px] px-[8px] py-[8px] rounded-[20px] flex items-center border border-gray_4 shadow-[0px_4px_16px_0px_rgba(51,51,51,0.08),0px_4px_4px_0px_rgba(51,51,51,0.04)] max-[360px]:order-2  gap-[6px] w-full justify-center min-[1400px]:flex-col">
          <p className="text-[12px] font-medium">Měsíčně klidně za</p>
          <p className="text-[14px] font-semibold">
            {formatedfeaturedInstallment} Kč
          </p>
        </div>
      )}
      <div className="flex flex-col bg-gray_6 py-[8px] sm:px-[16px] px-[9px] rounded-[20px] max-[360px]:order-1 self-stretch items-center ml-auto w-full justify-center ">
        {isDiscounted && (
          <p className="sale-price relative text-[14px] leading-[1.25em] text-[rgba(0,0,0,0.4)] font-medium w-fit">
            {formatedcompareAtPrice} Kč
          </p>
        )}
        <p className="text-[16px] leading-[1.25em] text-black font-semibold">
          {formatedPrice} Kč
        </p>
      </div>
    </div>
  );
}
