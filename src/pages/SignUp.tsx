
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthForm from '@/components/AuthForm';
import Navbar from '@/components/Navbar';
import AnimatedContainer from '@/components/AnimatedContainer';
import { ArrowLeft } from 'lucide-react';

const SignUp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();
  const navigate = useNavigate();

  const handleSubmit = (data: { email: string; password: string; name?: string }) => {
    setIsLoading(true);
    setError(undefined);
    
    // Simulate account creation (in a real app, this would call an API)
    setTimeout(() => {
      console.log('Sign up:', data);
      
      // Mock successful registration
      // In a real app, this would create the user and set auth state
      setIsLoading(false);
      
      // Store user in session storage for demo purposes
      const user = {
        id: '1',
        name: data.name || 'New User',
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
            type="signup" 
            onSubmit={handleSubmit} 
            isLoading={isLoading} 
            error={error} 
          />
        </AnimatedContainer>
      </div>
    </div>
  );
};

export default SignUp;
