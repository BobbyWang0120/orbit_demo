import { Plane } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="border-b border-[var(--border-color)] bg-white sticky top-0 z-50">
      <div className="max-w-[1800px] mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2 cursor-pointer select-none">
          <Plane 
            className="w-8 h-8 text-primary-color" 
            strokeWidth={2} 
            style={{ transform: 'rotate(-45deg)' }}
          />
          <h1 className="text-primary-color text-[22px] tracking-tight font-bold">
            orbit
          </h1>
        </div>

        {/* Auth Buttons */}
        <div className="flex items-center gap-4">
          <button className="px-4 py-2 text-text-primary hover:bg-[var(--hover-color)] rounded-lg transition-colors text-sm font-medium">
            Log in
          </button>
          <button className="px-4 py-2 bg-primary-color text-white rounded-lg hover:opacity-90 transition-opacity text-sm font-medium">
            Sign up
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
