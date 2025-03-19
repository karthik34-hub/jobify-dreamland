
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Navbar from '@/components/Navbar';
import SearchBar from '@/components/SearchBar';
import AnimatedContainer from '@/components/AnimatedContainer';
import { ArrowRight, Briefcase, Globe, Building, Clock, Award, Shield, CheckCircle } from 'lucide-react';

const Index = () => {
  const handleSearch = (query: string, location: string) => {
    console.log('Search:', { query, location });
    // In a real app, this would navigate to the search results
    window.location.href = `/dashboard?query=${encodeURIComponent(query)}&location=${encodeURIComponent(location)}`;
  };

  const featuredCompanies = [
    { name: 'Google', logo: 'https://cdn.worldvectorlogo.com/logos/google-icon.svg' },
    { name: 'Apple', logo: 'https://cdn.worldvectorlogo.com/logos/apple-14.svg' },
    { name: 'Microsoft', logo: 'https://cdn.worldvectorlogo.com/logos/microsoft-icon-1.svg' },
    { name: 'Amazon', logo: 'https://cdn.worldvectorlogo.com/logos/amazon-icon-1.svg' },
    { name: 'Meta', logo: 'https://companieslogo.com/img/orig/META-4767da84.png?t=1654568366' },
    { name: 'Netflix', logo: 'https://cdn.worldvectorlogo.com/logos/netflix-4.svg' }
  ];

  const jobCategories = [
    { icon: <Briefcase size={18} />, name: 'Technology', count: 1203 },
    { icon: <Building size={18} />, name: 'Finance', count: 896 },
    { icon: <Clock size={18} />, name: 'Marketing', count: 743 },
    { icon: <Globe size={18} />, name: 'Remote', count: 1568 },
    { icon: <Shield size={18} />, name: 'Healthcare', count: 652 },
    { icon: <Award size={18} />, name: 'Design', count: 417 }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-28 pb-20 px-4 sm:px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-indigo-50/30 -z-10" />
        <div 
          className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-6xl -z-10 opacity-10 blur-3xl" 
          style={{ 
            background: 'radial-gradient(circle at center, rgba(59, 130, 246, 0.5) 0%, rgba(255, 255, 255, 0) 70%)' 
          }} 
        />
        
        <div className="max-w-5xl mx-auto text-center">
          <AnimatedContainer animation="fade" className="mb-2">
            <Badge variant="outline" className="mb-4 bg-blue-50/70 text-blue-600 border-blue-200">
              Thousands of opportunities, one platform
            </Badge>
          </AnimatedContainer>
          
          <AnimatedContainer animation="slide-up" className="mb-6">
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-6 leading-tight md:leading-tight text-balance">
              Discover Your <span className="text-primary">Dream Career</span> Today
            </h1>
          </AnimatedContainer>
          
          <AnimatedContainer animation="slide-up" delay={100} className="mb-10">
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Connect with top employers and find the perfect job that matches your skills and passion. Your next career move is just a click away.
            </p>
          </AnimatedContainer>
          
          <AnimatedContainer animation="slide-up" delay={200} className="mb-12">
            <div className="max-w-4xl mx-auto">
              <SearchBar onSearch={handleSearch} expanded />
            </div>
          </AnimatedContainer>

          <AnimatedContainer animation="fade" delay={300} className="text-sm text-muted-foreground">
            <p>Popular searches: <span className="font-medium">Software Engineer</span>, <span className="font-medium">Product Manager</span>, <span className="font-medium">Data Scientist</span>, <span className="font-medium">UX Designer</span></p>
          </AnimatedContainer>
        </div>
      </section>

      {/* Featured Companies */}
      <section className="py-16 bg-background relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <AnimatedContainer animation="slide-up" className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-display font-semibold mb-4">Trusted by Leading Companies</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Join thousands of companies hiring top talent from our platform
            </p>
          </AnimatedContainer>

          <AnimatedContainer animation="fade" delay={100}>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-8 items-center justify-items-center">
              {featuredCompanies.map((company, index) => (
                <div 
                  key={index} 
                  className="h-12 w-24 flex items-center justify-center filter grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                >
                  <img 
                    src={company.logo} 
                    alt={company.name} 
                    className="max-h-10 max-w-full object-contain" 
                  />
                </div>
              ))}
            </div>
          </AnimatedContainer>
        </div>
      </section>

      {/* Job Categories */}
      <section className="py-16 bg-secondary/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <AnimatedContainer animation="slide-up" className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-display font-semibold mb-4">Explore Job Categories</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Find opportunities in various industries and disciplines
            </p>
          </AnimatedContainer>

          <AnimatedContainer animation="fade" delay={100}>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {jobCategories.map((category, index) => (
                <Link 
                  to="/dashboard" 
                  key={index} 
                  className="glass-card hover-lift p-5 rounded-lg flex flex-col"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="h-8 w-8 rounded-md bg-primary/10 flex items-center justify-center text-primary">
                      {category.icon}
                    </div>
                    <h3 className="font-medium">{category.name}</h3>
                  </div>
                  <div className="flex items-center justify-between mt-auto">
                    <Badge variant="secondary" className="bg-secondary/80 text-xs">
                      {category.count} jobs
                    </Badge>
                    <ArrowRight className="h-4 w-4 text-muted-foreground" />
                  </div>
                </Link>
              ))}
            </div>
          </AnimatedContainer>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <AnimatedContainer animation="slide-up" className="text-center mb-16">
            <h2 className="text-2xl md:text-3xl font-display font-semibold mb-4">Why Job Seekers Choose Us</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our platform offers everything you need to find your perfect role
            </p>
          </AnimatedContainer>

          <div className="grid md:grid-cols-3 gap-8">
            <AnimatedContainer animation="scale" delay={100} className="glass-card p-6 rounded-lg">
              <div className="h-12 w-12 rounded-md bg-green-50 text-green-600 flex items-center justify-center mb-4">
                <CheckCircle size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Easy Applications</h3>
              <p className="text-muted-foreground">
                Apply to multiple jobs with just a few clicks and track your applications in one place.
              </p>
            </AnimatedContainer>

            <AnimatedContainer animation="scale" delay={200} className="glass-card p-6 rounded-lg">
              <div className="h-12 w-12 rounded-md bg-purple-50 text-purple-600 flex items-center justify-center mb-4">
                <Globe size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Remote Opportunities</h3>
              <p className="text-muted-foreground">
                Find flexible remote positions that allow you to work from anywhere in the world.
              </p>
            </AnimatedContainer>

            <AnimatedContainer animation="scale" delay={300} className="glass-card p-6 rounded-lg">
              <div className="h-12 w-12 rounded-md bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
                <Shield size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Verified Employers</h3>
              <p className="text-muted-foreground">
                All companies are verified, ensuring legitimate and high-quality job opportunities.
              </p>
            </AnimatedContainer>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary/5 relative overflow-hidden">
        <div 
          className="absolute bottom-0 left-0 w-full h-36 -z-10 opacity-20" 
          style={{ 
            background: 'linear-gradient(to top, rgba(59, 130, 246, 0.2), transparent)' 
          }} 
        />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <AnimatedContainer animation="slide-up">
            <h2 className="text-3xl md:text-4xl font-display font-semibold mb-6">
              Ready to Take the Next Step in Your Career?
            </h2>
          </AnimatedContainer>
          <AnimatedContainer animation="slide-up" delay={100} className="mb-10">
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of professionals who have found their dream jobs through our platform. Start your journey today.
            </p>
          </AnimatedContainer>
          <AnimatedContainer animation="slide-up" delay={200}>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/signup">
                <Button size="lg" className="px-8 button-effect">
                  Get Started
                </Button>
              </Link>
              <Link to="/dashboard">
                <Button size="lg" variant="outline" className="px-8 bg-background">
                  Browse Jobs
                </Button>
              </Link>
            </div>
          </AnimatedContainer>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted/30 border-t border-border py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-6 md:mb-0">
              <Briefcase className="h-6 w-6 text-primary mr-2" />
              <span className="text-lg font-display font-semibold">JobPortal</span>
            </div>
            
            <div className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} JobPortal. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
