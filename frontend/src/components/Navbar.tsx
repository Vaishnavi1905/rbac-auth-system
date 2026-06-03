import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Shield, LogOut, User as UserIcon } from 'lucide-react';

const Navbar: React.FC = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="glass-card sticky top-0 z-50 px-6 py-4 flex items-center justify-between border-b border-white/5 backdrop-blur-md">
      <Link to="/" className="flex items-center space-x-2 text-xl font-bold tracking-tight text-white hover:text-brand-300 transition">
        <Shield className="h-6 w-6 text-brand-400" />
        <span>RBAC <span className="text-brand-400">Vault</span></span>
      </Link>

      <div className="flex items-center space-x-4">
        {isAuthenticated && user ? (
          <>
            <div className="hidden md:flex items-center space-x-3 bg-white/5 rounded-full py-1.5 px-3.5 border border-white/10">
              <UserIcon className="h-4 w-4 text-brand-300" />
              <span className="text-sm font-medium text-slate-200">{user.name}</span>
              <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full ${
                user.role === 'ADMIN' 
                  ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30' 
                  : 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
              }`}>
                {user.role}
              </span>
            </div>
            
            <button
              onClick={handleLogout}
              className="flex items-center space-x-1.5 text-slate-300 hover:text-rose-400 text-sm font-medium transition py-2 px-3 rounded-lg hover:bg-rose-500/10 hover:border-rose-500/20 border border-transparent"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </>
        ) : (
          <div className="flex items-center space-x-3">
            <Link 
              to="/login" 
              className="text-slate-300 hover:text-white text-sm font-medium transition py-2 px-3"
            >
              Login
            </Link>
            <Link 
              to="/register" 
              className="glow-btn-brand text-white text-sm font-semibold py-2 px-4 rounded-lg transition"
            >
              Register
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
