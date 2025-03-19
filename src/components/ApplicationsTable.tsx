
import React from 'react';
import { Link } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Application } from '@/lib/types';
import { ExternalLink } from 'lucide-react';

interface ApplicationsTableProps {
  applications: Application[];
}

const ApplicationsTable: React.FC<ApplicationsTableProps> = ({ applications }) => {
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getStatusBadge = (status: Application['status']) => {
    switch (status) {
      case 'applied':
        return <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-200">Applied</Badge>;
      case 'under-review':
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-600 border-yellow-200">Under Review</Badge>;
      case 'interviewed':
        return <Badge variant="outline" className="bg-purple-50 text-purple-600 border-purple-200">Interviewed</Badge>;
      case 'offered':
        return <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">Offered</Badge>;
      case 'rejected':
        return <Badge variant="outline" className="bg-red-50 text-red-600 border-red-200">Rejected</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };
  
  return (
    <div className="overflow-hidden rounded-lg border border-border/40 glass-card">
      <div className="relative w-full overflow-auto">
        <Table>
          <TableHeader className="bg-muted/30">
            <TableRow>
              <TableHead className="w-[250px]">Job Title</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Applied On</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {applications.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  <p className="text-muted-foreground">No job applications yet.</p>
                  <Link to="/dashboard">
                    <Button variant="link" className="mt-2">Browse Jobs</Button>
                  </Link>
                </TableCell>
              </TableRow>
            ) : (
              applications.map((application) => (
                <TableRow key={application.id} className="hover:bg-muted/20 transition-colors">
                  <TableCell className="font-medium">{application.jobTitle}</TableCell>
                  <TableCell>{application.companyName}</TableCell>
                  <TableCell>{formatDate(application.appliedAt)}</TableCell>
                  <TableCell>{getStatusBadge(application.status)}</TableCell>
                  <TableCell className="text-right">
                    <Link to={`/job/${application.jobId}`}>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <ExternalLink className="h-4 w-4" />
                        <span className="sr-only">View Job</span>
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ApplicationsTable;
