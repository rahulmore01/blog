"use client";

import React, { ChangeEvent, FormEvent, useMemo, useState } from "react";
// import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";

import { toast } from "react-hot-toast";
import Input from "../../component/input/input";
// import UploadWidget from "@/components/ImageUpload";
import ImageUpload from "../../component/ImageUpload";

interface InitalStateProps {
  name?: string;
  imageSrc: string;
  description: string;
}

const initialState: InitalStateProps = {
  name: "",
  imageSrc: "",
  description: "",
};

export default function page() {
  const [state, setState] = useState(initialState);
  const router = useRouter();

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();

    axios
      .post("/api/blogs", state)
      .then(() => {
        router.push("/");
      })

      .catch(() => {
        toast.error("Went wring");
      });
    router.refresh();
  };
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setState({ ...state, [event.target.name]: event.target.value });
  }
  const setCustomValue = (id: any, value: any) => {
    setState((prevValues) => ({
      ...prevValues,
      [id]: value,
    }));
  };

  const imageSrc = state.imageSrc;

  //       const onSubmits = async () => {
  //     const formData = new FormData();
  //     formData.append('file', image);
  //     formData.append('upload_preset', preset);
  //     try {
  //       const res = await axios.post(url, formData);
  //       const imageUrl = res.data.secure_url;
  //       const image = await axios.post('http://localhost:3000/upload', {
  //         imageUrl
  //       });
  //       setImage(image.data);
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   };

  return (
    // almost same as input ,only cloudinary img component is added , to uplode files from system to cloudinary [post method of axios]
    <form onSubmit={onSubmit} className="w-[600px] h-[700px] mx-auto py-12">
      <div>
        <ImageUpload
          value={state.imageSrc}
          onChange={(value) => setCustomValue("imageSrc", value)}
        />
      </div>

      <div className="flex flex-col justify-center h-[450px] w-[350px] mx-auto gap-2">
        <Input
          placeholder="Blog header"
          id="name"
          type="text"
          value={state.name}
          name="name"
          onChange={handleChange}
        />
        <Input
          big
          placeholder="Blog content or description"
          id="description"
          type="text"
          value={state.description}
          name="description"
          onChange={handleChange}
        />
        <div></div>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
}
