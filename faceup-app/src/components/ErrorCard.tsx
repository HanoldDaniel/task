import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";

export const ErrorCard = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="flex w-1/4 flex-col gap-4">
        <h1 className="text-center font-bold">Something went wrong</h1>
        <Link href="/" passHref>
          <Button className="w-full" variant="outline">
            Go back to Home
          </Button>
        </Link>
      </div>
    </div>
  );
};
