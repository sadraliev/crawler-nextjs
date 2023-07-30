"use client";
import { ErrorMessage } from "@/shared/components/ErrorMessage";

export default function ErrorWrapper({ error }: { error: Error }) {
  return <ErrorMessage message={error.message} />;
}
