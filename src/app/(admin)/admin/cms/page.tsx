'use client';

import { useState } from 'react';
import { mockArticles, Article } from '@/lib/mock-data';
import { Plus, Pencil, Trash2, Search, Upload, Video, FileText, X, Eye } from 'lucide-react';
import { format } from 'date-fns';

export default function CmsPage() {
    const [articles] = useState<Article[]>(mockArticles);
    const [searchQuery, setSearchQuery] = useState('');
    const [showArticleModal, setShowArticleModal] = useState(false);
    const [activeTab, setActiveTab] = useState<'articles' | 'videos' | 'pdf'>('articles');

    const filteredArticles = articles.filter((a) =>
        a.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="animate-fade-in">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="font-display text-2xl font-bold">Content Manager</h1>
                    <p className="text-muted text-sm mt-1">Manage articles, videos, and PDF resources</p>
                </div>
                <button
                    onClick={() => setShowArticleModal(true)}
                    className="btn-primary flex items-center gap-2"
                >
                    <Plus size={18} /> New Content
                </button>
            </div>

            {/* Tabs */}
            <div className="flex gap-1 p-1 bg-gray-100 rounded-xl w-fit mb-6">
                {([
                    { key: 'articles', label: 'Articles', icon: FileText },
                    { key: 'videos', label: 'Videos', icon: Video },
                    { key: 'pdf', label: 'PDF Resources', icon: Upload },
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
                    {/* Search */}
                    <div className="mb-5 max-w-md">
                        <div className="relative">
                            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
                            <input
                                type="text"
                                placeholder="Search articles..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="input-field pl-10"
                            />
                        </div>
                    </div>

                    {/* Articles Table */}
                    <div className="glass-card-strong overflow-hidden">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-border">
                                    <th className="text-left px-6 py-4 text-xs font-semibold text-muted uppercase tracking-wider">Title</th>
                                    <th className="text-left px-6 py-4 text-xs font-semibold text-muted uppercase tracking-wider">Category</th>
                                    <th className="text-left px-6 py-4 text-xs font-semibold text-muted uppercase tracking-wider">Date</th>
                                    <th className="text-left px-6 py-4 text-xs font-semibold text-muted uppercase tracking-wider">Video</th>
                                    <th className="text-right px-6 py-4 text-xs font-semibold text-muted uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredArticles.map((article) => (
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
                                            {format(article.createdAt, 'MMM dd, yyyy')}
                                        </td>
                                        <td className="px-6 py-4">
                                            {article.youtubeId ? (
                                                <span className="flex items-center gap-1 text-xs text-success font-medium">
                                                    <Video size={14} /> Linked
                                                </span>
                                            ) : (
                                                <span className="text-xs text-muted">None</span>
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
                                                <button className="p-2 rounded-lg hover:bg-danger/5 transition-colors">
                                                    <Trash2 size={16} className="text-danger" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </>
            )}

            {/* Videos Tab */}
            {activeTab === 'videos' && (
                <div className="glass-card-strong p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {mockArticles.filter(a => a.youtubeId).map((article) => (
                            <div key={article.id} className="rounded-xl border border-border overflow-hidden hover:shadow-md transition-all duration-300 group">
                                <div className="h-32 bg-gradient-to-br from-gray-800 to-gray-900 relative flex items-center justify-center">
                                    <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm group-hover:scale-110 transition-transform">
                                        <Video size={20} className="text-white ml-0.5" />
                                    </div>
                                    <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/60 text-white text-[10px]">
                                        3:24
                                    </span>
                                </div>
                                <div className="p-3">
                                    <h3 className="text-sm font-semibold line-clamp-1">{article.title}</h3>
                                    <p className="text-xs text-muted mt-1">YouTube ID: {article.youtubeId}</p>
                                    <div className="flex items-center gap-2 mt-2">
                                        <button className="text-xs text-primary font-medium hover:underline">Edit</button>
                                        <button className="text-xs text-danger font-medium hover:underline">Remove</button>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {/* Add New Video Card */}
                        <div className="rounded-xl border-2 border-dashed border-border hover:border-primary/30 flex flex-col items-center justify-center p-8 cursor-pointer transition-colors group min-h-[200px]">
                            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                                <Plus size={20} className="text-primary" />
                            </div>
                            <p className="text-sm font-semibold text-muted">Add Video</p>
                            <p className="text-xs text-muted/60 mt-1">Paste YouTube link</p>
                        </div>
                    </div>
                </div>
            )}

            {/* PDF Tab */}
            {activeTab === 'pdf' && (
                <div className="glass-card-strong p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {/* Current PDF */}
                        <div className="rounded-xl border border-border p-5">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                                    <FileText size={24} className="text-primary" />
                                </div>
                                <div>
                                    <h3 className="text-sm font-bold">Health_Guide_2026.pdf</h3>
                                    <p className="text-xs text-muted">2.4 MB • Uploaded Feb 15, 2026</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <button className="btn-secondary text-xs py-2 px-3 flex items-center gap-1">
                                    <Eye size={14} /> Preview
                                </button>
                                <button className="btn-secondary text-xs py-2 px-3 flex items-center gap-1 text-danger border-danger/30 hover:bg-danger/5">
                                    <Trash2 size={14} /> Remove
                                </button>
                            </div>
                        </div>

                        {/* Upload new */}
                        <div className="rounded-xl border-2 border-dashed border-border hover:border-primary/30 flex flex-col items-center justify-center p-8 cursor-pointer transition-colors group">
                            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                                <Upload size={24} className="text-primary" />
                            </div>
                            <p className="text-sm font-semibold text-foreground">Upload New PDF</p>
                            <p className="text-xs text-muted mt-1">Drag & drop or click to browse</p>
                            <p className="text-[10px] text-muted/50 mt-2">Max file size: 10MB</p>
                        </div>
                    </div>
                </div>
            )}

            {/* Article Modal */}
            {showArticleModal && (
                <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
                    <div className="bg-white rounded-2xl w-full max-w-lg p-6 animate-slide-up max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between mb-5">
                            <h2 className="font-display font-bold text-lg">New Article</h2>
                            <button
                                onClick={() => setShowArticleModal(false)}
                                className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
                            >
                                <X size={16} />
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="text-xs font-semibold text-muted block mb-1.5">Title</label>
                                <input type="text" placeholder="Article title" className="input-field" />
                            </div>
                            <div>
                                <label className="text-xs font-semibold text-muted block mb-1.5">Category</label>
                                <select className="input-field">
                                    <option>Health</option>
                                    <option>Nutrition</option>
                                    <option>Fitness</option>
                                    <option>Wellness</option>
                                </select>
                            </div>
                            <div>
                                <label className="text-xs font-semibold text-muted block mb-1.5">Content</label>
                                <textarea rows={6} placeholder="Write your article content..." className="input-field resize-none" />
                            </div>
                            <div>
                                <label className="text-xs font-semibold text-muted block mb-1.5">YouTube Video ID (optional)</label>
                                <input type="text" placeholder="e.g. dQw4w9WgXcQ" className="input-field" />
                            </div>
                            <div className="flex gap-3 pt-2">
                                <button className="btn-primary flex-1 py-3">Publish Article</button>
                                <button onClick={() => setShowArticleModal(false)} className="btn-secondary flex-1 py-3">
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
