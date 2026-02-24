'use client';

import { useState, useEffect, useRef } from 'react';
import { Plus, Pencil, Trash2, Search, Upload, Video, FileText, X, Eye, Loader2 } from 'lucide-react';
import { format } from 'date-fns';
import { getArticles, createArticle, deleteArticle, Article } from '@/lib/firestore/articles';
import { uploadPDF, listPDFs, StorageFile } from '@/lib/firestore/storage';

export default function CmsPage() {
    const [articles, setArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [showArticleModal, setShowArticleModal] = useState(false);
    const [activeTab, setActiveTab] = useState<'articles' | 'videos' | 'pdf'>('articles');
    const [saving, setSaving] = useState(false);
    const [pdfs, setPdfs] = useState<StorageFile[]>([]);
    const [uploading, setUploading] = useState(false);
    const pdfInputRef = useRef<HTMLInputElement>(null);

    // New article form
    const [newTitle, setNewTitle] = useState('');
    const [newCategory, setNewCategory] = useState('Health');
    const [newContent, setNewContent] = useState('');
    const [newYoutubeId, setNewYoutubeId] = useState('');
    const [newExcerpt, setNewExcerpt] = useState('');

    useEffect(() => {
        fetchArticles();
        fetchPDFs();
    }, []);

    async function fetchArticles() {
        try {
            const data = await getArticles();
            setArticles(data);
        } catch (error) {
            console.error('Error fetching articles:', error);
        } finally {
            setLoading(false);
        }
    }

    async function fetchPDFs() {
        try {
            const files = await listPDFs();
            setPdfs(files);
        } catch (error) {
            console.error('Error fetching PDFs:', error);
        }
    }

    const filteredArticles = articles.filter((a) =>
        a.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleCreateArticle = async () => {
        if (!newTitle.trim()) return;
        setSaving(true);
        try {
            await createArticle({
                title: newTitle,
                category: newCategory,
                content: `<p>${newContent}</p>`,
                excerpt: newExcerpt || newContent.substring(0, 120) + '...',
                youtubeId: newYoutubeId,
                imageUrl: '',
            });
            await fetchArticles();
            setShowArticleModal(false);
            setNewTitle('');
            setNewCategory('Health');
            setNewContent('');
            setNewYoutubeId('');
            setNewExcerpt('');
        } catch (error) {
            console.error('Error creating article:', error);
        } finally {
            setSaving(false);
        }
    };

    const handleDeleteArticle = async (id: string) => {
        try {
            await deleteArticle(id);
            setArticles(articles.filter((a) => a.id !== id));
        } catch (error) {
            console.error('Error deleting article:', error);
        }
    };

    const handlePDFUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setUploading(true);
        try {
            await uploadPDF(file);
            await fetchPDFs();
        } catch (error) {
            console.error('Error uploading PDF:', error);
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="animate-fade-in">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="font-display text-2xl font-bold">Pengelola Konten</h1>
                    <p className="text-muted text-sm mt-1">Kelola artikel, video, dan sumber daya PDF</p>
                </div>
                <button
                    onClick={() => setShowArticleModal(true)}
                    className="btn-primary flex items-center gap-2"
                >
                    <Plus size={18} /> Konten Baru
                </button>
            </div>

            {/* Tabs */}
            <div className="flex gap-1 p-1 bg-gray-100 rounded-xl w-fit mb-6">
                {([
                    { key: 'articles', label: 'Artikel', icon: FileText },
                    { key: 'videos', label: 'Video', icon: Video },
                    { key: 'pdf', label: 'Sumber Daya PDF', icon: Upload },
                ] as const).map((tab) => (
                    <button
                        key={tab.key}
                        onClick={() => setActiveTab(tab.key)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${activeTab === tab.key
                            ? 'bg-white shadow-sm text-foreground'
                            : 'text-muted hover:text-foreground'
                            }`}
                    >
                        <tab.icon size={16} />
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Articles Tab */}
            {activeTab === 'articles' && (
                <>
                    <div className="mb-5 max-w-md">
                        <div className="relative">
                            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
                            <input
                                type="text"
                                placeholder="Cari artikel..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="input-field pl-10"
                            />
                        </div>
                    </div>

                    <div className="glass-card-strong overflow-hidden">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-border">
                                    <th className="text-left px-6 py-4 text-xs font-semibold text-muted uppercase tracking-wider">Judul</th>
                                    <th className="text-left px-6 py-4 text-xs font-semibold text-muted uppercase tracking-wider">Kategori</th>
                                    <th className="text-left px-6 py-4 text-xs font-semibold text-muted uppercase tracking-wider">Tanggal</th>
                                    <th className="text-left px-6 py-4 text-xs font-semibold text-muted uppercase tracking-wider">Video</th>
                                    <th className="text-right px-6 py-4 text-xs font-semibold text-muted uppercase tracking-wider">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    Array.from({ length: 3 }).map((_, i) => (
                                        <tr key={i}>
                                            <td colSpan={5} className="p-4">
                                                <div className="h-12 rounded bg-gray-100 animate-pulse" />
                                            </td>
                                        </tr>
                                    ))
                                ) : filteredArticles.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="text-center text-muted text-sm p-8">
                                            Belum ada artikel
                                        </td>
                                    </tr>
                                ) : (
                                    filteredArticles.map((article) => (
                                        <tr key={article.id} className="border-b border-border/50 hover:bg-gray-50/50 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center shrink-0">
                                                        <FileText size={16} className="text-primary" />
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-semibold">{article.title}</p>
                                                        <p className="text-xs text-muted line-clamp-1">{article.excerpt}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">
                                                    {article.category}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-muted">
                                                {format(article.createdAt, 'dd MMM yyyy')}
                                            </td>
                                            <td className="px-6 py-4">
                                                {article.youtubeId ? (
                                                    <span className="flex items-center gap-1 text-xs text-success font-medium">
                                                        <Video size={14} /> Terhubung
                                                    </span>
                                                ) : (
                                                    <span className="text-xs text-muted">Tidak ada</span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center justify-end gap-1">
                                                    <button className="p-2 rounded-lg hover:bg-primary/5 transition-colors">
                                                        <Eye size={16} className="text-muted" />
                                                    </button>
                                                    <button className="p-2 rounded-lg hover:bg-primary/5 transition-colors">
                                                        <Pencil size={16} className="text-primary" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteArticle(article.id)}
                                                        className="p-2 rounded-lg hover:bg-danger/5 transition-colors"
                                                    >
                                                        <Trash2 size={16} className="text-danger" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </>
            )}

            {/* Videos Tab */}
            {activeTab === 'videos' && (
                <div className="glass-card-strong p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {articles.filter(a => a.youtubeId).map((article) => (
                            <div key={article.id} className="rounded-xl border border-border overflow-hidden hover:shadow-md transition-all duration-300 group">
                                <div className="h-32 bg-gradient-to-br from-gray-800 to-gray-900 relative flex items-center justify-center">
                                    <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm group-hover:scale-110 transition-transform">
                                        <Video size={20} className="text-white ml-0.5" />
                                    </div>
                                </div>
                                <div className="p-3">
                                    <h3 className="text-sm font-semibold line-clamp-1">{article.title}</h3>
                                    <p className="text-xs text-muted mt-1">YouTube ID: {article.youtubeId}</p>
                                </div>
                            </div>
                        ))}

                        <div className="rounded-xl border-2 border-dashed border-border hover:border-primary/30 flex flex-col items-center justify-center p-8 cursor-pointer transition-colors group min-h-[200px]">
                            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                                <Plus size={20} className="text-primary" />
                            </div>
                            <p className="text-sm font-semibold text-muted">Tambah Video</p>
                            <p className="text-xs text-muted/60 mt-1">Tempel tautan YouTube</p>
                        </div>
                    </div>
                </div>
            )}

            {/* PDF Tab */}
            {activeTab === 'pdf' && (
                <div className="glass-card-strong p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {/* Existing PDFs */}
                        {pdfs.map((pdf, i) => (
                            <div key={i} className="rounded-xl border border-border p-5">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                                        <FileText size={24} className="text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-bold">{pdf.name}</h3>
                                        <p className="text-xs text-muted">PDF</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <a href={pdf.url} target="_blank" rel="noopener noreferrer" className="btn-secondary text-xs py-2 px-3 flex items-center gap-1">
                                        <Eye size={14} /> Pratinjau
                                    </a>
                                </div>
                            </div>
                        ))}

                        {/* Upload new */}
                        <div
                            onClick={() => pdfInputRef.current?.click()}
                            className="rounded-xl border-2 border-dashed border-border hover:border-primary/30 flex flex-col items-center justify-center p-8 cursor-pointer transition-colors group"
                        >
                            <input
                                ref={pdfInputRef}
                                type="file"
                                accept=".pdf"
                                onChange={handlePDFUpload}
                                className="hidden"
                            />
                            {uploading ? (
                                <Loader2 size={24} className="text-primary animate-spin mb-3" />
                            ) : (
                                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                                    <Upload size={24} className="text-primary" />
                                </div>
                            )}
                            <p className="text-sm font-semibold text-foreground">
                                {uploading ? 'Mengunggah...' : 'Unggah PDF Baru'}
                            </p>
                            <p className="text-xs text-muted mt-1">Seret & lepas atau klik untuk mencari</p>
                            <p className="text-[10px] text-muted/50 mt-2">Ukuran file maks: 10MB</p>
                        </div>
                    </div>
                </div>
            )}

            {/* Article Modal */}
            {showArticleModal && (
                <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[100] flex items-center justify-center p-4 animate-fade-in" onClick={() => setShowArticleModal(false)}>
                    <div className="bg-white rounded-2xl w-full max-w-lg p-6 animate-slide-up max-h-[85vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-between mb-5">
                            <h2 className="font-display font-bold text-lg">Artikel Baru</h2>
                            <button
                                onClick={() => setShowArticleModal(false)}
                                className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
                            >
                                <X size={16} />
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="text-xs font-semibold text-muted block mb-1.5">Judul</label>
                                <input
                                    type="text"
                                    placeholder="Judul artikel"
                                    value={newTitle}
                                    onChange={(e) => setNewTitle(e.target.value)}
                                    className="input-field"
                                />
                            </div>
                            <div>
                                <label className="text-xs font-semibold text-muted block mb-1.5">Kategori</label>
                                <select
                                    value={newCategory}
                                    onChange={(e) => setNewCategory(e.target.value)}
                                    className="input-field"
                                >
                                    <option>Health</option>
                                    <option>Nutrition</option>
                                    <option>Fitness</option>
                                    <option>Wellness</option>
                                </select>
                            </div>
                            <div>
                                <label className="text-xs font-semibold text-muted block mb-1.5">Ringkasan</label>
                                <input
                                    type="text"
                                    placeholder="Ringkasan singkat artikel"
                                    value={newExcerpt}
                                    onChange={(e) => setNewExcerpt(e.target.value)}
                                    className="input-field"
                                />
                            </div>
                            <div>
                                <label className="text-xs font-semibold text-muted block mb-1.5">Konten</label>
                                <textarea
                                    rows={6}
                                    placeholder="Tulis konten artikel Anda..."
                                    value={newContent}
                                    onChange={(e) => setNewContent(e.target.value)}
                                    className="input-field resize-none"
                                />
                            </div>
                            <div>
                                <label className="text-xs font-semibold text-muted block mb-1.5">YouTube Video ID (opsional)</label>
                                <input
                                    type="text"
                                    placeholder="contoh: dQw4w9WgXcQ"
                                    value={newYoutubeId}
                                    onChange={(e) => setNewYoutubeId(e.target.value)}
                                    className="input-field"
                                />
                            </div>
                            <div className="flex gap-3 pt-2">
                                <button
                                    onClick={handleCreateArticle}
                                    disabled={saving}
                                    className="btn-primary flex-1 py-3 flex items-center justify-center gap-2 disabled:opacity-60"
                                >
                                    {saving && <Loader2 size={16} className="animate-spin" />}
                                    Publikasi Artikel
                                </button>
                                <button onClick={() => setShowArticleModal(false)} className="btn-secondary flex-1 py-3">
                                    Batal
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
