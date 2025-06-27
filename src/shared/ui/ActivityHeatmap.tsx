'use client'

import { useMemo } from 'react';
import {
  addDays,
  differenceInCalendarDays,
  format,
  getMonth,
  getDay,
  isSameMonth,
  startOfMonth,
  startOfYear
} from 'date-fns';
import enLocale from 'date-fns/locale/en-US';

interface ActivityDay {
  date: string; // ISO string: '2025-06-28'
  count: number;
}

interface ActivityHeatmapProps {
  width?: number;
  height?: number;
  activityData: ActivityDay[];
}

const dayLabels = ['Mon', 'Wed', 'Fri'];

export const ActivityHeatmap = ({ width = 600, height = 150, activityData }: ActivityHeatmapProps) => {
  const yearStart = startOfYear(new Date('2025-01-01'));
  const today = new Date();
  const totalDays = differenceInCalendarDays(today, yearStart) + 1;

  const activityMap = useMemo(() => {
    const map = new Map<string, number>();
    activityData.forEach((entry) => {
      map.set(entry.date, entry.count);
    });
    return map;
  }, [activityData]);

  const days = useMemo(() => {
    return Array.from({ length: totalDays }).map((_, i) => addDays(yearStart, i));
  }, [totalDays]);

  const getColor = (count: number = 0) => {
    if (count > 10) return 'bg-green-700';
    if (count > 5) return 'bg-green-500';
    if (count > 0) return 'bg-green-300';
    return 'bg-gray-200';
  };

  const monthLabels = useMemo(() => {
    const labels: { index: number; name: string }[] = [];
    let lastMonth = -1;
    for (let i = 0; i < 53; i++) {
      const day = addDays(yearStart, i * 7);
      const month = getMonth(day);
      if (month !== lastMonth) {
        labels.push({
          index: i,
          name: format(day, 'MMM', { locale: enLocale })
        });
        lastMonth = month;
      }
    }
    return labels;
  }, [yearStart]);

  return (
    <div className="flex flex-col gap-1 text-[10px]">
      {/* Month labels */}
      <div className="ml-[24px] flex gap-[2px]">
        {Array.from({ length: 53 }).map((_, weekIndex) => {
          const label = monthLabels.find(m => m.index === weekIndex);
          return (
            <div key={weekIndex} className="w-[10px] text-center">
              {label ? label.name : ''}
            </div>
          );
        })}
      </div>

      <div className="flex">
        {/* Day labels (on the left) */}
        <div className="flex flex-col justify-between h-[72px] mr-[4px] pt-[1px] text-gray-500">
          {Array.from({ length: 7 }).map((_, i) => {
            const label = dayLabels.includes(['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][i]) ? ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][i] : '';
            return (
              <div key={i} className="h-[10px] leading-[10px] text-[10px]">
                {label}
              </div>
            );
          })}
        </div>

        {/* Heatmap grid */}
        <div className="flex gap-[2px]">
          {Array.from({ length: 53 }).map((_, weekIndex) => (
            <div key={weekIndex} className="flex flex-col gap-[2px]">
              {Array.from({ length: 7 }).map((_, dayIndex) => {
                const day = addDays(yearStart, weekIndex * 7 + dayIndex);
                if (day > today) return <div key={dayIndex} className="w-[10px] h-[10px]" />;

                const dateStr = format(day, 'yyyy-MM-dd');
                const count = activityMap.get(dateStr) ?? 0;

                return (
                  <div
                    key={dateStr}
                    title={`${dateStr}: ${count}`}
                    className={`w-[10px] h-[10px] ${getColor(count)} rounded-sm`}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
