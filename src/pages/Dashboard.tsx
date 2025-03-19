
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from "@/hooks/use-toast";
import { User, JobListing, Application, FilterOptions } from '@/lib/types';
import Navbar from '@/components/Navbar';
import JobCard from '@/components/JobCard';
import SearchBar from '@/components/SearchBar';
import FilterPanel from '@/components/FilterPanel';
import ApplicationsTable from '@/components/ApplicationsTable';
import AnimatedContainer from '@/components/AnimatedContainer';
import { Grid2x2, List } from 'lucide-react';

// Mock data for jobs
export const mockJobs: JobListing[] = [
  {
    id: '1',
    title: 'Senior Frontend Developer',
    company: 'TechCorp',
    companyLogo: 'https://cdn.worldvectorlogo.com/logos/react-2.svg',
    location: 'San Francisco, CA',
    locationType: 'remote',
    salary: '$120,000 - $150,000',
    postedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    description: 'We are looking for a Senior Frontend Developer to join our team...',
    requirements: ['5+ years of experience', 'React expertise', 'TypeScript'],
    skills: ['React', 'TypeScript', 'CSS', 'HTML', 'JavaScript'],
    employmentType: 'full-time',
    experienceLevel: 'senior',
    isFeatured: true,
  },
  {
    id: '2',
    title: 'UX/UI Designer',
    company: 'DesignStudio',
    companyLogo: 'https://cdn.worldvectorlogo.com/logos/figma-5.svg',
    location: 'New York, NY',
    locationType: 'hybrid',
    salary: '$90,000 - $110,000',
    postedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    description: 'We are seeking a talented UX/UI Designer to create beautiful interfaces...',
    requirements: ['3+ years of experience', 'Portfolio', 'Figma expertise'],
    skills: ['UI Design', 'UX Research', 'Figma', 'Sketch', 'Prototyping'],
    employmentType: 'full-time',
    experienceLevel: 'intermediate',
  },
  {
    id: '3',
    title: 'Backend Developer',
    company: 'ServerTech',
    companyLogo: 'https://cdn.worldvectorlogo.com/logos/nodejs-icon.svg',
    location: 'Austin, TX',
    locationType: 'onsite',
    salary: '$100,000 - $130,000',
    postedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    description: 'Join our backend team to build scalable APIs and services...',
    requirements: ['4+ years of experience', 'Node.js', 'Database design'],
    skills: ['Node.js', 'Express', 'MongoDB', 'SQL', 'AWS'],
    employmentType: 'full-time',
    experienceLevel: 'senior',
  },
  {
    id: '4',
    title: 'Product Manager',
    company: 'ProductLab',
    companyLogo: 'https://cdn.worldvectorlogo.com/logos/product-hunt-2.svg',
    location: 'Remote',
    locationType: 'remote',
    salary: '$110,000 - $140,000',
    postedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    description: 'Lead product development from concept to launch...',
    requirements: ['3+ years in product management', 'Tech background', 'Agile experience'],
    skills: ['Product Strategy', 'Roadmapping', 'User Stories', 'Agile', 'Data Analysis'],
    employmentType: 'full-time',
    experienceLevel: 'intermediate',
    isFeatured: true,
  },
  {
    id: '5',
    title: 'Data Scientist',
    company: 'DataCorp',
    companyLogo: 'https://cdn.worldvectorlogo.com/logos/python-5.svg',
    location: 'Chicago, IL',
    locationType: 'hybrid',
    salary: '$130,000 - $160,000',
    postedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    description: 'Analyze complex data and create machine learning models...',
    requirements: ['MS or PhD in relevant field', 'Python expertise', 'ML experience'],
    skills: ['Python', 'Machine Learning', 'SQL', 'Data Visualization', 'Statistics'],
    employmentType: 'full-time',
    experienceLevel: 'senior',
  },
  {
    id: '6',
    title: 'DevOps Engineer',
    company: 'CloudOps',
    companyLogo: 'https://cdn.worldvectorlogo.com/logos/aws-2.svg',
    location: 'Seattle, WA',
    locationType: 'onsite',
    salary: '$120,000 - $150,000',
    postedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    description: 'Build and maintain our cloud infrastructure and CI/CD pipelines...',
    requirements: ['3+ years of experience', 'AWS', 'CI/CD'],
    skills: ['AWS', 'Docker', 'Kubernetes', 'Terraform', 'CI/CD'],
    employmentType: 'full-time',
    experienceLevel: 'intermediate',
  },
];

