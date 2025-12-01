import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { Menu, User, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "@/redux/slices/userAuthSlice";
import type { AppDispatch, RootState } from "@/redux/store";
import { toast } from "sonner";

const Navbar = () => {
   const dispatch = useDispatch<AppDispatch>();
  const { isAuthenticated, accessToken, user } = useSelector(
    (state: RootState) => state.userAuth
  );

  useEffect(() => {
    if (!accessToken) {
      dispatch(logoutUser());
    }
  }, []);

 

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-background border-b shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="text-2xl font-bold">
          <span className="text-orange">Article Feed</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">

          {/* Always show home */}
          <Link to="/" className="hover:text-orange transition">
            Home
          </Link>

          {/* Show only when authenticated */}
          {isAuthenticated && (
            <>
              <Link to="/blog" className="hover:text-orange transition">
                Blog
              </Link>

              <Link to="/account/my-blogs" className="hover:text-orange transition">
                My Blogs
              </Link>

              <Link to="/profile" className="hover:text-orange transition">
                Profile
              </Link>
            </>
          )}
        </nav>

        {/* Right Side */}
        <div className="flex items-center space-x-4">

          {/* If authenticated → show profile icon + logout */}
          {isAuthenticated ? (
            <div className="relative group hidden sm:flex">
              <div className="flex items-center space-x-2 cursor-pointer">
                <User className="w-5 h-5 text-orange" />
                <span>{user?.firstName}</span>
              </div>

              {/* Dropdown */}
              <div className="absolute right-0 top-full mt-2 w-44 bg-white rounded-md border shadow-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                <Link
                  to="/profile"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  My Profile
                </Link>

                <button
                  onClick={() => {
                    dispatch(logoutUser());
                    toast.success("Logged out");
                  }}
                  className="w-full text-left px-4 py-2 text-red-500 hover:bg-red-100"
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            // Guest → Login + Signup
            <div className="hidden sm:flex space-x-3">
              <Link to="/login">
                <Button
                  variant="outline"
                  className="border-orange text-orange hover:bg-orange hover:text-white"
                >
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-orange text-white hover:bg-orange-dark">
                  Sign Up
                </Button>
              </Link>
            </div>
          )}

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-3">

          {/* Home always shown */}
          <Link
            to="/"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block hover:text-orange"
          >
            Home
          </Link>

          {isAuthenticated ? (
            <>
              <Link
                to="/blog"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block hover:text-orange"
              >
                Blog
              </Link>

              <Link
                to="/account/my-blogs"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block hover:text-orange"
              >
                My Blogs
              </Link>

              <Link
                to="/profile"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block hover:text-orange"
              >
                Profile
              </Link>

              <button
                onClick={() => {
                  dispatch(logoutUser());
                  toast.success("Logged out");
                  setIsMobileMenuOpen(false);
                }}
                className="block text-red-500 font-semibold"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-orange font-semibold"
              >
                Login
              </Link>
              <Link
                to="/signup"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-orange font-semibold"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;

// import { useEffect, useState } from 'react';
// import { Button } from '../ui/button';
// import { Link } from 'react-router-dom';
// import { Menu, User, X, Bell, MessageCircle } from 'lucide-react';
// import { useDispatch, useSelector } from 'react-redux';
// import { logoutUser } from '@/redux/slices/userAuthSlice';
// import type { AppDispatch, RootState } from '@/redux/store';
// import { toast } from 'sonner';
//    const Navbar = () => {
//   const dispatch = useDispatch<AppDispatch>();

//   const { isAuthenticated, accessToken, user } = useSelector(
//     (state: RootState) => state.userAuth
//   );

  
// useEffect(() => {
//     if (!accessToken) {
//       dispatch(logoutUser());
//     }
//   }, []);

//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
 
//   return (
//     <header className="bg-background shadow-sm border-b sticky top-0 z-50">
//       <div className="container mx-auto px-4 py-4">
//         <div className="flex items-center justify-between">
//           {/* Left - Logo & Links */}
//           <div className="flex items-center space-x-8">
//             <Link to="/" className="text-2xl font-bold">
//               <span className="text-orange">Article Feed</span>
//             </Link>

//             <nav className="hidden md:flex items-center space-x-8">
//               <Link to="/" className="text-foreground hover:text-orange transition-colors">
//                 Home
//               </Link>
//                   <Link to="/Profile" className="text-foreground hover:text-orange transition-colors">
//                 Profile
//               </Link>

//                <Link to="/blog" className="text-foreground hover:text-orange transition-colors">
//                 Blog
//               </Link>
//                   <Link to="/account/my-blogs" className="text-foreground hover:text-orange transition-colors">
//                 my-blogs
//               </Link>
//             </nav>
//           </div>

//           {/* Right - Icons & Auth */}
//           <div className="flex items-center space-x-4">


//             {isAuthenticated ? (
//               <div className="relative hidden sm:flex items-center group">
//                 {/* Profile Dropdown */}
                 

//                 <div className="absolute top-full right-0 mt-2 w-44 bg-white shadow-md rounded-md border opacity-0 group-hover:opacity-100 group-hover:visible invisible transition-all duration-200 z-50">
//                   <Link
//                     to="/profile"
//                     className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                   >
//                     My Profile
//                   </Link>
                 
//                   <button
//                     onClick={() => {
//                       dispatch(logoutUser());
//                       toast.success('Logout successful');
//                     }}
//                     className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-100"
//                   >
//                     Logout
//                   </button>
//                 </div>
//               </div>
//             ) : (
//               <>
//                 <Link to="/login">
//                   <Button
//                     variant="outline"
//                     className="border-orange text-orange hover:bg-orange hover:text-white hidden sm:flex"
//                   >
//                     <User className="w-4 h-4 mr-2" />
//                     Login
//                   </Button>
//                 </Link>
//                 <Link to="/signup">
//                   <Button className="bg-orange hover:bg-orange-dark text-white hidden sm:flex">
//                     Sign Up
//                   </Button>
//                 </Link>
//               </>
//             )}

//             {/* Mobile Menu Button */}
//             <Button
//               variant="ghost"
//               size="icon"
//               className="md:hidden"
//               onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//             >
//               {isMobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
//             </Button>
//           </div>
//         </div>

//         {/* Mobile Dropdown */}
//         {isMobileMenuOpen && (
//           <div className="md:hidden mt-4 space-y-4">
//             <Link
//               to="/"
//               className="block text-foreground hover:text-orange"
//               onClick={() => setIsMobileMenuOpen(false)}
//             >
//               Home
//             </Link>
            
             
            
            
            
//             <Link
//               to="/profile"
//               className="block text-foreground hover:text-orange"
//               onClick={() => setIsMobileMenuOpen(false)}
//             >
//               Account
//             </Link>
//             {isAuthenticated ? (
//               <button
//                 onClick={() => {
//                   dispatch(logoutUser());
//                   toast.success('Logout successful');
//                   setIsMobileMenuOpen(false);
//                 }}
//                 className="block text-red-500 font-semibold"
//               >
//                 Logout
//               </button>
//             ) : (
//               <>
//                 <Link
//                   to="/login"
//                   className="block text-orange font-semibold"
//                   onClick={() => setIsMobileMenuOpen(false)}
//                 >
//                   Login
//                 </Link>
//                 <Link
//                   to="/signup"
//                   className="block text-orange font-semibold"
//                   onClick={() => setIsMobileMenuOpen(false)}
//                 >
//                   Sign Up
//                 </Link>
//               </>
//             )}
//           </div>
//         )}
//       </div>
//     </header>
//   );
// };

// export default Navbar;
