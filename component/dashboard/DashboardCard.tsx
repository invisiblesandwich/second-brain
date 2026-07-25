"use client";

import { motion } from "framer-motion";
import { LucideIcon, ArrowRight } from "lucide-react";
import Link from "next/link";

interface DashboardCardProps {
  title: string;
  description?: string;
  icon: LucideIcon;
  href?: string;
  children: React.ReactNode;
}

export default function DashboardCard({
  title,
  description,
  icon: Icon,
  href,
  children,
}: DashboardCardProps) {
  return (
    <motion.section
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="rounded-2xl border border-zinc-800 bg-zinc-900/60 backdrop-blur-md"
    >
      <div className="flex items-center justify-between border-b border-zinc-800 p-5">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-violet-600/20 p-2">
            <Icon className="h-5 w-5 text-violet-400" />
          </div>

          <div>
            <h2 className="font-semibold text-white">{title}</h2>

            {description && (
              <p className="text-xs text-zinc-400">
                {description}
              </p>
            )}
          </div>
        </div>

        {href && (
          <Link
            href={href}
            className="rounded-lg p-2 transition hover:bg-zinc-800"
          >
            <ArrowRight className="h-4 w-4 text-zinc-400" />
          </Link>
        )}
      </div>

      <div className="p-5">
        {children}
      </div>
    </motion.section>
  );
}