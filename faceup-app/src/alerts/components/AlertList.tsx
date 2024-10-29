"use client";
import React from "react";
import { useAlerts } from "../hooks/useAlerts";
import AlertCard from "./AlertCard";
import Link from "next/link";
import { Skeleton } from "~/components/ui/skeleton";
import { ErrorCard } from "~/components/ErrorCard";

const AlertList = () => {
  const { data, isPending, isError, isFetching } = useAlerts();

  if (isPending || isFetching) {
    return (
      <div className="flex flex-wrap gap-2 align-middle">
        {Array.from({ length: 10 }).map((_, index) => (
          <Skeleton className="h-40 w-60 rounded-xl" key={index} />
        ))}
      </div>
    );
  }

  if (isError) return <ErrorCard />;

  return (
    <div className="flex flex-wrap gap-2 align-middle">
      {data?.map((alert) => (
        <Link className="rounded-md" href={`/edit/${alert.id}`} key={alert.id}>
          <AlertCard key={alert.id} alert={alert} />
        </Link>
      ))}
    </div>
  );
};

export default AlertList;
