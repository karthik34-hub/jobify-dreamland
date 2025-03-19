
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Clock, Briefcase, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';
import { JobListing } from '@/lib/types';

interface JobCardProps {
  job: JobListing;
  applied?: boolean;
}

const JobCard: React.FC<JobCardProps> = ({ job, applied = false }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      return 'Today';
    } else if (diffDays === 1) {
      return 'Yesterday';
    } else if (diffDays < 7) {
      return `${diffDays} days ago`;
    } else if (diffDays < 30) {
      return `${Math.floor(diffDays / 7)} week${Math.floor(diffDays / 7) > 1 ? 's' : ''} ago`;
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
  };

  const locationTypeIcon = {
    remote: '🌐',
    onsite: '🏢',
    hybrid: '🏠'
  };

  const locationTypeLabel = {
    remote: 'Remote',
    onsite: 'On-site',
    hybrid: 'Hybrid'
  };

  const employmentTypeLabel = {
    'full-time': 'Full-time',
    'part-time': 'Part-time',
    'contract': 'Contract',
    'internship': 'Internship'
  };

  return (
    <Card className={cn(
      "overflow-hidden hover-lift transition-all border-border/40",
      job.isFeatured && "ring-1 ring-primary/20",
      "glass-card"
    )}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-md bg-secondary flex items-center justify-center overflow-hidden">
              {job.companyLogo ? (
                <img 
                  src={job.companyLogo} 
                  alt={`${job.company} logo`} 
                  className="h-full w-full object-contain"
                />
              ) : (
                <div className="font-semibold text-lg text-primary">
                  {job.company.charAt(0)}
                </div>
              )}
            </div>
            <div>
              <h3 className="font-semibold text-lg leading-tight">{job.title}</h3>
              <p className="text-sm text-muted-foreground">{job.company}</p>
            </div>
          </div>
          
          {job.isFeatured && (
            <Badge variant="outline" className="border-primary/30 text-primary bg-primary/5 px-2">
              Featured
            </Badge>
          )}
        </div>
        
        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-y-2 gap-x-4">
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="h-3.5 w-3.5 mr-1.5 text-muted-foreground/70" />
            <span>{job.location}</span>
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <span className="mr-1.5">{locationTypeIcon[job.locationType]}</span>
            <span>{locationTypeLabel[job.locationType]}</span>
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <Briefcase className="h-3.5 w-3.5 mr-1.5 text-muted-foreground/70" />
            <span>{employmentTypeLabel[job.employmentType]}</span>
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <Calendar className="h-3.5 w-3.5 mr-1.5 text-muted-foreground/70" />
            <span>{formatDate(job.postedAt)}</span>
          </div>
        </div>
        
        <div className="mt-4">
          <div className="flex flex-wrap gap-1.5">
            {job.skills.slice(0, 4).map((skill, index) => (
              <Badge 
                key={index} 
                variant="secondary" 
                className="font-normal text-xs bg-secondary/80"
              >
                {skill}
              </Badge>
            ))}
            {job.skills.length > 4 && (
              <Badge variant="outline" className="font-normal text-xs">
                +{job.skills.length - 4} more
              </Badge>
            )}
          </div>
        </div>
        
        <div className="mt-6 flex justify-between items-center">
          {job.salary && (
            <div className="text-sm">
              <span className="font-medium">{job.salary}</span>
            </div>
          )}
          <div className="flex gap-3">
            {applied ? (
              <Badge variant="outline" className="bg-secondary/50 border-secondary">
                Applied
              </Badge>
            ) : (
              <Link to={`/job/${job.id}`}>
                <Button className="button-effect">View Details</Button>
              </Link>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default JobCard;
