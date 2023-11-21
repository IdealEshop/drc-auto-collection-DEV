export default function CarAccessory({product}){

    return(
        <div className="flex flex-wrap gap-[8px]">
            <p className= "px-[8px] py-[2px] bg-gray_2 rounded-full text-white text-[12px] font-semibold">4x4</p>
            <p className= "px-[8px] py-[2px] bg-gray_2 rounded-full text-white text-[12px] font-semibold">Klimatizace</p>
            <p className= "px-[8px] py-[2px] bg-gray_2 rounded-full text-white text-[12px] font-semibold">Odpočet DPH</p>
            <button className="text-indigo_1 text-[12px] font-medium underline hover:no-underline"> + 5 dalších</button>
        </div>
    )

}