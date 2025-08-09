import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Stat {
  title: string;
  value: number | React.ReactNode;
  change: string;
  icon: React.ReactNode;
}

export default function DashboardCard({ title, value, change, icon }: Stat) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-gray-600">
          {title}
        </CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-green-600 mt-1">
          {change + " 지난 달 대비"}
        </p>
      </CardContent>
    </Card>
  );
}
