"use client";
import { useParams } from "next/navigation";
import { AlertEdit } from "~/alerts/components/AlertEdit";
import { useAlert } from "~/alerts/hooks/useAlerts";
import { ErrorCard } from "~/components/ErrorCard";

export default function HomePage() {
  const params = useParams<{ alertId: string }>();

  const { data, isPending, isError } = useAlert(params.alertId);

  if (isError) {
    return <ErrorCard />;
  }

  if (isPending) {
    return <p>Loading...</p>;
  }

  return (
    <main className="flex flex-col gap-4 p-10">
      <AlertEdit data={data} />
    </main>
  );
}
