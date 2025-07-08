import { ActivityHeatmap } from "@/shared/ui/ActivityHeatmap"
import { useResponseStore } from '@/entities/rensponse';

export const ActivityHeatmapSection = () => {
  const { responses } = useResponseStore();

  // Process responses into activity data
  const activityData = responses.reduce((acc, response) => {
    const date = new Date(response.createdAt).toISOString().split('T')[0];
    const existing = acc.find(item => item.date === date);
    if (existing) {
      existing.count += 1;
    } else {
      acc.push({ date, count: 1 });
    }
    return acc;
  }, [] as { date: string; count: number }[]);

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-semibold mb-4">Activity</h2>
      <ActivityHeatmap activityData={activityData} />
    </div>
    )
}