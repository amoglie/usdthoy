import React, { ReactNode, useMemo } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export function Card({ children, className = "" }: CardProps) {
  const baseClass = useMemo(
    () => "overflow-hidden rounded-lg bg-[#2A2A2A] border-[1px] border-gray-700 transition-all duration-300 hover:scale-[1.02]",
    []
  );

  return <div className={`${baseClass} ${className}`}>{children}</div>;
}

export function CardHeader({ children, className = "" }: CardProps) {
  const baseClass = useMemo(
    () => "flex flex-row items-center justify-between space-y-0 pb-2 p-4",
    []
  );

  return <div className={`${baseClass} ${className}`}>{children}</div>;
}

export function CardContent({ children, className = "" }: CardProps) {
  const baseClass = useMemo(() => "p-4", []);
  return <div className={`${baseClass} ${className}`}>{children}</div>;
}

export function CardTitle({ children, className = "" }: CardProps) {
  const baseClass = useMemo(
    () => "text-sm font-medium flex items-center gap-2 text-gray-100",
    []
  );

  return <h2 className={`${baseClass} ${className}`}>{children}</h2>;
}
