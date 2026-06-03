import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '../context/AuthContext';
import client from '../api/client';
import { Lock, Globe, User as UserIcon, ShieldAlert, CheckCircle, AlertTriangle } from 'lucide-react';

const fetchPublic = async () => {
  const { data } = await client.get('/public');
  return data;
};

const fetchUserContent = async () => {
  const { data } = await client.get('/user');
  return data;
};

const fetchAdminContent = async () => {
  const { data } = await client.get('/admin');
  return data;
};

export const Dashboard: React.FC = () => {
  const { user } = useAuth();

  const publicQuery = useQuery({
    queryKey: ['publicContent'],
    queryFn: fetchPublic
  });

  const userQuery = useQuery({
    queryKey: ['userContent'],
    queryFn: fetchUserContent,
    enabled: user?.role === 'USER' || user?.role === 'ADMIN'
  });

  const adminQuery = useQuery({
    queryKey: ['adminContent'],
    queryFn: fetchAdminContent,
    enabled: user?.role === 'ADMIN'
  });

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="glass-card rounded-3xl p-8 mb-10 border border-white/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500/10 rounded-full filter blur-2xl -z-10"></div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">Security Control Panel</h1>
        <p className="text-slate-400 mt-2">
          Logged in as <span className="text-white font-medium">{user?.name}</span> ({user?.email}) with role:{' '}
          <span className={`ml-2 px-2.5 py-0.5 rounded-full text-xs font-bold tracking-wide uppercase ${
            user?.role === 'ADMIN' 
              ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30' 
              : 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
          }`}>
            {user?.role}
          </span>
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Public Content Card */}
        <div className="glass-card rounded-2xl p-6 flex flex-col justify-between border border-white/5 shadow-lg relative overflow-hidden transition-all duration-300 hover:scale-[1.02]">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="bg-emerald-500/10 p-3 rounded-xl border border-emerald-500/20">
                <Globe className="h-6 w-6 text-emerald-400" />
              </div>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Public Area
              </span>
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Public Endpoint</h3>
            <p className="text-slate-400 text-sm mb-4">
              Endpoint: <code className="text-brand-300 bg-white/5 px-1.5 py-0.5 rounded">/api/public</code>
            </p>
            <div className="bg-white/5 rounded-xl p-4 border border-white/5 text-sm min-h-[80px] flex items-center">
              {publicQuery.isLoading ? (
                <div className="flex items-center space-x-2 text-slate-400">
                  <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-brand-500"></div>
                  <span>Fetching content...</span>
                </div>
              ) : publicQuery.isError ? (
                <span className="text-rose-400">Error fetching content.</span>
              ) : (
                <span className="text-slate-300 font-medium italic">"{publicQuery.data?.message}"</span>
              )}
            </div>
          </div>
          <div className="mt-6 pt-4 border-t border-white/5 flex items-center text-xs text-emerald-400 font-medium">
            <CheckCircle className="h-4 w-4 mr-1.5" />
            <span>Unrestricted Access Granted</span>
          </div>
        </div>

        {/* User Content Card */}
        <div className="glass-card-user rounded-2xl p-6 flex flex-col justify-between shadow-lg relative overflow-hidden transition-all duration-300 hover:scale-[1.02]">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="bg-blue-500/10 p-3 rounded-xl border border-blue-500/20">
                <UserIcon className="h-6 w-6 text-blue-400" />
              </div>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                User Area
              </span>
            </div>
            <h3 className="text-lg font-bold text-white mb-2">User-Level Endpoint</h3>
            <p className="text-slate-400 text-sm mb-4">
              Endpoint: <code className="text-brand-300 bg-white/5 px-1.5 py-0.5 rounded">/api/user</code>
            </p>
            <div className="bg-white/5 rounded-xl p-4 border border-white/5 text-sm min-h-[80px] flex items-center">
              {userQuery.isLoading ? (
                <div className="flex items-center space-x-2 text-slate-400">
                  <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-brand-500"></div>
                  <span>Fetching content...</span>
                </div>
              ) : userQuery.isError ? (
                <span className="text-rose-400">Access Denied (403 Forbidden).</span>
              ) : (
                <span className="text-slate-300 font-medium italic">"{userQuery.data?.message}"</span>
              )}
            </div>
          </div>
          <div className="mt-6 pt-4 border-t border-white/5 flex items-center text-xs text-blue-400 font-medium">
            <CheckCircle className="h-4 w-4 mr-1.5" />
            <span>Authorized for USER & ADMIN</span>
          </div>
        </div>

        {/* Admin Content Card */}
        {user?.role === 'ADMIN' ? (
          <div className="glass-card-admin rounded-2xl p-6 flex flex-col justify-between shadow-lg relative overflow-hidden transition-all duration-300 hover:scale-[1.02]">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="bg-purple-500/10 p-3 rounded-xl border border-purple-500/20">
                  <ShieldAlert className="h-6 w-6 text-purple-400" />
                </div>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20">
                  Admin Area
                </span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Admin-Level Endpoint</h3>
              <p className="text-slate-400 text-sm mb-4">
                Endpoint: <code className="text-brand-300 bg-white/5 px-1.5 py-0.5 rounded">/api/admin</code>
              </p>
              <div className="bg-white/5 rounded-xl p-4 border border-white/5 text-sm min-h-[80px] flex items-center">
                {adminQuery.isLoading ? (
                  <div className="flex items-center space-x-2 text-slate-400">
                    <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-brand-500"></div>
                    <span>Fetching content...</span>
                  </div>
                ) : adminQuery.isError ? (
                  <span className="text-rose-400">Access Denied (403 Forbidden).</span>
                ) : (
                  <span className="text-slate-300 font-medium italic">"{adminQuery.data?.message}"</span>
                )}
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-white/5 flex items-center text-xs text-purple-400 font-medium">
              <CheckCircle className="h-4 w-4 mr-1.5" />
              <span>Full Admin Access Unlocked</span>
            </div>
          </div>
        ) : (
          <div className="glass-card rounded-2xl p-6 flex flex-col justify-between border border-white/5 opacity-55 shadow-lg relative overflow-hidden">
            <div className="absolute inset-0 bg-slate-950/20 backdrop-blur-[1px] flex flex-col items-center justify-center pointer-events-none">
              <Lock className="h-10 w-10 text-purple-400/70 mb-2" />
              <span className="text-xs font-bold uppercase tracking-wider text-purple-300 bg-purple-950/50 px-2.5 py-1 rounded-full border border-purple-500/20">
                ADMIN ROLE REQUIRED
              </span>
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="bg-slate-800 p-3 rounded-xl">
                  <Lock className="h-6 w-6 text-slate-400" />
                </div>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-slate-800 text-slate-400">
                  Restricted
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-400 mb-2">Admin-Level Endpoint</h3>
              <p className="text-slate-500 text-sm mb-4">
                Endpoint: <code className="text-slate-500 bg-white/5 px-1.5 py-0.5 rounded">/api/admin</code>
              </p>
              <div className="bg-white/5 rounded-xl p-4 border border-white/5 text-sm min-h-[80px]"></div>
            </div>
            <div className="mt-6 pt-4 border-t border-white/5 flex items-center text-xs text-slate-500 font-medium">
              <AlertTriangle className="h-4 w-4 mr-1.5 text-rose-500/70" />
              <span>Access Denied for USER Role</span>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default Dashboard;
