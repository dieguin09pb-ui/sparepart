"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";

interface SearchResult {
  id: number;
  slug: string;
  name: string;
  brand: string;
  thumbnail_url: string | null;
  category: { name: string; icon_emoji: string | null } | null;
}

interface Props {
  placeholder?: string;
  autoFocus?: boolean;
  className?: string;
}

export function SearchAutocomplete({
  placeholder = "Search devices — PS5 controller, iPhone 15, MacBook Pro...",
  autoFocus = false,
  className = "",
}: Props) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const router = useRouter();
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const search = useCallback(async (q: string) => {
    if (!q.trim()) { setResults([]); setOpen(false); return; }
    setLoading(true);
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`);
      const data: SearchResult[] = await res.json();
      setResults(data);
      setOpen(data.length > 0);
      setActiveIndex(-1);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => search(query), 250);
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
  }, [query, search]);

  const navigate = (slug: string) => {
    setOpen(false);
    setQuery("");
    router.push(`/device/${slug}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!open) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, -1));
    } else if (e.key === "Enter" && activeIndex >= 0) {
      navigate(results[activeIndex].slug);
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  };

  return (
    <div className={`relative w-full ${className}`}>
      <div className="relative">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal-light text-lg select-none">
          🔍
        </span>
        <input
          ref={inputRef}
          type="text"
          autoFocus={autoFocus}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => results.length > 0 && setOpen(true)}
          onBlur={() => setTimeout(() => setOpen(false), 150)}
          placeholder={placeholder}
          className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-pale-blue/60 bg-white shadow-sm text-charcoal placeholder:text-charcoal-light/60 focus:outline-none focus:border-pale-orange/80 focus:shadow-md transition-all text-base"
        />
        {loading && (
          <span className="absolute right-4 top-1/2 -translate-y-1/2 animate-spin text-charcoal-light">⏳</span>
        )}
      </div>

      {open && results.length > 0 && (
        <ul
          ref={listRef}
          className="absolute top-full mt-2 w-full bg-white border border-pale-blue/40 rounded-2xl shadow-lg z-50 max-h-72 overflow-y-auto"
        >
          {results.map((result, i) => (
            <li
              key={result.id}
              onMouseDown={() => navigate(result.slug)}
              className={`flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors ${
                i === activeIndex
                  ? "bg-pale-blue/30"
                  : "hover:bg-pale-blue/20"
              } ${i > 0 ? "border-t border-pale-blue/20" : ""}`}
            >
              <span className="text-xl shrink-0">
                {result.category?.icon_emoji ?? "🔧"}
              </span>
              <div className="min-w-0">
                <div className="font-medium text-charcoal text-sm truncate">
                  {result.name}
                </div>
                <div className="text-xs text-charcoal-light">
                  {result.brand} · {result.category?.name ?? "Device"}
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
