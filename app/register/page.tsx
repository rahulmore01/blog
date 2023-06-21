"use client";

import { FormEvent, useState } from "react";
import Input from "../../component/input/input";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import router from "next/router";

// defining states structure

interface initialStateProps {
  name: string;
  email: string;
  password: string;
}

// better way of writing multiple states
const initialState: initialStateProps = {
  name: "",
  email: "",
  password: "",
};

export default function page() {
  // initilising router
  const router = useRouter();
  const [state, setState] = useState(initialState);

  // we are using these in place of ()=>e.target.value. + changed state = setState will take newly updated state which is hadled by bellow function

  // event = e in else.target.value
  function handleChange(event: any) {
    setState({ ...state, [event.target.name]: event.target.value });
    console.log(event.target.value);
  }

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();

    axios
      .post("/api/register", state)
      .then(() => {
        router.refresh();
      })
      // after 2500 ms redirect user to /login page
      .then(() => {
        setTimeout(() => {
          router.push("/login");
        }, 2500);
      })
      .catch((err: any) => {});
    // .finally(() => {});
  };

  return (
    <form onSubmit={onSubmit} className="text-center">
      <div className="flex flex-col justify-center h-[450px] w-[350px] mx-auto gap-2">
        <Input
          placeholder="Name"
          id="name"
          type="text"
          name="name"
          onChange={handleChange}
          value={state.name}
        />
        <Input
          placeholder="Email"
          id="email"
          type="email"
          name="email"
          onChange={handleChange}
          value={state.email}
        />
        <Input
          placeholder="Password"
          id="password"
          type="password"
          name="password"
          onChange={handleChange}
          value={state.password}
        />
        <button className="p-4 bg-sky-400" type="submit">
          Submit
        </button>
      </div>

      <div>
        <div>
          Do you have an account ? <Link href="/login">Sign in</Link>
        </div>
      </div>
    </form>
  );
}
