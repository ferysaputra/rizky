'use client';

import { useState } from 'react';
import CalendarGrid from '@/components/CalendarGrid';
import { Settings, ChevronDown, Droplets, Flower2, Sun } from 'lucide-react';

export default function CalendarPage() {
    const [lastPeriodDate, setLastPeriodDate] = useState(new Date('2026-02-10'));
    const [cycleLength, setCycleLength] = useState(28);
    const [periodLength, setPeriodLength] = useState(5);
    const [showSettings, setShowSettings] = useState(false);

    // Calculate current cycle day
    const today = new Date();
    const diffTime = today.getTime() - lastPeriodDate.getTime();
    const currentDay = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;
    const cycleDayInCycle = ((currentDay - 1) % cycleLength) + 1;

    // Determine current phase
    let currentPhase = 'Luteal Phase';
    let phaseIcon = <Sun size={18} />;
    let phaseColor = 'text-warning';

    // Dynamic based on period length
    const ovulationDay = cycleLength - 14;

    if (cycleDayInCycle <= periodLength) {
        currentPhase = 'Period';
        phaseIcon = <Droplets size={18} />;
        phaseColor = 'text-period-red';
    } else if (cycleDayInCycle >= ovulationDay - 5 && cycleDayInCycle <= ovulationDay + 1 && cycleDayInCycle !== ovulationDay) {
        currentPhase = 'Fertile Window';
        phaseIcon = <Flower2 size={18} />;
        phaseColor = 'text-fertile-green';
    } else if (cycleDayInCycle === ovulationDay) {
        currentPhase = 'Ovulation';
        phaseIcon = <Flower2 size={18} />;
        phaseColor = 'text-ovulation-purple';
    }

    return (
        <div className="animate-fade-in">
            {/* Header */}
            <div className="px-5 pt-6 pb-4">
                <div className="flex items-center justify-between">
                    <h1 className="font-display text-xl font-bold">Cycle Calendar</h1>
                    <button
                        onClick={() => setShowSettings(!showSettings)}
                        className="w-10 h-10 rounded-xl glass-card flex items-center justify-center hover:bg-primary/5 transition-colors"
                    >
                        <Settings size={30} className="text-muted" />
                    </button>
                </div>
            </div>

            {/* Cycle Status Card */}
            <div className="px-5 mb-5">
                <div className="glass-card-strong p-4">
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/15 to-accent/10 flex flex-col items-center justify-center">
                            <span className="text-2xl font-display font-extrabold text-primary">{cycleDayInCycle}</span>
                            <span className="text-[9px] text-muted font-semibold uppercase">Day</span>
                        </div>
                        <div className="flex-1">
                            <div className={`flex items-center gap-1.5 ${phaseColor}`}>
                                {phaseIcon}
                                <span className="font-semibold text-sm">{currentPhase}</span>
                            </div>
                            <p className="text-muted text-xs mt-1">Cycle length: {cycleLength} days</p>
                            <div className="mt-2 h-1.5 rounded-full bg-border overflow-hidden">
                                <div
                                    className="h-full rounded-full bg-gradient-to-r from-primary to-accent transition-all duration-500"
                                    style={{ width: `${(cycleDayInCycle / cycleLength) * 100}%` }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Settings Panel */}
            {showSettings && (
                <div className="px-5 mb-5 animate-slide-up">
                    <div className="glass-card p-4">
                        <h3 className="font-semibold text-sm mb-3">Cycle Settings</h3>
                        <div className="space-y-3">
                            <div>
                                <label className="text-xs text-muted font-medium block mb-1">Last Period Date</label>
                                <input
                                    type="date"
                                    value={lastPeriodDate.toISOString().split('T')[0]}
                                    onChange={(e) => setLastPeriodDate(new Date(e.target.value))}
                                    className="input-field text-sm"
                                />
                            </div>
                            <div>
                                <label className="text-xs text-muted font-medium block mb-1">Average Cycle Length</label>
                                <div className="relative">
                                    <select
                                        className="input-field text-sm appearance-none pr-8"
                                        value={cycleLength}
                                        onChange={(e) => setCycleLength(Number(e.target.value))}
                                    >
                                        {Array.from({ length: 21 }, (_, i) => i + 20).map((n) => (
                                            <option key={n} value={n}>{n} days</option>
                                        ))}
                                    </select>
                                    <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted pointer-events-none" />
                                </div>
                            </div>
                            <div>
                                <label className="text-xs text-muted font-medium block mb-1">Menstruation Length</label>
                                <div className="relative">
                                    <select
                                        className="input-field text-sm appearance-none pr-8"
                                        value={periodLength}
                                        onChange={(e) => setPeriodLength(Number(e.target.value))}
                                    >
                                        {Array.from({ length: 8 }, (_, i) => i + 2).map((n) => (
                                            <option key={n} value={n}>{n} days</option>
                                        ))}
                                    </select>
                                    <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted pointer-events-none" />
                                </div>
                            </div>
                            <button className="btn-primary w-full mt-2" onClick={() => setShowSettings(false)}>Save Settings</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Calendar */}
            <div className="px-5 mb-5">
                <CalendarGrid lastPeriodDate={lastPeriodDate} cycleLength={cycleLength} periodLength={periodLength} />
            </div>

            {/* Phase Info Cards */}
            <div className="px-5 mb-5">
                <h2 className="font-display font-bold text-sm mb-3">Cycle Phases</h2>
                <div className="grid grid-cols-2 gap-3">
                    <div className="glass-card p-3 border-l-3 border-l-period-red">
                        <div className="flex items-center gap-1.5 mb-1">
                            <Droplets size={14} className="text-period-red" />
                            <span className="text-xs font-bold text-period-red">Period</span>
                        </div>
                        <p className="text-[10px] text-muted">Days 1–{periodLength}</p>
                    </div>
                    <div className="glass-card p-3 border-l-3 border-l-fertile-green">
                        <div className="flex items-center gap-1.5 mb-1">
                            <Flower2 size={14} className="text-fertile-green" />
                            <span className="text-xs font-bold text-fertile-green">Fertile</span>
                        </div>
                        <p className="text-[10px] text-muted">Days {ovulationDay - 5}–{ovulationDay + 1}</p>
                    </div>
                    <div className="glass-card p-3 border-l-3 border-l-ovulation-purple">
                        <div className="flex items-center gap-1.5 mb-1">
                            <Flower2 size={14} className="text-ovulation-purple" />
                            <span className="text-xs font-bold text-ovulation-purple">Ovulation</span>
                        </div>
                        <p className="text-[10px] text-muted">Day {ovulationDay}</p>
                    </div>
                    <div className="glass-card p-3 border-l-3 border-l-warning">
                        <div className="flex items-center gap-1.5 mb-1">
                            <Sun size={14} className="text-warning" />
                            <span className="text-xs font-bold text-warning">Luteal</span>
                        </div>
                        <p className="text-[10px] text-muted">Days {ovulationDay + 1}–{cycleLength}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
