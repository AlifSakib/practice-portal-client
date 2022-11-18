import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Navigate } from "react-router-dom";

const AddDoctor = () => {
  const { data: specialties, isLoading } = useQuery({
    queryKey: ["specialty"],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/appointmentSpecialty");
      const data = await res.json();
      return data;
    },
  });

  console.log(specialties);

  const handleAddDoctor = (data) => {
    console.log(data);
    const doctor = {
      name: data.name,
      email: data.email,
      specialty: data.specialty,
    };
    fetch("http://localhost:5000/adddoctor", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(doctor),
    })
      .then((res) => res.json())
      .then((data) => {
        toast.success("doctor added");
        Navigate("/dashboard/managedoctors");
      });

    if (isLoading) {
      return "Loading";
    }
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
              <select
                {...register("specialty")}
                className="select select-bordered w-full max-w-xs"
              >
                <option disabled selected>
                  Select a spcialty
                </option>
                {specialties.map((specialty) => (
                  <option value={specialty.name} key={specialty._id}>
                    {specialty.name}
                  </option>
                ))}
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
