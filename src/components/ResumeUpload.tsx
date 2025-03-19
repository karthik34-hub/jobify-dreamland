
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Resume, User } from '@/lib/types';
import { useToast } from "@/hooks/use-toast";
import { File, Upload, Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ResumeUploadProps {
  user: User | null;
  onResumeUpload: (resume: Resume) => void;
  className?: string;
}

const ResumeUpload: React.FC<ResumeUploadProps> = ({ 
  user, 
  onResumeUpload,
  className 
}) => {
  const { toast } = useToast();
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };
  
  const handleDragLeave = () => {
    setIsDragging(false);
  };
  
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      uploadResume(files[0]);
    }
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      uploadResume(files[0]);
    }
  };
  
  const uploadResume = (file: File) => {
    // Check file type
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!allowedTypes.includes(file.type)) {
      toast({
        title: "Invalid file type",
        description: "Please upload a PDF or Word document.",
        variant: "destructive",
      });
      return;
    }
    
    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Resume should be less than 5MB.",
        variant: "destructive",
      });
      return;
    }
    
    setIsUploading(true);
    
    // Simulate upload progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setUploadProgress(progress);
      
      if (progress >= 100) {
        clearInterval(interval);
        
        // Simulate API upload completion
        setTimeout(() => {
          setIsUploading(false);
          
          // Create mock resume data
          const newResume: Resume = {
            id: 'res_' + Date.now(),
            fileName: file.name,
            fileUrl: URL.createObjectURL(file),
            uploadedAt: new Date().toISOString(),
          };
          
          // Update user object in session storage
          if (user) {
            const updatedUser = {
              ...user,
              resume: newResume
            };
            sessionStorage.setItem('user', JSON.stringify(updatedUser));
          }
          
          onResumeUpload(newResume);
          
          toast({
            title: "Resume uploaded",
            description: "Your resume has been successfully uploaded.",
          });
        }, 500);
      }
    }, 200);
  };
  
  return (
    <div className={cn("space-y-4", className)}>
      <input 
        type="file" 
        id="resume-upload" 
        accept=".pdf,.doc,.docx" 
        className="hidden" 
        onChange={handleFileChange}
      />
      
      <div 
        className={cn(
          "border-2 border-dashed rounded-lg p-6 text-center transition-colors",
          isDragging ? "border-primary bg-primary/5" : "border-border",
          isUploading ? "pointer-events-none" : "cursor-pointer",
          "hover:border-primary hover:bg-primary/5"
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => !isUploading && document.getElementById('resume-upload')?.click()}
      >
        {isUploading ? (
          <div className="space-y-3">
            <div className="flex justify-center">
              <File className="h-10 w-10 text-primary animate-pulse" />
            </div>
            <p className="text-sm font-medium">Uploading resume...</p>
            <div className="w-full bg-muted rounded-full h-2.5 my-3">
              <div 
                className="bg-primary h-2.5 rounded-full transition-all" 
                style={{ width: `${uploadProgress}%` }} 
              />
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="flex justify-center">
              <Upload className="h-10 w-10 text-muted-foreground" />
            </div>
            <p className="text-sm font-medium">Drag and drop your resume here</p>
            <p className="text-xs text-muted-foreground">
              Supports PDF, DOC, DOCX (Max 5MB)
            </p>
            <Button type="button" variant="outline" size="sm">
              Browse Files
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumeUpload;
