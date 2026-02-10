"use client";
import { GlobalError } from "@/components/GlobalError";
import { usePathname } from "next/navigation";

interface CustomErrorProps {
    error: Error & { digest?: string };
    reset: () => void;
}

export default function CustomError({ error, reset }: CustomErrorProps) {
    const pathname = usePathname();
    const homeBtn = pathname !== "/";

    return <GlobalError error={error} reset={reset} homeBtn={homeBtn} />;
}
