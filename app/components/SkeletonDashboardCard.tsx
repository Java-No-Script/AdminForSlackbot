import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface Stat {
  title: string;
  value: number | React.ReactNode;
  change: string;
  icon: React.ReactNode;
}

export default function SkeletonDashboardCard() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <Skeleton className="w-30 h-4" />
      </CardHeader>
      <CardContent>
        <Skeleton className="w-30 h-4" />
        <Skeleton className="w-30 h-4 mt-1" />
      </CardContent>
    </Card>
  );
}
