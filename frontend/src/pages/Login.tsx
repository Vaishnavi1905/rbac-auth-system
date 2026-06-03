import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import client from '../api/client';
import { Shield, Key, Mail, AlertCircle, Loader } from 'lucide-react';

export const Login: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const onSubmit = async (data: any) => {
    setLoading(true);
    setError(null);
    try {
      const response = await client.post('/auth/login', data);
      const { token, user } = response.data;
      login(token, user);
      navigate('/');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Invalid email or password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center p-4">
      <div className="glass-card w-full max-w-md rounded-2xl p-8 shadow-2xl relative overflow-hidden">
        {/* Decorative ambient light */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-brand-500/20 rounded-full filter blur-xl"></div>
        
        <div className="flex flex-col items-center mb-8">
          <div className="bg-brand-500/10 p-3 rounded-xl border border-brand-500/20 mb-3">
            <Shield className="h-8 w-8 text-brand-400" />
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Welcome Back</h2>
          <p className="text-slate-400 text-sm mt-1">Sign in to your secure account</p>
        </div>

        {error && (
          <div className="flex items-center space-x-2 bg-rose-500/10 border border-rose-500/20 text-rose-300 p-3 rounded-xl mb-6 text-sm">
            <AlertCircle className="h-5 w-5 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
              Email Address
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                <Mail className="h-5 w-5" />
              </span>
              <input
                type="email"
                placeholder="you@example.com"
                className="glass-input w-full pl-10 pr-4 py-3 rounded-xl text-sm"
                {...register('email', { 
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address'
                  }
                })}
              />
            </div>
            {errors.email && (
              <p className="text-rose-400 text-xs mt-1.5">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
              Password
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                <Key className="h-5 w-5" />
              </span>
              <input
                type="password"
                placeholder="••••••••"
                className="glass-input w-full pl-10 pr-4 py-3 rounded-xl text-sm"
                {...register('password', { required: 'Password is required' })}
              />
            </div>
            {errors.password && (
              <p className="text-rose-400 text-xs mt-1.5">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="glow-btn-brand w-full py-3 rounded-xl text-sm font-semibold text-white flex items-center justify-center space-x-2 transition cursor-pointer"
          >
            {loading ? (
              <Loader className="h-5 w-5 animate-spin" />
            ) : (
              <span>Sign In</span>
            )}
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-slate-400">
          Don't have an account?{' '}
          <Link to="/register" className="text-brand-400 hover:text-brand-300 font-medium transition">
            Create an account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
