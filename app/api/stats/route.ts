import { NextResponse } from "next/server";

export async function GET() {
  const stats = {
    totalUsers: 2840,
    activeUsers: 2354,
    revenue: 48295,
    growth: 12.5,
    chartData: [
      { month: "Jan", users: 400, revenue: 2400 },
      { month: "Feb", users: 300, revenue: 1398 },
      { month: "Mar", users: 600, revenue: 9800 },
      { month: "Apr", users: 800, revenue: 3908 },
      { month: "May", users: 500, revenue: 4800 },
      { month: "Jun", users: 900, revenue: 3800 },
      { month: "Jul", users: 1200, revenue: 4300 },
    ],
  };

  return NextResponse.json({ data: stats });
}
