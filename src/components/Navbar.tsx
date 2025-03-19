
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Menu, X, User, LogOut, Settings, BriefcaseBusiness } from 'lucide-react';
import AnimatedContainer from './AnimatedContainer';

interface NavbarProps {
  user?: { name: string; email: string; avatar?: string } | null;
  onLogout?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ user, onLogout }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-background/80 backdrop-blur-lg shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="page-container">
        <nav className="flex items-center justify-between h-16">
          <AnimatedContainer animation="slide-down" className="flex items-center gap-2">
            <BriefcaseBusiness className="w-8 h-8 text-primary" />
            <Link to="/" className="text-xl font-display font-semibold">
              JobPortal
            </Link>
          </AnimatedContainer>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <AnimatedContainer animation="slide-down" delay={100} className="flex items-center gap-6">
              <Link to="/dashboard" className="text-sm font-medium hover:text-primary transition-colors">
                Browse Jobs
              </Link>
              <Link to="/dashboard/applications" className="text-sm font-medium hover:text-primary transition-colors">
                My Applications
              </Link>
              <Link to="/about" className="text-sm font-medium hover:text-primary transition-colors">
                About
              </Link>
            </AnimatedContainer>

            {user ? (
              <AnimatedContainer animation="slide-down" delay={200}>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 rounded-full p-0">
                      <Avatar className="h-8 w-8 border border-border">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback className="bg-primary/10 text-primary">
                          {user.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="glass-card">
                    <DropdownMenuLabel>
                      <div className="font-normal text-sm">{user.name}</div>
                      <div className="text-xs text-muted-foreground">{user.email}</div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={onLogout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Logout</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </AnimatedContainer>
            ) : (
              <AnimatedContainer animation="slide-down" delay={200} className="flex items-center gap-3">
                <Link to="/signin">
                  <Button variant="ghost" className="px-4">
                    Sign In
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button className="px-4 button-effect">
                    Sign Up
                  </Button>
                </Link>
              </AnimatedContainer>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </nav>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <AnimatedContainer animation="fade" className="md:hidden pt-2 pb-4">
            <div className="flex flex-col space-y-3">
              <Link 
                to="/dashboard" 
                className="text-sm font-medium px-3 py-2 rounded-md hover:bg-secondary transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Browse Jobs
              </Link>
              <Link 
                to="/dashboard/applications" 
                className="text-sm font-medium px-3 py-2 rounded-md hover:bg-secondary transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                My Applications
              </Link>
              <Link 
                to="/about" 
                className="text-sm font-medium px-3 py-2 rounded-md hover:bg-secondary transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
              
              {user ? (
                <div className="pt-2">
                  <div className="flex items-center px-3 py-2">
                    <Avatar className="h-8 w-8 mr-3 border border-border">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {user.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium text-sm">{user.name}</div>
                      <div className="text-xs text-muted-foreground">{user.email}</div>
                    </div>
                  </div>
                  <div className="pt-2 space-y-1">
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start text-sm"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </Button>
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start text-sm"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </Button>
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start text-sm text-destructive hover:text-destructive"
                      onClick={() => {
                        if (onLogout) onLogout();
                        setMobileMenuOpen(false);
                      }}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Logout</span>
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col space-y-2 pt-2">
                  <Link to="/signin" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="outline" className="w-full">
                      Sign In
                    </Button>
                  </Link>
                  <Link to="/signup" onClick={() => setMobileMenuOpen(false)}>
                    <Button className="w-full button-effect">
                      Sign Up
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </AnimatedContainer>
        )}
      </div>
    </header>
  );
};

export default Navbar;
