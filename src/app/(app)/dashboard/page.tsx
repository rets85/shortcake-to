"use client";

import { useCallback, useEffect, useState } from "react";
import Toast from "@/components/ui/Toast";
import {
  ClipboardDocumentIcon,
  PencilIcon,
  TrashIcon,
  PlusIcon,
  CheckIcon,
} from "@heroicons/react/24/outline";

interface Link {
  id: string;
  slug: string;
  destination: string;
  enabled: boolean;
  clicks: number;
  lastClickAt: string | null;
  createdAt: string;
}

export default function DashboardPage() {
  const [links, setLinks] = useState<Link[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [panelOpen, setPanelOpen] = useState(false);
  const [destination, setDestination] = useState("");
  const [customSlug, setCustomSlug] = useState("");
  const [error, setError] = useState("");
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editDest, setEditDest] = useState("");
  const [editSlug, setEditSlug] = useState("");
  const [editEnabled, setEditEnabled] = useState(true);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const fetchLinks = useCallback(async () => {
    try {
      const res = await fetch("/api/links");
      if (!res.ok) throw new Error("Failed to fetch links");
      const data = await res.json();
      setLinks(data);
    } catch {
      showToast("Failed to load links", "error");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLinks();
  }, [fetchLinks]);

  const showToast = (
    message: string,
    type: "success" | "error" = "success"
  ) => {
    setToast({ message, type });
  };

  const handleCreateLink = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreating(true);
    setError("");

    try {
      const res = await fetch("/api/links", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ destination, slug: customSlug }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error);
        setCreating(false);
        return;
      }

      setLinks([data, ...links]);
      setDestination("");
      setCustomSlug("");
      setPanelOpen(false);
      showToast("Link created!");
    } catch {
      setError("Something went wrong");
    } finally {
      setCreating(false);
    }
  };

  const handleCopy = async (slug: string) => {
    const url = `${process.env.NEXT_PUBLIC_APP_URL || "https://shortcake.to"}/${slug}`;
    await navigator.clipboard.writeText(url);
    setCopiedSlug(slug);
    showToast("Link copied!");
    setTimeout(() => setCopiedSlug(null), 2000);
  };

  const openEdit = (link: Link) => {
    setEditingId(link.id);
    setEditDest(link.destination);
    setEditSlug(link.slug);
    setEditEnabled(link.enabled);
  };

  const handleSaveEdit = async () => {
    setCreating(true);
    try {
      const res = await fetch(`/api/links/${editingId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          destination: editDest,
          slug: editSlug,
          enabled: editEnabled,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        showToast(data.error || "Failed to update", "error");
        setCreating(false);
        return;
      }

      const updated = await res.json();
      setLinks(links.map((l) => (l.id === editingId ? updated : l)));
      setEditingId(null);
      showToast("Link updated!");
    } catch {
      showToast("Failed to update link", "error");
    } finally {
      setCreating(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteConfirm) return;
    setCreating(true);
    try {
      const res = await fetch(`/api/links/${deleteConfirm}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete");

      setLinks(links.filter((l) => l.id !== deleteConfirm));
      setDeleteConfirm(null);
      showToast("Link deleted");
    } catch {
      showToast("Failed to delete link", "error");
    } finally {
      setCreating(false);
    }
  };

  return (
    <>
      <div className="mb-6">
        <h1 className="font-display text-2xl font-bold text-white">
          Your Links
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Manage and track all your short links.
        </p>
      </div>

      {/* Create Panel */}
      {panelOpen && (
        <div className="bg-[#0F0F1A] border border-[#1E1E3A] rounded-2xl p-6 mb-6 animate-fade-in">
          <h2 className="font-display text-base font-bold text-white mb-4">
            Create a new link
          </h2>
          {error && (
            <p className="text-sm text-rose-500 mb-4 text-center">{error}</p>
          )}
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">
                Destination URL
              </label>
              <input
                type="url"
                placeholder="https://your-long-url.com/goes/here"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="bg-[#08080F] border border-[#1E1E3A] focus:border-violet-500 rounded-lg px-4 py-3 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-violet-500/50 transition-all w-full"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">
                Custom slug{" "}
                <span className="text-slate-600 font-normal">(optional)</span>
              </label>
              <div className="flex items-center bg-[#08080F] border border-[#1E1E3A] focus-within:border-violet-500 rounded-lg overflow-hidden transition-all focus-within:ring-1 focus-within:ring-violet-500/50">
                <span className="px-3 py-3 text-sm text-slate-600 border-r border-[#1E1E3A] shrink-0">
                  shortcake.to/
                </span>
                <input
                  type="text"
                  placeholder="leave blank for auto"
                  value={customSlug}
                  onChange={(e) => setCustomSlug(e.target.value)}
                  className="bg-transparent flex-1 px-3 py-3 text-sm text-slate-100 placeholder-slate-600 focus:outline-none font-mono"
                />
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Letters, numbers, and hyphens only.
              </p>
            </div>
            <div className="flex items-center gap-3 pt-1">
              <button
                onClick={handleCreateLink}
                disabled={creating || !destination}
                className="bg-violet-600 hover:bg-violet-500 text-white font-semibold px-5 py-2.5 rounded-lg transition-all duration-200 text-sm shadow-[0_0_20px_rgba(124,58,237,0.4)] hover:shadow-[0_0_30px_rgba(124,58,237,0.6)] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {creating ? "Creating..." : "Shorten"}
              </button>
              <button
                onClick={() => {
                  setPanelOpen(false);
                  setError("");
                }}
                className="text-sm text-slate-500 hover:text-white transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Links List */}
      {loading ? (
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="bg-[#0F0F1A] border border-[#1E1E3A] rounded-2xl p-4 animate-pulse"
            >
              <div className="h-4 bg-[#1E1E3A] rounded w-1/3"></div>
            </div>
          ))}
        </div>
      ) : links.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-32 text-center">
          <div className="relative mb-6">
            <div className="absolute inset-0 bg-violet-600/20 rounded-full blur-2xl scale-150" />
            <div className="relative w-16 h-16 bg-[#0F0F1A] border border-[#1E1E3A] rounded-2xl flex items-center justify-center text-2xl">
              🔗
            </div>
          </div>
          <h3 className="font-display text-lg font-bold text-white mb-2">
            No links yet
          </h3>
          <p className="text-sm text-slate-500 mb-6 max-w-xs">
            Create your first short link to get started.
          </p>
          <button
            onClick={() => setPanelOpen(true)}
            className="bg-violet-600 hover:bg-violet-500 text-white font-semibold px-5 py-2.5 rounded-lg transition-all duration-200 shadow-[0_0_20px_rgba(124,58,237,0.4)] hover:shadow-[0_0_30px_rgba(124,58,237,0.6)] flex items-center gap-2 active:scale-[0.98]"
          >
            <span className="text-lg leading-none">+</span>
            Create link
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {links.map((link) => (
            <div
              key={link.id}
              className="group bg-[#0F0F1A] border border-[#1E1E3A] hover:border-[#2D2D5A] rounded-2xl p-4 transition-all duration-200 flex items-center gap-4"
            >
              {/* Left: short URL */}
              <div className="min-w-0 flex-1">
                <div className="font-mono text-cyan-400 text-sm flex items-center gap-2">
                  <a
                    href={`${process.env.NEXT_PUBLIC_APP_URL || "https://shortcake.to"}/${link.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    shortcake.to/{link.slug}
                  </a>
                  <button
                    onClick={() => handleCopy(link.slug)}
                    className="text-slate-600 hover:text-cyan-400 transition-colors opacity-0 group-hover:opacity-100"
                    title="Copy to clipboard"
                  >
                    {copiedSlug === link.slug ? (
                      <CheckIcon className="w-4 h-4 text-emerald-500" />
                    ) : (
                      <ClipboardDocumentIcon className="w-4 h-4" />
                    )}
                  </button>
                </div>
                <p className="text-xs text-slate-500 mt-1 truncate max-w-xs">
                  {link.destination}
                </p>
              </div>

              {/* Right: stats + actions */}
              <div className="flex items-center gap-4 shrink-0">
                <span className="bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-xs font-medium px-2.5 py-0.5 rounded-full font-mono">
                  {link.clicks.toLocaleString()} clicks
                </span>
                <span className="text-xs text-slate-600 hidden sm:block">
                  {new Date(link.createdAt).toLocaleDateString()}
                </span>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => openEdit(link)}
                    className="p-1.5 text-slate-500 hover:text-white hover:bg-white/10 rounded-md transition-colors"
                    title="Edit"
                  >
                    <PencilIcon className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setDeleteConfirm(link.id)}
                    className="p-1.5 text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 rounded-md transition-colors"
                    title="Delete"
                  >
                    <TrashIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit Modal */}
      {editingId && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center px-4 animate-fade-in">
          <div className="bg-[#0F0F1A] border border-[#1E1E3A] rounded-2xl p-8 shadow-[0_0_60px_rgba(0,0,0,0.5)] w-full max-w-md animate-slide-up">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-xl font-bold text-white">
                Edit link
              </h2>
              <button
                onClick={() => setEditingId(null)}
                className="text-slate-500 hover:text-white transition-colors p-1 text-2xl leading-none"
              >
                ×
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1.5">
                  Destination URL
                </label>
                <input
                  type="url"
                  value={editDest}
                  onChange={(e) => setEditDest(e.target.value)}
                  className="bg-[#08080F] border border-[#1E1E3A] focus:border-violet-500 rounded-lg px-4 py-3 text-sm text-slate-100 focus:outline-none focus:ring-1 focus:ring-violet-500/50 transition-all w-full"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1.5">
                  Slug
                </label>
                <div className="flex items-center bg-[#08080F] border border-[#1E1E3A] focus-within:border-violet-500 rounded-lg overflow-hidden transition-all focus-within:ring-1 focus-within:ring-violet-500/50">
                  <span className="px-3 py-3 text-sm text-slate-600 border-r border-[#1E1E3A] shrink-0">
                    shortcake.to/
                  </span>
                  <input
                    type="text"
                    value={editSlug}
                    onChange={(e) => setEditSlug(e.target.value)}
                    className="bg-transparent flex-1 px-3 py-3 text-sm text-slate-100 focus:outline-none font-mono"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between py-1">
                <div>
                  <p className="text-sm font-medium text-slate-300">
                    Link enabled
                  </p>
                  <p className="text-xs text-slate-500">
                    Disabled links return a 404.
                  </p>
                </div>
                <button
                  onClick={() => setEditEnabled(!editEnabled)}
                  className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-1 focus:ring-offset-[#0F0F1A] ${
                    editEnabled ? "bg-violet-600" : "bg-[#1E1E3A]"
                  }`}
                >
                  <span
                    className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow transition-transform ${
                      editEnabled ? "translate-x-5" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>

              <div className="bg-[#08080F] border border-[#1E1E3A] rounded-lg px-4 py-3 flex items-center justify-between">
                <div>
                  <p className="text-xs text-slate-500">Total clicks</p>
                  <p className="text-lg font-bold text-white font-mono">
                    {links.find((l) => l.id === editingId)?.clicks || 0}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-slate-500">Last clicked</p>
                  <p className="text-sm font-medium text-slate-300">
                    {links.find((l) => l.id === editingId)?.lastClickAt
                      ? new Date(
                          links.find((l) => l.id === editingId)
                            ?.lastClickAt || ""
                        ).toLocaleString()
                      : "Never"}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between mt-6 pt-5 border-t border-[#1E1E3A]">
              <button
                onClick={() => setDeleteConfirm(editingId)}
                className="border border-rose-500/30 hover:bg-rose-500/10 text-rose-400 text-sm font-medium px-4 py-2 rounded-lg transition-colors"
              >
                Delete link
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setEditingId(null)}
                  className="border border-[#2D2D5A] hover:border-violet-500 bg-transparent text-slate-300 hover:text-white font-medium px-4 py-2 rounded-lg transition-all duration-200 text-sm"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveEdit}
                  disabled={creating}
                  className="bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-all duration-200 shadow-[0_0_20px_rgba(124,58,237,0.4)] hover:shadow-[0_0_30px_rgba(124,58,237,0.6)] disabled:opacity-50"
                >
                  {creating ? "Saving..." : "Save changes"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center px-4 animate-fade-in">
          <div className="bg-[#0F0F1A] border border-[#1E1E3A] rounded-2xl p-8 shadow-[0_0_60px_rgba(0,0,0,0.5)] w-full max-w-md animate-slide-up text-center">
            <div className="text-4xl mb-3">⚠️</div>
            <h3 className="font-display text-lg font-bold text-white mb-2">
              Delete this link?
            </h3>
            <p className="text-sm text-slate-400 mb-6">
              <strong className="text-white">
                shortcake.to/
                {links.find((l) => l.id === deleteConfirm)?.slug}
              </strong>{" "}
              will stop working immediately. This can&apos;t be undone.
            </p>
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="border border-[#2D2D5A] hover:border-violet-500 bg-transparent text-slate-300 hover:text-white font-medium px-5 py-2.5 rounded-lg transition-all duration-200"
              >
                Keep it
              </button>
              <button
                onClick={handleDelete}
                disabled={creating}
                className="bg-rose-600 hover:bg-rose-500 text-white font-semibold px-5 py-2.5 rounded-lg transition-colors disabled:opacity-50"
              >
                {creating ? "Deleting..." : "Yes, delete it"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Action Button */}
      {!panelOpen && links.length > 0 && (
        <div className="fixed bottom-6 right-6 md:bottom-auto md:top-6 md:right-6 z-30">
          <button
            onClick={() => setPanelOpen(true)}
            className="bg-violet-600 hover:bg-violet-500 text-white font-semibold px-4 py-2.5 rounded-lg transition-all duration-200 flex items-center gap-1.5 shadow-glow hover:shadow-[0_0_30px_rgba(124,58,237,0.6)]"
          >
            <PlusIcon className="w-4 h-4" /> New Link
          </button>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onDismiss={() => setToast(null)}
        />
      )}
    </>
  );
}