// Mock data for applications
const mockApplications: Application[] = [
  {
    id: '1',
    jobId: '1',
    userId: '1',
    status: 'under-review',
    appliedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    jobTitle: 'Senior Frontend Developer',
    companyName: 'TechCorp',
  },
  {
    id: '2',
    jobId: '3',
    userId: '1',
    status: 'applied',
    appliedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    jobTitle: 'Backend Developer',
    companyName: 'ServerTech',
  },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [user, setUser] = useState<User | null>(null);
  const [jobs, setJobs] = useState<JobListing[]>(mockJobs);
  const [applications, setApplications] = useState<Application[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentTab, setCurrentTab] = useState('browse');
  const [filters, setFilters] = useState<FilterOptions>({});
  const [view, setView] = useState<'grid' | 'list'>('grid');

  // Check for query parameters
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get('query');
    const locationParam = params.get('location');
    
    if (query) {
      setSearchQuery(query);
    }
    
    if (locationParam) {
      setFilters(prev => ({ ...prev, location: locationParam }));
    }
  }, [location.search]);

  // Get user from session storage
  useEffect(() => {
    const storedUser = sessionStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      // In a real app, this would fetch the user's applications
      setApplications(mockApplications);
    } else {
      navigate('/signin');
    }
  }, [navigate]);

  const handleLogout = () => {
    sessionStorage.removeItem('user');
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account.",
    });
    navigate('/');
  };

  const handleSearch = (query: string, location: string) => {
    setSearchQuery(query);
    if (location) {
      setFilters(prev => ({ ...prev, location }));
    }
  };

  const handleFilterChange = (newFilters: FilterOptions) => {
    setFilters(newFilters);
  };

  // Filter jobs based on search query and filters
  const filteredJobs = jobs.filter(job => {
    // Search query filtering
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const matchesTitle = job.title.toLowerCase().includes(query);
      const matchesCompany = job.company.toLowerCase().includes(query);
      const matchesSkills = job.skills.some(skill => skill.toLowerCase().includes(query));
      
      if (!(matchesTitle || matchesCompany || matchesSkills)) {
        return false;
      }
    }
    
    // Location filtering
    if (filters.location && !job.location.toLowerCase().includes(filters.location.toLowerCase())) {
      return false;
    }
    
    // Location type filtering
    if (filters.locationType && filters.locationType.length > 0 && !filters.locationType.includes(job.locationType)) {
      return false;
    }
    
    // Employment type filtering
    if (filters.employmentType && filters.employmentType.length > 0 && !filters.employmentType.includes(job.employmentType)) {
      return false;
    }
    
    // Experience level filtering
    if (filters.experienceLevel && filters.experienceLevel.length > 0 && !filters.experienceLevel.includes(job.experienceLevel)) {
      return false;
    }
    
    // Skills filtering
    if (filters.skills && filters.skills.length > 0) {
      const hasAllSkills = filters.skills.every(skill => 
        job.skills.some(jobSkill => jobSkill.toLowerCase() === skill.toLowerCase())
      );
      if (!hasAllSkills) {
        return false;
      }
    }
    
    return true;
  });

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar user={user} onLogout={handleLogout} />
      
      <main className="flex-1 pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <AnimatedContainer animation="fade" className="mb-8">
            <Tabs 
              defaultValue="browse" 
              value={currentTab} 
              onValueChange={setCurrentTab}
              className="w-full"
            >
              <div className="flex justify-between items-center mb-6">
                <TabsList>
                  <TabsTrigger value="browse">Browse Jobs</TabsTrigger>
                  <TabsTrigger value="applications">My Applications</TabsTrigger>
                </TabsList>
                
                {currentTab === 'browse' && (
                  <div className="flex items-center gap-2">
                    <Button
                      variant={view === 'grid' ? 'default' : 'outline'}
                      size="icon"
                      className="h-9 w-9"
                      onClick={() => setView('grid')}
                    >
                      <Grid2x2 className="h-4 w-4" />
                      <span className="sr-only">Grid view</span>
                    </Button>
                    <Button
                      variant={view === 'list' ? 'default' : 'outline'}
                      size="icon"
                      className="h-9 w-9"
                      onClick={() => setView('list')}
                    >
                      <List className="h-4 w-4" />
                      <span className="sr-only">List view</span>
                    </Button>
                  </div>
                )}
              </div>
              
              <TabsContent value="browse" className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <AnimatedContainer animation="slide-up" className="md:col-span-1">
                    <FilterPanel onFilterChange={handleFilterChange} />
                  </AnimatedContainer>
                  
                  <div className="md:col-span-3 space-y-6">
                    <AnimatedContainer animation="slide-up" className="w-full">
                      <Card className="glass-card border-border/40">
                        <CardContent className="p-4">
                          <SearchBar onSearch={handleSearch} />
                        </CardContent>
                      </Card>
                    </AnimatedContainer>
                    
                    <AnimatedContainer animation="slide-up" delay={100} className="space-y-6">
                      {filteredJobs.length === 0 ? (
                        <div className="text-center py-12 px-4">
                          <h3 className="text-lg font-medium mb-2">No jobs found</h3>
                          <p className="text-muted-foreground mb-6">
                            Try adjusting your search criteria or filters
                          </p>
                          <Button 
                            variant="outline" 
                            onClick={() => {
                              setSearchQuery('');
                              setFilters({});
                            }}
                          >
                            Clear filters
                          </Button>
                        </div>
                      ) : (
                        <>
                          <div className="flex justify-between items-center">
                            <p className="text-muted-foreground">
                              Showing <span className="font-medium text-foreground">{filteredJobs.length}</span> jobs
                            </p>
                          </div>
                          
                          <div className={`grid gap-4 ${view === 'grid' ? 'sm:grid-cols-2' : 'grid-cols-1'}`}>
                            {filteredJobs.map((job) => (
                              <JobCard 
                                key={job.id} 
                                job={job} 
                                applied={applications.some(app => app.jobId === job.id)} 
                              />
                            ))}
                          </div>
                        </>
                      )}
                    </AnimatedContainer>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="applications" className="mt-0">
                <AnimatedContainer animation="slide-up">
                  <Card className="glass-card border-border/40">
                    <CardContent className="p-6">
                      <h2 className="text-xl font-semibold mb-4">My Applications</h2>
                      <p className="text-muted-foreground mb-6">
                        Track and manage all your job applications in one place
                      </p>
                      <ApplicationsTable applications={applications} />
                    </CardContent>
                  </Card>
                </AnimatedContainer>
              </TabsContent>
            </Tabs>
          </AnimatedContainer>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
