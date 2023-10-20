import { useForm, Controller } from "react-hook-form";
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

const SwapTokensForm = () => {
  const [path, setPath] = useState([
    "0x9A54921B73f35A509C20FBdd48f4D08d15b3f376",
    "0x8C406D0296e50136D9Dd0e9d992c94189ba01b0E",
  ]);

  const [buttonLabel, setButtonLabel] = useState("Swap Token From MT to GD");

  const toggleAddresses = () => {
    const newPath = [...path];
    newPath.reverse();
    setPath(newPath);
    setButtonLabel(
      newPath[0].toLowerCase() === myTokenAddress.toLowerCase()
        ? "Swap Token From GD to MT"
        : "Swap Token From MT to GD"
    );

    console.log("path", path);
  };

  const { web3, account, chainId } = useAppSelector(
    (state) => state.web3Connect
  );

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const getFutureTime = () => {
    var currentTimeInSeconds = Math.floor(Date.now() / 1000);
    var futureTimeInSeconds = currentTimeInSeconds + 8 * 60;
    console.log("Future time in seconds: " + futureTimeInSeconds);
    return futureTimeInSeconds;
  };

  const onSubmit = async (data) => {
    console.log("form data", data);
    try {
      const tokenReceived =
        await UniswapRouterV2Service.swapExactTokensForTokens(
          web3,
          account,
          data.amountIn,
          path,
          getFutureTime()
        );

      console.log("token received", tokenReceived);
    } catch (error) {
      console.error("error on form submit", error);
    }
  };

  return (
    <div>
      <button
        type="submit"
        className="btn btn-warning"
        onClick={toggleAddresses}
      >
        {buttonLabel}
      </button>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label htmlFor="amountIn" className="form-label">
            Amount In
          </label>
          <Controller
            name="amountIn"
            control={control}
            render={({ field }) => (
              <input
                id="amountIn"
                type="text"
                className="form-control"
                {...field}
              />
            )}
          />
          {errors.amountIn && (
            <p className="error" style={{ color: "red", marginBottom: "0rem" }}>
              {errors.amountIn.message}
            </p>
          )}
        </div>

        <button className="btn btn-primary" type="submit">
          Swap
        </button>
      </form>
      <DevTool control={control} />
    </div>
  );
};

export default SwapTokensForm;
