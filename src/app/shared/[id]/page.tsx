'use client';

import { useState, useEffect, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { CheckCircle2, AlertCircle, ArrowLeft, Eye, Edit3, Lock, Share2 } from 'lucide-react';

interface Task {
  todo_id: string;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
  user?: {
    user_id: string;
    email?: string;
    full_name?: string;
  };
}

interface SharedData {
  shared_id: string;
  access_type: 'public' | 'private';
  permission: 'view' | 'edit' | 'comment';
  task: Task;
}

const SharedTaskPage = () => {
  const params = useParams();
  const router = useRouter();
  const shareId = params.id as string;

  const [data, setData] = useState<SharedData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copySuccess, setCopySuccess] = useState(false);

  const fetchSharedTask = useCallback(async () => {
    if (!shareId) return;

    try {
      setLoading(true);

      const token = localStorage.getItem('token');
      const headers: HeadersInit = { 'Content-Type': 'application/json' };
      if (token) headers['Authorization'] = `Bearer ${token}`;

      const response = await fetch(`/api/shared/${shareId}`, { method: 'GET', headers });
      if (!response.ok) {
        if (response.status === 404) setError('Task tidak ditemukan atau sudah tidak dibagikan');
        else if (response.status === 403) setError('Anda tidak memiliki akses ke task ini');
        else if (response.status === 401) setError('Silakan login untuk mengakses task ini');
        else setError('Gagal memuat task');
        return;
      }

      const result = await response.json();
      setData(result);
    } catch (err) {
      console.error('Error fetching shared task:', err);
      setError('Terjadi kesalahan saat memuat task');
    } finally {
      setLoading(false);
    }
  }, [shareId]);

  useEffect(() => { fetchSharedTask(); }, [fetchSharedTask]);

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
    });

  const getPermissionIcon = (permission: string) => {
    switch (permission) {
      case 'edit': return <Edit3 className="w-4 h-4" />;
      case 'view': return <Eye className="w-4 h-4" />;
      case 'comment': return <Lock className="w-4 h-4" />;
      default: return <Eye className="w-4 h-4" />;
    }
  };

  const getPermissionText = (permission: string) => {
    switch (permission) {
      case 'edit': return 'Dapat Edit';
      case 'view': return 'Dapat Lihat';
      case 'comment': return 'Dapat Comment';
      default: return 'Dapat Lihat';
    }
  };

  const copyShareUrl = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
      alert('Gagal menyalin link. Salin manual dari address bar.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Memuat task...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-100 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Oops!</h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <div className="space-y-3">
            <button
              onClick={() => router.push('/')}
              className="w-full inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" /> Kembali ke Beranda
            </button>
            {error === 'Silakan login untuk mengakses task ini' && (
              <button
                onClick={() => router.push('/auth/login')}
                className="w-full inline-flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Login
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="max-w-4xl mx-auto py-8 px-4">
        {/* Header */}
        <div className="mb-8 flex flex-wrap items-center justify-between">
          <button
            onClick={() => router.push('/')}
            className="inline-flex items-center text-teal-600 hover:text-teal-700 mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-1" /> Kembali ke Beranda
          </button>

          <button
            onClick={copyShareUrl}
            className="inline-flex items-center px-4 py-2 bg-teal-700 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Share2 className="w-4 h-4 mr-2" /> {copySuccess ? 'Berhasil Disalin!' : 'Copy Link'}
          </button>
        </div>

        {/* Task Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
          {/* Task Header */}
          <div className="p-8 border-b border-gray-100">
            <div className="flex items-start gap-4">
              <div className="p-2 bg-blue-50 rounded-lg">
                <CheckCircle2 className="w-6 h-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-900 mb-3">{data.task.title || 'Task tidak tersedia'}</h2>
                {data.task.content && (
                  <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">{data.task.content}</div>
                )}
              </div>
            </div>
          </div>

          {/* Task Details */}
          <div className="p-8 bg-gray-50">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900 text-lg mb-4">Informasi Task</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-gray-200">
                    <span className="text-gray-600 font-medium">Task ID:</span>
                    <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">{data.task.todo_id}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-200">
                    <span className="text-gray-600 font-medium">Dibuat:</span>
                    <span className="text-gray-900">{formatDate(data.task.created_at)}</span>
                  </div>
                  {data.task.updated_at !== data.task.created_at && (
                    <div className="flex justify-between items-center py-2 border-b border-gray-200">
                      <span className="text-gray-600 font-medium">Terakhir Update:</span>
                      <span className="text-gray-900">{formatDate(data.task.updated_at)}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900 text-lg mb-4">Sharing Info</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-gray-200">
                    <span className="text-gray-600 font-medium">Dibagikan Oleh:</span>
                    <span className="text-gray-900">{data.task.user?.full_name || data.task.user?.email || 'Unknown'}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-200">
                    <span className="text-gray-600 font-medium">Tipe Akses:</span>
                    <span className="text-gray-900 capitalize">{data.access_type}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-200">
                    <span className="text-gray-600 font-medium">Permission:</span>
                    <span className="text-gray-900">{getPermissionText(data.permission)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-8 text-center p-6 bg-gradient-to-r from-teal-600 to-teal-800 rounded-2xl text-white">
          <h3 className="text-xl font-bold mb-2">Ingin membuat todo list sendiri?</h3>
          <p className="text-blue-100 mb-4">Mulai organisir tugas Anda dengan mudah!</p>
          <button
            onClick={() => router.push('/')}
            className="inline-flex items-center px-6 py-3 bg-white text-teal-600 rounded-lg hover:bg-blue-50 transition-colors font-semibold"
          >
            Mulai Sekarang
          </button>
        </div>
      </div>
    </div>
  );
};

export default SharedTaskPage;
