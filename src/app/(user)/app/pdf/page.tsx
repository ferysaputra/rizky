import { FileText, Download, ZoomIn, ZoomOut, ChevronLeft, ChevronRight } from 'lucide-react';

export default function PdfPage() {
    return (
        <div className="animate-fade-in">
            {/* Header */}
            <div className="px-5 pt-6 pb-4">
                <h1 className="font-display text-xl font-bold">Sumber Daya PDF</h1>
                <p className="text-muted text-xs mt-1">Materi edukasi dan panduan</p>
            </div>

            {/* PDF Viewer */}
            <div className="px-5 mb-5">
                <div className="glass-card-strong overflow-hidden">
                    {/* Toolbar */}
                    <div className="flex items-center justify-between px-4 py-3 border-b border-border">
                        <div className="flex items-center gap-2">
                            <FileText size={16} className="text-primary" />
                            <span className="text-sm font-semibold truncate max-w-[180px]">
                                Health_Guide_2026.pdf
                            </span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <button className="w-8 h-8 rounded-lg hover:bg-primary/5 flex items-center justify-center transition-colors">
                                <ZoomOut size={16} className="text-muted" />
                            </button>
                            <span className="text-xs text-muted font-medium px-1">100%</span>
                            <button className="w-8 h-8 rounded-lg hover:bg-primary/5 flex items-center justify-center transition-colors">
                                <ZoomIn size={16} className="text-muted" />
                            </button>
                            <button className="w-8 h-8 rounded-lg hover:bg-primary/5 flex items-center justify-center transition-colors">
                                <Download size={16} className="text-muted" />
                            </button>
                        </div>
                    </div>

                    {/* PDF Content Placeholder */}
                    <div className="bg-gray-50 min-h-[500px] flex flex-col items-center justify-center p-8">
                        <div className="w-full max-w-[340px] space-y-6">
                            {/* Simulated PDF page */}
                            <div className="bg-white rounded-xl shadow-sm p-6 space-y-4">
                                <div className="text-center mb-6">
                                    <div className="w-12 h-12 mx-auto rounded-xl bg-gradient-to-br from-primary/20 to-accent/15 flex items-center justify-center mb-3">
                                        <FileText size={20} className="text-primary" />
                                    </div>
                                    <h2 className="font-display font-bold text-base gradient-text">
                                        Women&apos;s Health Guide
                                    </h2>
                                    <p className="text-muted text-xs mt-1">Seri Edukasi Smart Haid</p>
                                </div>

                                {/* Simulated content lines */}
                                <div className="space-y-2.5">
                                    <div className="h-2.5 bg-gray-100 rounded-full w-full" />
                                    <div className="h-2.5 bg-gray-100 rounded-full w-11/12" />
                                    <div className="h-2.5 bg-gray-100 rounded-full w-full" />
                                    <div className="h-2.5 bg-gray-100 rounded-full w-9/12" />
                                </div>

                                <div className="pt-2 space-y-2.5">
                                    <div className="h-3 bg-primary/10 rounded-full w-7/12" />
                                    <div className="h-2.5 bg-gray-100 rounded-full w-full" />
                                    <div className="h-2.5 bg-gray-100 rounded-full w-10/12" />
                                    <div className="h-2.5 bg-gray-100 rounded-full w-full" />
                                    <div className="h-2.5 bg-gray-100 rounded-full w-8/12" />
                                </div>

                                <div className="pt-2 space-y-2.5">
                                    <div className="h-3 bg-primary/10 rounded-full w-8/12" />
                                    <div className="h-2.5 bg-gray-100 rounded-full w-full" />
                                    <div className="h-2.5 bg-gray-100 rounded-full w-11/12" />
                                    <div className="h-2.5 bg-gray-100 rounded-full w-full" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Page Navigation */}
                    <div className="flex items-center justify-center gap-4 px-4 py-3 border-t border-border">
                        <button className="w-8 h-8 rounded-lg hover:bg-primary/5 flex items-center justify-center transition-colors">
                            <ChevronLeft size={16} className="text-muted" />
                        </button>
                        <span className="text-xs text-muted font-medium">Page 1 of 12</span>
                        <button className="w-8 h-8 rounded-lg hover:bg-primary/5 flex items-center justify-center transition-colors">
                            <ChevronRight size={16} className="text-muted" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Other Resources */}
            <div className="px-5 mb-5">
                <h2 className="font-display font-bold text-sm mb-3">Other Resources</h2>
                <div className="space-y-2.5">
                    {['Nutrition Guide.pdf', 'Exercise Planner.pdf', 'Symptom Tracker.pdf'].map((name, i) => (
                        <div key={i} className="glass-card p-3.5 flex items-center gap-3 cursor-pointer hover:shadow-md transition-all duration-300">
                            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                                <FileText size={18} className="text-primary" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-semibold truncate">{name}</p>
                                <p className="text-muted text-[10px]">{(Math.random() * 3 + 0.5).toFixed(1)} MB</p>
                            </div>
                            <Download size={16} className="text-muted shrink-0" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
