"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Icon from "@/components/Icon";
import { PageHeader } from "@/components/PageShell";
import { CROP_CALENDAR, MONTHS, SEASON_META, type SeasonStatus } from "@/lib/data";

export default function HarvestCalendarPage() {
  const now = new Date();
  const currentMonth = now.getMonth();
  const [filter, setFilter] = useState<"all" | SeasonStatus>("all");

  const rows = useMemo(() => {
    if (filter === "all") return CROP_CALENDAR;
    return CROP_CALENDAR.filter((c) => c.months[currentMonth] === filter);
  }, [filter, currentMonth]);

  return (
    <>
      <Navbar variant="solid" />
      <main className="min-h-screen">
        <PageHeader
          eyebrow="Planning"
          title="Ghana harvest calendar"
          subtitle="See when each crop is in season — so farmers can plan listings and buyers can plan orders ahead."
        />

        <div className="mx-auto max-w-content px-5 py-10 sm:px-6">
          <div className="mb-6 flex items-center gap-2 rounded-xl border border-line bg-white px-4 py-3 text-sm text-muted">
            <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-green-mid" />
            Showing seasons for{" "}
            <strong className="text-ink">
              {MONTHS[currentMonth]} {now.getFullYear()}
            </strong>
          </div>

          <div className="mb-8 flex flex-wrap gap-4 rounded-xl border border-line bg-white px-5 py-4 text-[0.82rem] font-medium">
            {(Object.keys(SEASON_META) as SeasonStatus[]).map((k) => (
              <div key={k} className="flex items-center gap-2">
                <span className={`h-4 w-4 rounded ${SEASON_META[k].className}`} />
                {SEASON_META[k].label}
              </div>
            ))}
          </div>

          <div className="mb-6 flex flex-wrap items-center gap-3">
            <label className="text-sm font-semibold text-ink" htmlFor="seasonFilter">
              Filter
            </label>
            <select
              id="seasonFilter"
              className="field max-w-xs"
              value={filter}
              onChange={(e) => setFilter(e.target.value as "all" | SeasonStatus)}
            >
              <option value="all">All crops</option>
              <option value="peak">Currently peak harvest</option>
              <option value="harvest">Currently in harvest</option>
              <option value="plant">Currently planting</option>
              <option value="off">Currently off season</option>
            </select>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-line bg-white">
            <table className="w-full min-w-[720px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-line bg-cream/80">
                  <th className="sticky left-0 bg-cream/95 px-4 py-3 font-display text-[0.9rem] font-bold">
                    Crop
                  </th>
                  {MONTHS.map((m, i) => (
                    <th
                      key={m}
                      className={[
                        "px-1.5 py-3 text-center text-[0.72rem] font-bold uppercase tracking-wide",
                        i === currentMonth ? "text-green" : "text-muted",
                      ].join(" ")}
                    >
                      {m}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((crop) => (
                  <tr key={crop.name} className="border-b border-line last:border-b-0">
                    <td className="sticky left-0 bg-white px-4 py-3 font-semibold text-ink">
                      <span className="mr-2 inline-flex text-green" aria-hidden>
                        <Icon name={crop.icon} size="md" />
                      </span>
                      {crop.name}
                    </td>
                    {crop.months.map((status, i) => (
                      <td key={`${crop.name}-${i}`} className="px-1 py-2 text-center">
                        <span
                          title={SEASON_META[status].label}
                          className={[
                            "mx-auto block h-7 w-7 rounded-md",
                            SEASON_META[status].className,
                            i === currentMonth ? "ring-2 ring-gold ring-offset-1" : "",
                          ].join(" ")}
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-10 rounded-2xl bg-green px-6 py-10 text-center text-white">
            <h2 className="mb-2 text-[1.5rem] font-extrabold text-white">Ready to buy or list?</h2>
            <p className="mx-auto mb-6 max-w-md text-[0.95rem] text-white/70">
              Use the calendar to time your orders and harvest listings with the seasons.
            </p>
            <div className="flex flex-col justify-center gap-3 sm:flex-row">
              <Link href="/shop" className="btn btn-gold">
                Shop produce
              </Link>
              <Link href="/register/farmer" className="btn btn-ghost-light">
                Become a supplier
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
