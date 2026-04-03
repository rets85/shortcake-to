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

  const showToast = (message: string, type: "success" | "error" = "success") => {
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
        <h1 className="text-2xl font-bold text-slate-900">Your Links</h1>
        <p className="text-sm text-slate-500 mt-1">
          Manage and track all your short links.
        </p>
      </div>

      {/* Create Panel */}
      {panelOpen && (
        <div className="bg-white border border-slate-100 rounded-xl shadow-sm p-5 mb-6 animate-in fade-in duration-200">
          <h2 className="text-base font-semibold text-slate-900 mb-4">
            Create a new link
          </h2>
          {error && (
            <p className="text-sm text-red-500 mb-4 text-center">{error}</p>
          )}
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Destination URL
              </label>
              <input
                type="url"
                placeholder="https://your-long-url.com/goes/here"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-rose-400 focus:border-transparent w-full transition"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Custom slug{" "}
                <span className="text-slate-400 font-normal">(optional)</span>
              </label>
              <div className="flex items-center gap-0">
                <span className="border border-r-0 border-slate-200 rounded-l-lg bg-slate-50 px-3 py-2.5 text-sm text-slate-500 whitespace-nowrap">
                  shortcake.to/
                </span>
                <input
                  type="text"
                  placeholder="leave blank for auto"
                  value={customSlug}
                  onChange={(e) => setCustomSlug(e.target.value)}
                  className="border border-slate-200 rounded-r-lg px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-rose-400 flex-1"
                />
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Letters, numbers, and hyphens only.
              </p>
            </div>
            <div className="flex items-center gap-3 pt-1">
              <button
                onClick={handleCreateLink}
                disabled={creating || !destination}
                className="bg-rose-500 hover:bg-rose-600 text-white font-semibold px-5 py-2.5 rounded-lg transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {creating ? "Creating..." : "Shorten"}
              </button>
              <button
                onClick={() => {
                  setPanelOpen(false);
                  setError("");
                }}
                className="text-sm text-slate-500 hover:text-slate-700 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Links List */}
      {loading ? (
        <div className="space-y-2">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="bg-white border border-slate-100 rounded-xl p-4 animate-pulse"
            >
              <div className="h-4 bg-slate-200 rounded w-1/3"></div>
            </div>
          ))}
        </div>
      ) : links.length === 0 ? (
        <div className="bg-white border border-slate-100 rounded-xl shadow-sm p-16 text-center">
          <div className="text-6xl mb-4">🍓</div>
          <h3 className="text-lg font-semibold text-slate-900 mb-2">
            No links yet
          </h3>
          <p className="text-sm text-slate-500 mb-6">
            Create your first short link and start tracking clicks.
          </p>
          <button
            onClick={() => setPanelOpen(true)}
            className="bg-rose-500 hover:bg-rose-600 text-white font-semibold px-5 py-2.5 rounded-lg transition-colors"
          >
            Create your first link
          </button>
        </div>
      ) : (
        <div className="bg-white border border-slate-100 rounded-xl shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 text-xs text-slate-500 uppercase tracking-wider">
                <th className="text-left px-5 py-3 font-medium">Short URL</th>
                <th className="text-left px-5 py-3 font-medium hidden md:table-cell">
                  Destination
                </th>
                <th className="text-left px-5 py-3 font-medium">Clicks</th>
                <th className="text-left px-5 py-3 font-medium hidden sm:table-cell">
                  Created
                </th>
                <th className="px-5 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {links.map((link) => (
                <tr
                  key={link.id}
                  className="hover:bg-slate-50 transition-colors group"
                >
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <a
                        href={`${process.env.NEXT_PUBLIC_APP_URL || "https://shortcake.to"}/${link.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-rose-500 hover:text-rose-600 transition-colors"
                      >
                        shortcake.to/{link.slug}
                      </a>
                      <button
                        onClick={() => handleCopy(link.slug)}
                        className="text-slate-300 hover:text-rose-500 transition-colors opacity-0 group-hover:opacity-100"
                        title="Copy to clipboard"
                      >
                        {copiedSlug === link.slug ? (
                          <CheckIcon className="w-4 h-4 text-emerald-500" />
                        ) : (
                          <ClipboardDocumentIcon className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </td>
                  <td className="px-5 py-4 hidden md:table-cell">
                    <span
                      className="text-slate-500 max-w-[200px] truncate block"
                      title={link.destination}
                    >
                      {link.destination}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <span className="bg-rose-50 text-rose-600 text-xs font-medium px-2 py-0.5 rounded-full">
                      {link.clicks}
                    </span>
                  </td>
                  <td className="px-5 py-4 hidden sm:table-cell">
                    <span className="text-slate-400 text-xs">
                      {new Date(link.createdAt).toLocaleDateString()}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => openEdit(link)}
                        className="text-slate-400 hover:text-slate-700 transition-colors p-1 rounded"
                        title="Edit"
                      >
                        <PencilIcon className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setDeleteConfirm(link.id)}
                        className="text-slate-400 hover:text-red-500 transition-colors p-1 rounded"
                        title="Delete"
                      >
                        <TrashIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Edit Modal */}
      {editingId && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-[2px] z-40 flex items-center justify-center px-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 z-50 animate-in fade-in scale-95 duration-150">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-semibold text-slate-900">Edit link</h2>
              <button
                onClick={() => setEditingId(null)}
                className="text-slate-400 hover:text-slate-600 transition-colors text-2xl leading-none"
              >
                ×
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Destination URL
                </label>
                <input
                  type="url"
                  value={editDest}
                  onChange={(e) => setEditDest(e.target.value)}
                  className="border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-rose-400 w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Slug
                </label>
                <div className="flex items-center">
                  <span className="border border-r-0 border-slate-200 rounded-l-lg bg-slate-50 px-3 py-2.5 text-sm text-slate-500">
                    shortcake.to/
                  </span>
                  <input
                    type="text"
                    value={editSlug}
                    onChange={(e) => setEditSlug(e.target.value)}
                    className="border border-slate-200 rounded-r-lg px-3 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-rose-400 flex-1"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between py-1">
                <div>
                  <p className="text-sm font-medium text-slate-700">
                    Link enabled
                  </p>
                  <p className="text-xs text-slate-400">
                    Disabled links return a 404.
                  </p>
                </div>
                <button
                  onClick={() => setEditEnabled(!editEnabled)}
                  className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-rose-400 focus:ring-offset-1 ${
                    editEnabled ? "bg-rose-500" : "bg-slate-200"
                  }`}
                >
                  <span
                    className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow transition-transform ${
                      editEnabled ? "translate-x-5" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>

              <div className="bg-slate-50 rounded-lg px-4 py-3 flex items-center justify-between">
                <div>
                  <p className="text-xs text-slate-500">Total clicks</p>
                  <p className="text-lg font-bold text-slate-900">
                    {links.find((l) => l.id === editingId)?.clicks || 0}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-slate-500">Last clicked</p>
                  <p className="text-sm font-medium text-slate-700">
                    {links.find((l) => l.id === editingId)?.lastClickAt
                      ? new Date(
                          links.find((l) => l.id === editingId)?.lastClickAt || ""
                        ).toLocaleString()
                      : "Never"}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between mt-6 pt-5 border-t border-slate-100">
              <button
                onClick={() => setDeleteConfirm(editingId)}
                className="border border-red-200 hover:bg-red-50 text-red-600 text-sm font-medium px-4 py-2 rounded-lg transition-colors"
              >
                Delete link
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setEditingId(null)}
                  className="border border-slate-200 hover:bg-slate-50 text-slate-700 text-sm font-medium px-4 py-2 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveEdit}
                  disabled={creating}
                  className="bg-rose-500 hover:bg-rose-600 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
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
        <div className="fixed inset-0 bg-black/30 backdrop-blur-[2px] z-40 flex items-center justify-center px-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 z-50 animate-in fade-in scale-95 duration-150 text-center py-8">
            <div className="text-4xl mb-3">⚠️</div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">
              Delete this link?
            </h3>
            <p className="text-sm text-slate-500 mb-6">
              <strong>
                shortcake.to/
                {links.find((l) => l.id === deleteConfirm)?.slug}
              </strong>{" "}
              will stop working immediately. This can&apos;t be undone.
            </p>
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="border border-slate-200 hover:bg-slate-50 text-slate-700 font-medium px-5 py-2.5 rounded-lg transition-colors"
              >
                Keep it
              </button>
              <button
                onClick={handleDelete}
                disabled={creating}
                className="bg-red-500 hover:bg-red-600 text-white font-semibold px-5 py-2.5 rounded-lg transition-colors disabled:opacity-50"
              >
                {creating ? "Deleting..." : "Yes, delete it"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Top Action Bar */}
      {!panelOpen && links.length > 0 && (
        <div className="fixed bottom-6 right-6 md:bottom-auto md:top-6 md:right-6 z-30">
          <button
            onClick={() => setPanelOpen(true)}
            className="bg-rose-500 hover:bg-rose-600 text-white font-semibold px-4 py-2.5 rounded-lg transition-colors flex items-center gap-1.5 shadow-lg"
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
