import React, { useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { AlertCircle } from 'lucide-react'

type KRA = {
  area: string
  kpi: string
  target: number | string
  actual: number | string
  achievement: number
}

const initialKRAs: KRA[] = [
  // Business Development Services
  { area: "Business Development Services", kpi: "Number of new clients onboarded", target: 10, actual: "", achievement: 0 },
  { area: "Business Development Services", kpi: "Total revenue from business development services", target: 500000, actual: "", achievement: 0 },
  { area: "Business Development Services", kpi: "Client Net Promoter Score (NPS)", target: 50, actual: "", achievement: 0 },
  { area: "Business Development Services", kpi: "Average deal size", target: 50000, actual: "", achievement: 0 },
  { area: "Business Development Services", kpi: "Customer Acquisition Cost (CAC)", target: 5000, actual: "", achievement: 0 },
  // C2C IT Augmentation
  { area: "C2C IT Augmentation", kpi: "Number of successful consultant placements", target: 25, actual: "", achievement: 0 },
  { area: "C2C IT Augmentation", kpi: "Time-to-productivity for placed consultants (days)", target: 10, actual: "", achievement: 0 },
  { area: "C2C IT Augmentation", kpi: "Consultant utilization rate", target: "85%", actual: "", achievement: 0 },
  { area: "C2C IT Augmentation", kpi: "Client satisfaction score with placed consultants", target: 4.5, actual: "", achievement: 0 },
  { area: "C2C IT Augmentation", kpi: "Percentage of consultants with in-demand skills", target: "90%", actual: "", achievement: 0 },
  // Cross-Selling and Upselling
  { area: "Cross-Selling and Upselling", kpi: "Cross-sell ratio", target: "30%", actual: "", achievement: 0 },
  { area: "Cross-Selling and Upselling", kpi: "Upsell revenue as a percentage of total revenue", target: "20%", actual: "", achievement: 0 },
  { area: "Cross-Selling and Upselling", kpi: "Customer Lifetime Value (CLV)", target: 200000, actual: "", achievement: 0 },
  // Digital Presence and Marketing
  { area: "Digital Presence and Marketing", kpi: "Website conversion rate", target: "3%", actual: "", achievement: 0 },
  { area: "Digital Presence and Marketing", kpi: "Social media engagement rate", target: "5%", actual: "", achievement: 0 },
  { area: "Digital Presence and Marketing", kpi: "Inbound lead generation growth", target: "15%", actual: "", achievement: 0 },
  // Team Performance and Innovation
  { area: "Team Performance and Innovation", kpi: "Sales team certification completion rate", target: "100%", actual: "", achievement: 0 },
  { area: "Team Performance and Innovation", kpi: "Number of innovative solutions proposed to clients", target: 5, actual: "", achievement: 0 },
  { area: "Team Performance and Innovation", kpi: "Average sales cycle length (days)", target: 45, actual: "", achievement: 0 },
  { area: "Team Performance and Innovation", kpi: "Employee Net Promoter Score (eNPS)", target: 40, actual: "", achievement: 0 },
]

export default function EnhancedSalesKRASheet() {
  const [kras, setKRAs] = useState<KRA[]>(initialKRAs)

  const handleActualChange = (index: number, value: string) => {
    const updatedKRAs = [...kras]
    updatedKRAs[index].actual = value
    updatedKRAs[index].achievement = calculateAchievement(updatedKRAs[index].target, value)
    setKRAs(updatedKRAs)
  }

  const calculateAchievement = (target: number | string, actual: number | string): number => {
    if (typeof target === 'number' && typeof actual === 'number') {
      return (actual / target) * 100
    }
    if (typeof target === 'string' && typeof actual === 'string') {
      const targetNum = parseFloat(target)
      const actualNum = parseFloat(actual)
      if (!isNaN(targetNum) && !isNaN(actualNum)) {
        return (actualNum / targetNum) * 100
      }
    }
    return 0
  }

  const getAchievementColor = (achievement: number): string => {
    if (achievement >= 100) return 'text-green-600'
    if (achievement >= 75) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getAchievementEmoji = (achievement: number): string => {
    if (achievement >= 100) return '🎉'
    if (achievement >= 75) return '👍'
    return '⚠️'
  }

  const areas = Array.from(new Set(kras.map(kra => kra.area)))

  return (
    <Card className="w-full max-w-6xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Enhanced Sales KRA Sheet</CardTitle>
        <p className="text-center text-muted-foreground">Company Focus: Full Fledged Business Development Services and C2C IT Augmentation</p>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue={areas[0]}>
          <TabsList className="mb-4">
            {areas.map(area => (
              <TabsTrigger key={area} value={area}>{area}</TabsTrigger>
            ))}
          </TabsList>
          {areas.map(area => (
            <TabsContent key={area} value={area}>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Key Performance Indicator (KPI)</TableHead>
                    <TableHead>Target (Quarterly)</TableHead>
                    <TableHead>Actual</TableHead>
                    <TableHead>Achievement %</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {kras.filter(kra => kra.area === area).map((kra, index) => (
                    <TableRow key={index}>
                      <TableCell>{kra.kpi}</TableCell>
                      <TableCell>{kra.target}</TableCell>
                      <TableCell>
                        <Input
                          type="text"
                          value={kra.actual}
                          onChange={(e) => handleActualChange(kras.indexOf(kra), e.target.value)}
                          className="w-full"
                          aria-label={`Actual value for ${kra.kpi}`}
                        />
                      </TableCell>
                      <TableCell className={getAchievementColor(kra.achievement)}>
                        {kra.achievement.toFixed(2)}% {getAchievementEmoji(kra.achievement)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-2">Performance Overview</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={kras.filter(kra => kra.area === area)}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="kpi" angle={-45} textAnchor="end" interval={0} height={100} />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="achievement" fill="#8884d8" name="Achievement %" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>
          ))}
        </Tabs>
        <div className="mt-6 p-4 bg-yellow-100 rounded-md">
          <h3 className="font-semibold mb-2 flex items-center">
            <AlertCircle className="mr-2" />
            Instructions:
          </h3>
          <ol className="list-decimal list-inside text-sm space-y-1">
            <li>Enter the actual results in the "Actual" column as they are achieved.</li>
            <li>The "Achievement %" will be calculated automatically.</li>
            <li>Use the tabs to navigate between different Key Result Areas.</li>
            <li>Review the bar chart to visualize performance across KPIs.</li>
            <li>Look for the emoji indicators for quick performance assessment.</li>
            <li>Discuss results and strategies in regular sales team meetings.</li>
          </ol>
        </div>
      </CardContent>
    </Card>
  )
}