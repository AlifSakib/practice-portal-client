import React from "react";
import { useForm } from "react-hook-form";

const AddDoctor = () => {
  const handleAddDoctor = (data) => {
    console.log(data);
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  return (
    <div>
      <div className="h-[800px] flex justify-center items-center">
        <div className="w-96 p-7">
          <h2 className="text-xl text-center">Add A Doctor</h2>
          <form onSubmit={handleSubmit(handleAddDoctor)}>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                {" "}
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                {...register("name", {
                  required: "Name is Required",
                })}
                className="input input-bordered w-full max-w-xs"
              />
              {errors.name && (
                <p className="text-red-500">{errors.name.message}</p>
              )}
            </div>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                {" "}
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                {...register("email", {
                  required: true,
                })}
                className="input input-bordered w-full max-w-xs"
              />
            </div>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                {" "}
                <span className="label-text">Secialty</span>
              </label>
              <select className="select select-bordered w-full max-w-xs">
                <option disabled selected>
                  Select a spcialty
                </option>
                <option>Han Solo</option>
                <option>Greedo</option>
              </select>
            </div>

            <input
              className="btn btn-accent w-full mt-4"
              defaultValue="Add Doctor"
              type="submit"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddDoctor;
