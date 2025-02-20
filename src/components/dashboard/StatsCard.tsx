import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  className?: string;
}

export function StatsCard({ title, value, icon, className }: StatsCardProps) {
  return (
    <div className={cn(
      "bg-white rounded-lg p-6 flex items-center justify-between",
      "border border-border shadow-sm",
      className
    )}>
      <div>
        <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
        <p className="text-2xl font-semibold mt-1">{value}</p>
      </div>
      <div className="h-12 w-12 flex items-center justify-center rounded-full bg-primary/10">
        {icon}
      </div>
    </div>
  );
}