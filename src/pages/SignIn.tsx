
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthForm from '@/components/AuthForm';
import Navbar from '@/components/Navbar';
import AnimatedContainer from '@/components/AnimatedContainer';
import { ArrowLeft } from 'lucide-react';

const SignIn = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();
  const navigate = useNavigate();

  const handleSubmit = (data: { email: string; password: string }) => {
    setIsLoading(true);
    setError(undefined);
    
    // Simulate authentication (in a real app, this would call an API)
    setTimeout(() => {
      // For demo purposes, we'll just accept any login
      console.log('Sign in:', data);
      
      // Mock successful login
      // In a real app, this would verify credentials and set auth state
      setIsLoading(false);
      
      // Store user in session storage for demo purposes
      const user = {
        id: '1',
        name: 'Demo User',
        email: data.email,
        avatar: '',
      };
      sessionStorage.setItem('user', JSON.stringify(user));
      
      // Redirect to dashboard
      navigate('/dashboard');
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex flex-col justify-center items-center flex-1 px-4 py-12">
        <AnimatedContainer animation="fade" className="w-full max-w-md mb-8">
          <Link to="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to home
          </Link>
        </AnimatedContainer>
        
        <AnimatedContainer animation="scale">
          <AuthForm 
            type="signin" 
            onSubmit={handleSubmit} 
            isLoading={isLoading} 
            error={error} 
          />
        </AnimatedContainer>
      </div>
    </div>
  );
};

export default SignIn;
