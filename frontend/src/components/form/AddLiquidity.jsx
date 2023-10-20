import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  tokenA: yup.string().required("token a is required"),
  tokenB: yup.string().required("token b is required"),
  amountADesired: yup.number().required().positive(),
  amountBDesired: yup.number().required().positive(),
  amountAMin: yup.number().required().positive(),
  amountBMin: yup.number().required().positive(),
  deadline: yup.date().required(),
});
const AddLiquidityForm = () => {
  console.log("yup: ", yup);
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log("form data", data);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div class="mb-3">
          <label for="tokenA" className="form-label">
            Token A Address
          </label>
          <input
            id="tokenA"
            type="text"
            className="form-control"
            {...register("tokenA")}
          />
          {errors.tokenA && (
            <div className="invalid-feedback">{errors.tokenA?.message}</div>
          )}
        </div>
        <div className="mb-3">
          <label for="amountADesired" className="form-label">
            Amount A Desired
          </label>
          <input
            type="text"
            id="amountADesired"
            className="form-control"
            {...register("amountADesired")}
          />
          {errors.amountADesired && (
            <div className="invalid-feedback">
              {errors.amountADesired?.message}
            </div>
          )}
        </div>
        <div className="mb-3">
          <label for="tokenB" className="form-label">
            Token B Address
          </label>
          <input
            id="tokenB"
            type="text"
            className="form-control"
            {...register("tokenB")}
          />
          {errors.tokenB && (
            <div className="invalid-feedback">{errors.tokenB?.message}</div>
          )}
        </div>

        <div className="mb-3">
          <label for="amountBDesired" className="form-label">
            Amount B Desired
          </label>
          <input
            type="text"
            id="amountBDesired"
            className="form-control"
            {...register("amountBDesired")}
          />
          {errors.amountBDesired && (
            <div className="invalid-feedback">
              {errors.amountBDesired?.message}
            </div>
          )}
        </div>
        {/* <div className="mb-3">
          <label for="amountAMin" className="form-label">
            Amount A Min
          </label>
          <input
            type="text"
            id="amountAMin"
            className="form-control"
            {...register("amountAMin")}
          />
          {errors.amountAMin && (
            <div className="invalid-feedback">{errors.amountAMin?.message}</div>
          )}
        </div>
        <div className="mb-3">
          <label for="amountBMin" className="form-label">
            Amount B Min
          </label>
          <input
            type="text"
            id="amountBMin"
            className="form-control"
            {...register("amountBMin")}
          />
          {errors.amountBMin && (
            <div className="invalid-feedback">{errors.amountBMin?.message}</div>
          )}
        </div>
        <div className="mb-3">
          <label for="deadline" className="form-label">
            Deadline
          </label>
          <input
            type="text"
            id="deadline"
            className="form-control"
            {...register("deadline")}
          />
          {errors.deadline && (
            <div className="invalid-feedback">{errors.deadline?.message}</div>
          )}
        </div> */}

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
      <DevTool control={control} />
    </>
  );
};

export default AddLiquidityForm;
