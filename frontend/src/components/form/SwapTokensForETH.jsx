import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useEffect, useState } from "react";
import { useAppSelector } from "store/store";
import { UniswapRouterV2Service } from "web3Functions";
import { myTokenAddress } from "utility/contract/myTokenAbi";

const schema = yup.object().shape({
  amountIn: yup
    .number()
    .typeError("Amount must be a number")
    .positive("Amount must be positive")
    .required("Amount is required"),
});

const SwapTokensForETH = () => {
  const [amountOut, setAmountOut] = useState(0);
  const [path, setPath] = useState([
    myTokenAddress,
    "0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6",
  ]);

  const [buttonLabel, setButtonLabel] = useState("MT ⇌ ETH");

  const { web3, account, chainId } = useAppSelector(
    (state) => state.web3Connect
  );

  const {
    watch,
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "all",
    resolver: yupResolver(schema),
  });

  const toggleAddresses = () => {
    const newPath = [...path];
    newPath.reverse();
    setPath(newPath);
    setButtonLabel(newPath[0] === myTokenAddress ? "MT ⇌ ETH" : "ETH ⇌ MT");
    console.log(path);
  };

  const getFutureTime = () => {
    var currentTimeInSeconds = Math.floor(Date.now() / 1000);
    var futureTimeInSeconds = currentTimeInSeconds + 8 * 60;
    console.log("Future time in seconds: " + futureTimeInSeconds);
    return futureTimeInSeconds;
  };

  const onSubmit = async (data) => {
    console.log("form data", data);
    try {
      let tokenReceived;
      if (buttonLabel === "MT ⇌ ETH") {
        tokenReceived = await UniswapRouterV2Service.swapExactTokensForETH(
          web3,
          account,
          amountIn,
          path,
          getFutureTime()
        );
      } else {
        tokenReceived = await UniswapRouterV2Service.swapExactETHForTokens(
          web3,
          account,
          amountIn,
          path,
          getFutureTime()
        );
      }

      console.log("token received", tokenReceived);
    } catch (error) {
      console.error("error on form submit", error);
    }
  };

  let amountIn = watch("amountIn");

  useEffect(() => {
    if (amountIn) {
      if (!errors.amountIn) {
        (async () => {
          const amountOut = await UniswapRouterV2Service.getAmountsOut(
            web3,
            amountIn,
            path
          );
          const amountInEth = web3.utils.fromWei(amountOut[1]);
          setAmountOut(parseFloat(amountInEth).toFixed(3));
        })();
      }
    }
  }, [amountIn, path]);

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label htmlFor="amountIn" className="form-label">
            Amount In
          </label>
          <input
            type="text"
            className="form-control"
            {...register("amountIn")}
          />
          {errors.amountIn && (
            <p className="error" style={{ color: "red", marginBottom: "0rem" }}>
              {errors.amountIn.message}
            </p>
          )}
        </div>
        <p>You will receive {amountOut} tokens</p>

        <button className="btn btn-primary" type="submit">
          Swap
        </button>
        <button
          type="button"
          className="btn btn-warning ms-1"
          onClick={toggleAddresses}
        >
          {buttonLabel}
        </button>
      </form>
      <DevTool control={control} />
    </div>
  );
};

export default SwapTokensForETH;
