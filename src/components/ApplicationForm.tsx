
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { JobListing, User, Resume, Application } from '@/lib/types';
import ResumeUpload from '@/components/ResumeUpload';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { Check, File } from 'lucide-react';

interface ApplicationFormProps {
  isOpen: boolean;
  onClose: () => void;
  job: JobListing;
  user: User | null;
  onSubmit: (application: Partial<Application>) => void;
}

interface FormValues {
  coverLetter: string;
  useExistingResume: boolean;
}

const ApplicationForm: React.FC<ApplicationFormProps> = ({
  isOpen,
  onClose,
  job,
  user,
  onSubmit,
}) => {
  const { toast } = useToast();
  const [resume, setResume] = useState<Resume | undefined>(user?.resume);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState<'resume' | 'details'>('resume');

  const form = useForm<FormValues>({
    defaultValues: {
      coverLetter: '',
      useExistingResume: false,
    },
  });

  const handleResumeUpload = (newResume: Resume) => {
    setResume(newResume);
    setStep('details');
  };

  const handleUseExistingResume = () => {
    if (user?.resume) {
      setResume(user.resume);
      setStep('details');
    }
  };

  const handleCancelUpload = () => {
    if (user?.resume) {
      setResume(user.resume);
    }
    setStep('resume');
  };

  const handleSubmitApplication = (values: FormValues) => {
    if (!resume) {
      toast({
        title: "Resume required",
        description: "Please upload a resume before applying.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    // Create application object
    const application: Partial<Application> = {
      jobId: job.id,
      userId: user?.id || '',
      resumeId: resume.id,
      coverLetter: values.coverLetter,
      jobTitle: job.title,
      companyName: job.company,
    };

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      onSubmit(application);
      onClose();
    }, 1500);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {step === 'resume' ? 'Upload your resume' : `Apply for ${job.title}`}
          </DialogTitle>
        </DialogHeader>

        {step === 'resume' ? (
          <div className="py-4 space-y-4">
            {user?.resume && (
              <div className="mb-4">
                <div className="p-4 border rounded-md bg-muted/30 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <File className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">{user.resume.fileName}</p>
                      <p className="text-xs text-muted-foreground">
                        Uploaded {new Date(user.resume.uploadedAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <Button variant="secondary" size="sm" onClick={handleUseExistingResume}>
                    Use this resume
                  </Button>
                </div>
              </div>
            )}

            <div className="text-center">
              <h3 className="text-sm font-medium mb-2">
                {user?.resume ? 'Or upload a new resume' : 'Upload your resume'}
              </h3>
              <ResumeUpload 
                user={user} 
                onResumeUpload={handleResumeUpload} 
              />
            </div>
          </div>
        ) : (
          <form onSubmit={form.handleSubmit(handleSubmitApplication)}>
            <div className="py-4 space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="resume">Resume</Label>
                  <Button 
                    type="button" 
                    variant="ghost" 
                    size="sm" 
                    onClick={handleCancelUpload}
                    className="h-6 text-xs"
                  >
                    Change
                  </Button>
                </div>
                
                <div className="p-3 border rounded-md bg-muted/30 flex items-center space-x-3">
                  <File className="h-4 w-4 text-muted-foreground" />
                  <p className="text-sm">{resume?.fileName}</p>
                  <Check className="h-4 w-4 text-green-500 ml-auto" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="cover-letter">Cover Letter (Optional)</Label>
                <Textarea
                  id="cover-letter"
                  placeholder="Tell the employer why you're a good fit for this position..."
                  rows={6}
                  {...form.register('coverLetter')}
                />
              </div>

              <div className="space-y-2 text-sm">
                <p className="font-medium">Profile information to be shared:</p>
                <div className="space-y-1 text-muted-foreground">
                  <div className="flex justify-between">
                    <span>Name:</span>
                    <span className="font-medium text-foreground">{user?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Email:</span>
                    <span className="font-medium text-foreground">{user?.email}</span>
                  </div>
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button 
                type="button" 
                variant="outline" 
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button 
                type="submit"
                disabled={isSubmitting}
                className="button-effect"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Application'}
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ApplicationForm;
