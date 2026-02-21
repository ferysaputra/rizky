'use client';

import { useState } from 'react';
import {
    startOfMonth,
    endOfMonth,
    startOfWeek,
    endOfWeek,
    addDays,
    format,
    isSameMonth,
    isToday,
    addMonths,
    subMonths,
} from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { getCyclePhase, getDayOfCycle, CyclePhase } from '@/lib/mock-data';

interface CalendarGridProps {
    lastPeriodDate: Date;
    cycleLength: number;
    periodLength?: number;
}

const phaseStyles: Record<CyclePhase, string> = {
    period: 'bg-period-red/20 text-period-red font-bold ring-2 ring-period-red/30',
    ovulation: 'bg-ovulation-purple/20 text-ovulation-purple font-bold ring-2 ring-ovulation-purple/30',
    fertile: 'bg-fertile-green/15 text-fertile-green font-semibold ring-1 ring-fertile-green/20',
    normal: 'hover:bg-primary/5',
};

export default function CalendarGrid({ lastPeriodDate, cycleLength, periodLength = 5 }: CalendarGridProps) {
    const [currentMonth, setCurrentMonth] = useState(new Date());

    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const calStart = startOfWeek(monthStart, { weekStartsOn: 1 });
    const calEnd = endOfWeek(monthEnd, { weekStartsOn: 1 });

    const weeks: Date[][] = [];
    let day = calStart;
    while (day <= calEnd) {
        const week: Date[] = [];
        for (let i = 0; i < 7; i++) {
            week.push(day);
            day = addDays(day, 1);
        }
        weeks.push(week);
    }

    const dayHeaders = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    return (
        <div className="glass-card-strong p-4">
            {/* Month Navigation */}
            <div className="flex items-center justify-between mb-4">
                <button
                    onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
                    className="p-2 rounded-xl hover:bg-primary/5 transition-colors"
                >
                    <ChevronLeft size={20} className="text-muted" />
                </button>
                <h2 className="font-display font-bold text-lg">
                    {format(currentMonth, 'MMMM yyyy')}
                </h2>
                <button
                    onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
                    className="p-2 rounded-xl hover:bg-primary/5 transition-colors"
                >
                    <ChevronRight size={20} className="text-muted" />
                </button>
            </div>

            {/* Day headers */}
            <div className="grid grid-cols-7 mb-2">
                {dayHeaders.map((d) => (
                    <div key={d} className="text-center text-xs text-muted font-semibold py-2">
                        {d}
                    </div>
                ))}
            </div>

            {/* Calendar days */}
            <div className="grid grid-cols-7 gap-1">
                {weeks.map((week, wi) =>
                    week.map((d, di) => {
                        const inMonth = isSameMonth(d, monthStart);
                        const today = isToday(d);
                        const dayNum = getDayOfCycle(d, lastPeriodDate);
                        const cycleDayInCycle = ((dayNum - 1) % cycleLength) + 1;
                        const phase = cycleDayInCycle > 0 ? getCyclePhase(cycleDayInCycle, cycleLength, periodLength) : 'normal';

                        return (
                            <div
                                key={`${wi}-${di}`}
                                className={`
                  relative flex items-center justify-center h-10 rounded-xl text-sm transition-all duration-200 cursor-default
                  ${!inMonth ? 'text-muted/30' : ''}
                  ${today ? 'ring-2 ring-primary font-bold' : ''}
                  ${inMonth ? phaseStyles[phase] : ''}
                `}
                            >
                                {format(d, 'd')}
                                {today && (
                                    <div className="absolute -bottom-0.5 w-1 h-1 rounded-full bg-primary" />
                                )}
                            </div>
                        );
                    })
                )}
            </div>

            {/* Legend */}
            <div className="flex items-center justify-center gap-4 mt-4 pt-3 border-t border-border">
                <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-period-red/30 ring-1 ring-period-red/40" />
                    <span className="text-xs text-muted">Period</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-fertile-green/25 ring-1 ring-fertile-green/30" />
                    <span className="text-xs text-muted">Fertile</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-ovulation-purple/30 ring-1 ring-ovulation-purple/40" />
                    <span className="text-xs text-muted">Ovulation</span>
                </div>
            </div>
        </div>
    );
}
