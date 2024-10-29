"use client";
import Link from "next/link";
import AlertList from "~/alerts/components/AlertList";
import { Button } from "~/components/ui/button";

export default function HomePage() {
  return (
    <main className="flex flex-col gap-4 p-10">
      <Link className="w-fit" href="/create">
        <Button>Create new</Button>
      </Link>
      <AlertList />
    </main>
  );
}
