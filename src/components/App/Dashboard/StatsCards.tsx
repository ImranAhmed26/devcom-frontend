'use client'
import { dashboardStats } from "@/constants/MockData";

export function StatsCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {dashboardStats.map((stat) => (
        <div key={stat.title} className=" rounded-medium border border-gray-200 dark:bg-hexaGray dark:border-none p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium ">{stat.title}</h3>
            <stat.icon className={`h-4 w-4 ${stat.color}`} />
          </div>
          <div className="text-2xl font-bold mb-1">{stat.value}</div>
          <p className="text-xs ">
            <span className="text-green-600">{stat.change}</span> from last month
          </p>
        </div>
      ))}
    </div>
  )
}
