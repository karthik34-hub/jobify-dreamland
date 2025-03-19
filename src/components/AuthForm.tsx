
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AuthFormProps {
  type: 'signin' | 'signup';
  onSubmit: (data: { email: string; password: string; name?: string }) => void;
  isLoading?: boolean;
  error?: string;
  className?: string;
}

const AuthForm: React.FC<AuthFormProps> = ({ 
  type, 
  onSubmit, 
  isLoading = false, 
  error,
  className 
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = type === 'signup' 
      ? { email, password, name } 
      : { email, password };
    onSubmit(data);
  };

  const handleGoogleSignIn = () => {
    // In a real implementation, this would initiate Google OAuth
    console.log('Google sign in clicked');
  };

  return (
    <Card className={cn("w-full max-w-md glass-card border-border/50", className)}>
      <CardHeader>
        <CardTitle>{type === 'signin' ? 'Sign In' : 'Create Account'}</CardTitle>
        <CardDescription>
          {type === 'signin' 
            ? 'Enter your credentials to access your account' 
            : 'Enter your information to create an account'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {type === 'signup' && (
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-background border-input focus-visible:ring-1 focus-visible:ring-primary/50"
                required
                autoComplete="name"
              />
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-background border-input focus-visible:ring-1 focus-visible:ring-primary/50"
              required
              autoComplete={type === 'signin' ? 'username' : 'email'}
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              {type === 'signin' && (
                <a href="#" className="text-xs text-primary hover:underline">
                  Forgot password?
                </a>
              )}
            </div>
            <Input
              id="password"
              type="password"
              placeholder={type === 'signin' ? '••••••••' : 'Create a password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-background border-input focus-visible:ring-1 focus-visible:ring-primary/50"
              required
              autoComplete={type === 'signin' ? 'current-password' : 'new-password'}
            />
          </div>

          {error && (
            <Alert variant="destructive" className="bg-destructive/5 text-destructive border-destructive/20">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Button 
            type="submit" 
            className="w-full button-effect" 
            disabled={isLoading}
          >
            {isLoading 
              ? (type === 'signin' ? 'Signing in...' : 'Creating account...') 
              : (type === 'signin' ? 'Sign In' : 'Create Account')}
          </Button>
        </form>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <Separator />
          </div>
          <div className="relative flex justify-center">
            <span className="bg-card px-2 text-xs text-muted-foreground">
              OR CONTINUE WITH
            </span>
          </div>
        </div>

        <Button 
          variant="outline" 
          className="w-full bg-background border-input hover:bg-muted"
          type="button"
          onClick={handleGoogleSignIn}
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5 mr-2" aria-hidden="true">
            <path
              d="M12.0003 4.75C13.7703 4.75 15.3553 5.36002 16.6053 6.54998L20.0303 3.125C17.9502 1.19 15.2353 0 12.0003 0C7.31028 0 3.25527 2.69 1.28027 6.60998L5.27028 9.70498C6.21525 6.86002 8.87028 4.75 12.0003 4.75Z"
              fill="#EA4335"
            />
            <path
              d="M23.49 12.275C23.49 11.49 23.415 10.73 23.3 10H12V14.51H18.47C18.18 15.99 17.34 17.25 16.08 18.1L19.945 21.1C22.2 19.01 23.49 15.92 23.49 12.275Z"
              fill="#4285F4"
            />
            <path
              d="M5.26498 14.2949C5.02498 13.5699 4.88501 12.7999 4.88501 11.9999C4.88501 11.1999 5.01998 10.4299 5.26498 9.7049L1.275 6.60986C0.46 8.22986 0 10.0599 0 11.9999C0 13.9399 0.46 15.7699 1.28 17.3899L5.26498 14.2949Z"
              fill="#FBBC05"
            />
            <path
              d="M12.0004 24C15.2404 24 17.9654 22.935 19.9454 21.095L16.0804 18.095C15.0054 18.82 13.6204 19.25 12.0004 19.25C8.8704 19.25 6.21537 17.14 5.2654 14.295L1.27539 17.39C3.25539 21.31 7.3104 24 12.0004 24Z"
              fill="#34A853"
            />
          </svg>
          <span>Google</span>
        </Button>
      </CardContent>
      <CardFooter className="flex justify-center">
        <p className="text-sm text-muted-foreground">
          {type === 'signin' ? "Don't have an account? " : "Already have an account? "}
          <a 
            href={type === 'signin' ? '/signup' : '/signin'} 
            className="text-primary hover:underline"
          >
            {type === 'signin' ? 'Sign up' : 'Sign in'}
          </a>
        </p>
      </CardFooter>
    </Card>
  );
};

export default AuthForm;
