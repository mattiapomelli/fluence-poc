import Link from "next/link";
import React from "react";

import { Button } from "@components/basic/button";
import { Input } from "@components/basic/input";

import type { NextPage } from "next";

const LoginPage: NextPage = () => {
  return (
    <div className="mx-auto mt-12 max-w-xs">
      <h1 className="mb-4 text-center text-xl font-bold">Login</h1>
      <form className="flex w-full flex-col gap-2">
        <Input label="Username" type="text" />
        <Input label="Password" type="password" />
        <p className="text-sm">
          Already have an account?{" "}
          <Link href="/signup">
            <a className="text-primary hover:underline">Signup</a>
          </Link>
        </p>
        <Button className="mt-4">Login</Button>
      </form>
    </div>
  );
};

export default LoginPage;
