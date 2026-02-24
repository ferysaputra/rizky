'use client';

import { useState, useEffect } from 'react';
import { FileText, Download, ZoomIn, ZoomOut, ChevronLeft, ChevronRight } from 'lucide-react';
import { listPDFs, StorageFile } from '@/lib/firestore/storage';

export default function PdfPage() {
    const [pdfs, setPdfs] = useState<StorageFile[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchPDFs() {
            try {
                const files = await listPDFs();
                setPdfs(files);
            } catch (error) {
                console.error('Error fetching PDFs:', error);
            } finally {
                setLoading(false);
            }
        }
        fetchPDFs();
    }, []);

    const mainPdf = pdfs[0];

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
                                {mainPdf?.name || 'Health_Guide_2026.pdf'}
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
                            {mainPdf && (
                                <a href={mainPdf.url} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg hover:bg-primary/5 flex items-center justify-center transition-colors">
                                    <Download size={16} className="text-muted" />
                                </a>
                            )}
                        </div>
                    </div>

                    {/* PDF Content */}
                    <div className="bg-gray-50 min-h-[500px] flex flex-col items-center justify-center p-8">
                        {loading ? (
                            <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                        ) : mainPdf ? (
                            <iframe
                                src={mainPdf.url}
                                className="w-full h-[500px] border-0"
                                title="PDF Viewer"
                            />
                        ) : (
                            <div className="w-full max-w-[340px] space-y-6">
                                <div className="bg-white rounded-xl shadow-sm p-6 space-y-4">
                                    <div className="text-center mb-6">
                                        <div className="w-12 h-12 mx-auto rounded-xl bg-gradient-to-br from-primary/20 to-accent/15 flex items-center justify-center mb-3">
                                            <FileText size={20} className="text-primary" />
                                        </div>
                                        <h2 className="font-display font-bold text-base gradient-text">
                                            Panduan Kesehatan Wanita
                                        </h2>
                                        <p className="text-muted text-xs mt-1">Seri Edukasi Smart Haid</p>
                                    </div>
                                    <div className="space-y-2.5">
                                        <div className="h-2.5 bg-gray-100 rounded-full w-full" />
                                        <div className="h-2.5 bg-gray-100 rounded-full w-11/12" />
                                        <div className="h-2.5 bg-gray-100 rounded-full w-full" />
                                        <div className="h-2.5 bg-gray-100 rounded-full w-9/12" />
                                    </div>
                                    <p className="text-center text-xs text-muted mt-4">Belum ada PDF yang diunggah</p>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Page Navigation */}
                    <div className="flex items-center justify-center gap-4 px-4 py-3 border-t border-border">
                        <button className="w-8 h-8 rounded-lg hover:bg-primary/5 flex items-center justify-center transition-colors">
                            <ChevronLeft size={16} className="text-muted" />
                        </button>
                        <span className="text-xs text-muted font-medium">Halaman 1</span>
                        <button className="w-8 h-8 rounded-lg hover:bg-primary/5 flex items-center justify-center transition-colors">
                            <ChevronRight size={16} className="text-muted" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Other Resources */}
            <div className="px-5 mb-5">
                <h2 className="font-display font-bold text-sm mb-3">Sumber Daya Lainnya</h2>
                <div className="space-y-2.5">
                    {loading ? (
                        Array.from({ length: 3 }).map((_, i) => (
                            <div key={i} className="h-16 rounded-xl bg-gray-100 animate-pulse" />
                        ))
                    ) : pdfs.length > 0 ? (
                        pdfs.map((pdf, i) => (
                            <a key={i} href={pdf.url} target="_blank" rel="noopener noreferrer" className="glass-card p-3.5 flex items-center gap-3 cursor-pointer hover:shadow-md transition-all duration-300">
                                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                                    <FileText size={18} className="text-primary" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-semibold truncate">{pdf.name}</p>
                                    <p className="text-muted text-[10px]">PDF</p>
                                </div>
                                <Download size={16} className="text-muted shrink-0" />
                            </a>
                        ))
                    ) : (
                        <p className="text-muted text-sm text-center py-4">Belum ada sumber daya diunggah</p>
                    )}
                </div>
            </div>
        </div>
    );
}
