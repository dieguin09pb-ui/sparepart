import { LoadingMachine } from "@/components/shared/LoadingMachine";

export default function Loading() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <LoadingMachine label="Loading device…" />
    </div>
  );
}
