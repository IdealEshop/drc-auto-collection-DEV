export default function CarPrice({price, compareAtPrice, isDiscounted}){
    const formatedPrice = parseInt(price.amount,10).toLocaleString();

    return (
        <div className="flex mt-auto">
            <div className="flex bg-gray_6 py-[8px] sm:px-[16px] px-[9px] rounded-[20px] max-[360px]:order-1 self-stretch items-center ml-auto w-full justify-center ">
            <p className="text-[16px] leading-[1.25em] text-black font-semibold">{formatedPrice} Kč</p>

            </div>
        </div>
    )
}