export default function CardParameters({product}){

    const productYearIndex = product.metafields.findIndex(metafield=> metafield?.key === "year_production");
    const productYear = product.metafields[productYearIndex].value.split("-");
    const formatedProductYear =  productYear[1] + "/" + productYear[0]

    const mileageIndex = product.metafields.findIndex(metafield => metafield?.key === "mileage");
    const mileage = product.metafields[mileageIndex].value;
    const formatedMileage = parseInt(mileage,10).toLocaleString();

    const fuelIndex = product.metafields.findIndex(metafield=> metafield?.key == "fuel");
    const fuel = fuelIndex > 0 ? product.metafields[fuelIndex].value : "";

    const transmissionIndex = product.metafields.findIndex(metafield=> metafield?.key == "transmission");
    const transmission = transmissionIndex > 0 ? product.metafields[transmissionIndex].value : "";

    const driveIndex = product.metafields.findIndex(metafield=> metafield?.key == "drive");
    const drive = driveIndex > 0 ?  product.metafields[driveIndex].value : "";

    const powerIndex = product.metafields.findIndex(metafield=> metafield?.key == "power");
    //const power = product.metafields[powerIndex].value;


    return (
        <div className="flex flex-col gap-[0.8rem]">
            <div className="flex gap-[0.8rem] items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                    <path d="M13.9344 7.25792L12.85 4.74239C12.5344 4.01258 11.8125 3.54053 11.0125 3.54053H4.9875C4.1875 3.54053 3.46563 4.01258 3.15 4.7455L2.06562 7.26102C1.43437 7.59332 1 8.2486 1 9.00637V10.0002C1 10.7331 1.40625 11.3666 2 11.7113V12.5467C2 13.0933 2.45 13.5405 3 13.5405H4.5C5.05 13.5405 5.5 13.0933 5.5 12.5467V11.9877H10.5V12.5467C10.5 13.0933 10.95 13.5405 11.5 13.5405H13C13.55 13.5405 14 13.0933 14 12.5467V11.7113C14.5938 11.3666 15 10.7331 15 10.0002V9.00637C15 8.2486 14.5656 7.59332 13.9344 7.25792ZM3.75 10.7455C3.05938 10.7455 2.5 10.1896 2.5 9.50326C2.5 8.81693 3.05938 8.26102 3.75 8.26102C4.44062 8.26102 5 8.81693 5 9.50326C5 10.1896 4.44062 10.7455 3.75 10.7455ZM9.5 10.0002H6.5C6.225 10.0002 6 9.77655 6 9.50326C6 9.22997 6.225 9.00637 6.5 9.00637H9.5C9.775 9.00637 10 9.22997 10 9.50326C10 9.77655 9.775 10.0002 9.5 10.0002ZM3.77187 7.01879L4.53125 5.33245C4.60938 5.14922 4.79062 5.03121 4.99062 5.03121H11.0125C11.2125 5.03121 11.3938 5.14922 11.475 5.33866L12.2312 7.01879H3.77187ZM12.25 10.7455C11.5594 10.7455 11 10.1896 11 9.50326C11 8.81693 11.5594 8.26102 12.25 8.26102C12.9406 8.26102 13.5 8.81693 13.5 9.50326C13.5 10.1896 12.9406 10.7455 12.25 10.7455Z" fill="#E1E4EB"></path>
                </svg>
                <p className="text-[12px] text-[#444444] opacity-[0.7]">
                    {formatedProductYear}, {formatedMileage} km
                </p>

            </div>
            <div className="flex gap-[0.8rem] items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M13.6009 9.59402C13.8394 9.72069 14.0233 9.92069 14.1528 10.1207C14.4049 10.534 14.3844 11.0407 14.1391 11.4874L13.6622 12.2874C13.4101 12.714 12.94 12.9807 12.4563 12.9807C12.2179 12.9807 11.9522 12.914 11.7341 12.7807C11.557 12.6674 11.3526 12.6274 11.1346 12.6274C10.4601 12.6274 9.89461 13.1807 9.87417 13.8407C9.87417 14.6074 9.24737 15.2074 8.46387 15.2074H7.5373C6.74698 15.2074 6.12018 14.6074 6.12018 13.8407C6.10656 13.1807 5.54108 12.6274 4.86658 12.6274C4.64175 12.6274 4.43736 12.6674 4.26704 12.7807C4.04902 12.914 3.7765 12.9807 3.54485 12.9807C3.05431 12.9807 2.58421 12.714 2.33213 12.2874L1.86203 11.4874C1.60995 11.054 1.59632 10.534 1.8484 10.1207C1.95741 9.92069 2.1618 9.72069 2.39345 9.59402C2.58421 9.50069 2.70685 9.34736 2.82267 9.16736C3.16332 8.59402 2.95893 7.84069 2.37982 7.50069C1.70533 7.12069 1.48731 6.27402 1.87565 5.61402L2.33213 4.82736C2.72729 4.16736 3.5721 3.93402 4.25341 4.32069C4.84614 4.64069 5.61602 4.42736 5.96348 3.86069C6.07249 3.67402 6.13381 3.47402 6.12018 3.27402C6.10656 3.01402 6.1815 2.76736 6.31095 2.56736C6.56303 2.15402 7.01951 1.88736 7.51686 1.87402H8.4775C8.98166 1.87402 9.43814 2.15402 9.69022 2.56736C9.81286 2.76736 9.89461 3.01402 9.87417 3.27402C9.86055 3.47402 9.92187 3.67402 10.0309 3.86069C10.3783 4.42736 11.1482 4.64069 11.7478 4.32069C12.4223 3.93402 13.2739 4.16736 13.6622 4.82736L14.1187 5.61402C14.5139 6.27402 14.2958 7.12069 13.6145 7.50069C13.0354 7.84069 12.831 8.59402 13.1785 9.16736C13.2875 9.34736 13.4101 9.50069 13.6009 9.59402ZM6.07261 8.54734C6.07261 9.59401 6.93786 10.4273 8.00751 10.4273C9.07716 10.4273 9.92198 9.59401 9.92198 8.54734C9.92198 7.50067 9.07716 6.66067 8.00751 6.66067C6.93786 6.66067 6.07261 7.50067 6.07261 8.54734Z" fill="#E1E4EB"></path>
            </svg>
            <p className="text-[12px] text-[#444444] opacity-[0.7]">
                {fuel}, {transmission}, {drive},
            </p>

            </div>
        </div>
    )

}