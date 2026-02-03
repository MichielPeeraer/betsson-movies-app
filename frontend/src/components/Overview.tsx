"use client";
import { Suspense } from "react";
import { Genre } from "@/types";
import { SearchResult } from "@/components/SearchResult";
import { MoviesGridSkeleton } from "@/components/MoviesSkeleton";

interface OverviewProps {
    genreList: Genre[];
    searchQuery?: string;
    children: React.ReactNode;
}

export function Overview({ genreList, searchQuery, children }: OverviewProps) {
    return (
        <>
            <SearchResult searchQuery={searchQuery} genreList={genreList} />
            <Suspense
                key={`${searchQuery}-${genreList.join(",")}`}
                fallback={<MoviesGridSkeleton />}
            >
                {children}
            </Suspense>
        </>
    );
}
