import { useEffect, useState } from "react";
import { CMCService } from "services/currencyServices";

export const PriceConvertorHook = (data) => {
  const [price, setPrice] = useState(0);

  const checkPriceConvertion = async () => {
    try {
      const price = await CMCService.priceConvertion(data);
      if (price.data) setPrice(price.data.quote.USD.price);
    } catch (error) {
      console.log(error);
      return "error occured";
    }
  };
  useEffect(() => {
    checkPriceConvertion();
  }, []);

  return {
    convertedPrice: price,
  };
};
