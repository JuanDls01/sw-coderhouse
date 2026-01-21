"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/tailwind";

interface PaginationProps {
  totalItems: number;
  itemsPerPage?: number;
  className?: string;
}

export function Pagination({
  totalItems,
  itemsPerPage = 10,
  className,
}: PaginationProps) {
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  if (totalPages <= 1) {
    return null;
  }

  const createPageUrl = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(page));
    return `?${params.toString()}`;
  };

  return (
    <nav
      className={cn("flex items-center justify-center gap-2", className)}
      aria-label="Paginación"
    >
      <Button
        variant="outline"
        size="icon"
        asChild={currentPage > 1}
        disabled={currentPage <= 1}
      >
        {currentPage > 1 ? (
          <Link
            href={createPageUrl(currentPage - 1)}
            aria-label="Página anterior"
          >
            <ChevronLeft className="h-4 w-4" />
          </Link>
        ) : (
          <span>
            <ChevronLeft className="h-4 w-4" />
          </span>
        )}
      </Button>

      <span className="text-sm text-muted-foreground px-2">
        Página {currentPage} de {totalPages}
      </span>

      <Button
        variant="outline"
        size="icon"
        asChild={currentPage < totalPages}
        disabled={currentPage >= totalPages}
      >
        {currentPage < totalPages ? (
          <Link
            href={createPageUrl(currentPage + 1)}
            aria-label="Página siguiente"
          >
            <ChevronRight className="h-4 w-4" />
          </Link>
        ) : (
          <span>
            <ChevronRight className="h-4 w-4" />
          </span>
        )}
      </Button>
    </nav>
  );
}
