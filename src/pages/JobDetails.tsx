import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useToast } from "@/hooks/use-toast";
import { JobListing, User, Application } from '@/lib/types';
import Navbar from '@/components/Navbar';
import AnimatedContainer from '@/components/AnimatedContainer';
import ApplicationForm from '@/components/ApplicationForm';
import { ArrowLeft, Briefcase, MapPin, Calendar, Building, Send, Share2, Bookmark } from 'lucide-react';

// Mock data for jobs
const mockJobs: JobListing[] = [
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

const JobDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [user, setUser] = useState<User | null>(null);
  const [job, setJob] = useState<JobListing | null>(null);
  const [hasApplied, setHasApplied] = useState(false);
  const [isApplyFormOpen, setIsApplyFormOpen] = useState(false);

  // Get user from session storage
  useEffect(() => {
    const storedUser = sessionStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      navigate('/signin');
    }
  }, [navigate]);

  // Get job details
  useEffect(() => {
    // In a real app, fetch job details from API
    if (id) {
      const foundJob = mockJobs.find(job => job.id === id);
      if (foundJob) {
        setJob(foundJob);
      } else {
        toast({
          title: "Job not found",
          description: "The job listing you're looking for doesn't exist.",
          variant: "destructive",
        });
        navigate('/dashboard');
      }
    }
  }, [id, navigate, toast]);

  // Check if user has applied for this job
  useEffect(() => {
    if (job && user) {
      // In a real app, fetch this from API
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
      ];
      
      const application = mockApplications.find(
        app => app.jobId === job.id && app.userId === user.id
      );
      
      setHasApplied(!!application);
    }
  }, [job, user]);

  const handleApply = () => {
    setIsApplyFormOpen(true);
  };

  const handleSubmitApplication = (application: Partial<Application>) => {
    // In a real app, this would send the application to an API
    setHasApplied(true);
    
    // Update the user in session storage to reflect the application
    const updatedApplications = [
      {
        id: 'app_' + Date.now(),
        jobId: job?.id || '',
        userId: user?.id || '',
        status: 'applied',
        appliedAt: new Date().toISOString(),
        jobTitle: job?.title || '',
        companyName: job?.company || '',
        resumeId: application.resumeId,
        coverLetter: application.coverLetter,
      },
    ];
    
    // Here you would typically update the user's applications in your backend
    
    toast({
      title: "Application submitted",
      description: "Your application has been successfully submitted.",
    });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: job?.title,
        text: `Check out this job listing for ${job?.title} at ${job?.company}`,
        url: window.location.href,
      }).catch(err => console.log('Error sharing', err));
    } else {
      // Fallback
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link copied",
        description: "Job link copied to clipboard",
      });
    }
  };

  const handleSave = () => {
    toast({
      title: "Job saved",
      description: "This job has been saved to your bookmarks",
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (!job) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar user={user} />
        <div className="flex-1 flex items-center justify-center">
          <p>Loading job details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar user={user} />
      
      <main className="flex-1 pt-24 pb-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <AnimatedContainer animation="slide-up" className="mb-6">
            <Link to="/dashboard" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to jobs
            </Link>
          </AnimatedContainer>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-6">
              <AnimatedContainer animation="slide-up" delay={100}>
                <Card className="glass-card overflow-hidden border-border/40">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="h-16 w-16 rounded-md bg-secondary flex items-center justify-center overflow-hidden">
                        {job.companyLogo ? (
                          <img 
                            src={job.companyLogo} 
                            alt={`${job.company} logo`} 
                            className="h-full w-full object-contain"
                          />
                        ) : (
                          <div className="font-semibold text-2xl text-primary">
                            {job.company.charAt(0)}
                          </div>
                        )}
                      </div>
                      <div>
                        <h1 className="text-2xl font-display font-semibold mb-1">{job.title}</h1>
                        <p className="text-lg text-muted-foreground">{job.company}</p>
                      </div>
                    </div>
                    
                    <div className="mt-6 grid grid-cols-2 gap-4">
                      <div className="flex items-center">
                        <MapPin className="h-5 w-5 mr-2 text-muted-foreground" />
                        <span>{job.location}</span>
                      </div>
                      <div className="flex items-center">
                        <Building className="h-5 w-5 mr-2 text-muted-foreground" />
                        <span>
                          {job.locationType === 'remote' ? 'Remote' : 
                            job.locationType === 'hybrid' ? 'Hybrid' : 'On-site'}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <Briefcase className="h-5 w-5 mr-2 text-muted-foreground" />
                        <span>
                          {job.employmentType === 'full-time' ? 'Full-time' :
                            job.employmentType === 'part-time' ? 'Part-time' :
                            job.employmentType === 'contract' ? 'Contract' : 'Internship'}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-5 w-5 mr-2 text-muted-foreground" />
                        <span>Posted {formatDate(job.postedAt)}</span>
                      </div>
                    </div>
                    
                    {job.salary && (
                      <div className="mt-6">
                        <div className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-md font-medium">
                          {job.salary}
                        </div>
                      </div>
                    )}
                    
                    <div className="mt-6">
                      <div className="flex flex-wrap gap-2">
                        {job.skills.map((skill, index) => (
                          <Badge 
                            key={index} 
                            variant="secondary" 
                            className="px-3 py-1 text-xs bg-secondary/80"
                          >
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <Separator className="my-6" />
                    
                    <div className="prose prose-sm max-w-none">
                      <h2 className="text-xl font-semibold mb-4">Job Description</h2>
                      <p className="mb-6">{job.description}</p>
                      
                      <h3 className="text-lg font-semibold mb-3">Requirements</h3>
                      <ul className="list-disc pl-5 space-y-1 mb-6">
                        {job.requirements.map((req, index) => (
                          <li key={index}>{req}</li>
                        ))}
                      </ul>
                      
                      <h3 className="text-lg font-semibold mb-3">Skills</h3>
                      <p>We're looking for candidates proficient in the following areas:</p>
                      <ul className="list-disc pl-5 space-y-1">
                        {job.skills.map((skill, index) => (
                          <li key={index}>{skill}</li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedContainer>
            </div>
            
            <div className="md:col-span-1 space-y-6">
              <AnimatedContainer animation="slide-up" delay={200}>
                <Card className="glass-card sticky top-24 border-border/40">
                  <CardContent className="p-6">
                    <h2 className="text-lg font-semibold mb-4">Apply for this position</h2>
                    
                    {hasApplied ? (
                      <div className="space-y-4">
                        <div className="bg-green-50 text-green-600 rounded-md p-3 text-sm">
                          You've already applied for this position
                        </div>
                        <Button variant="outline" className="w-full" disabled>
                          Applied
                        </Button>
                      </div>
                    ) : (
                      <Button 
                        className="w-full shadow-sm button-effect" 
                        onClick={handleApply}
                      >
                        <Send className="mr-2 h-4 w-4" />
                        Apply Now
                      </Button>
                    )}
                    
                    <div className="mt-4 space-y-2">
                      <Button 
                        variant="outline" 
                        className="w-full bg-background" 
                        onClick={handleSave}
                      >
                        <Bookmark className="mr-2 h-4 w-4" />
                        Save Job
                      </Button>
                      <Button 
                        variant="outline" 
                        className="w-full bg-background" 
                        onClick={handleShare}
                      >
                        <Share2 className="mr-2 h-4 w-4" />
                        Share
                      </Button>
                    </div>
                    
                    <Separator className="my-6" />
                    
                    <div className="space-y-4">
                      <h3 className="text-sm font-medium">About {job.company}</h3>
                      <p className="text-sm text-muted-foreground">
                        {job.company} is a leading company in the {job.skills[0]} industry, focused on creating innovative solutions.
                      </p>
                      
                      <div className="pt-2">
                        <a 
                          href="#" 
                          className="text-sm text-primary hover:underline"
                          target="_blank" 
                          rel="noopener noreferrer"
                        >
                          Visit company website
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedContainer>
            </div>
          </div>
        </div>
      </main>
      
      {/* Application Form */}
      <ApplicationForm
        isOpen={isApplyFormOpen}
        onClose={() => setIsApplyFormOpen(false)}
        job={job}
        user={user}
        onSubmit={handleSubmitApplication}
      />
    </div>
  );
};

export default JobDetails;
