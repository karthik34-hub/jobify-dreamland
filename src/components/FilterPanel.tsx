
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { X, SlidersHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils';
import { FilterOptions } from '@/lib/types';

interface FilterPanelProps {
  onFilterChange: (filters: FilterOptions) => void;
  className?: string;
}

const FilterPanel: React.FC<FilterPanelProps> = ({ onFilterChange, className }) => {
  const [location, setLocation] = useState('');
  const [filters, setFilters] = useState<FilterOptions>({
    locationType: [],
    employmentType: [],
    experienceLevel: [],
    skills: [],
  });
  const [mobileFiltersVisible, setMobileFiltersVisible] = useState(false);

  const locationTypes = [
    { id: 'remote', label: 'Remote' },
    { id: 'onsite', label: 'On-site' },
    { id: 'hybrid', label: 'Hybrid' },
  ];

  const employmentTypes = [
    { id: 'full-time', label: 'Full-time' },
    { id: 'part-time', label: 'Part-time' },
    { id: 'contract', label: 'Contract' },
    { id: 'internship', label: 'Internship' },
  ];

  const experienceLevels = [
    { id: 'entry', label: 'Entry Level' },
    { id: 'intermediate', label: 'Mid-Level' },
    { id: 'senior', label: 'Senior' },
    { id: 'executive', label: 'Executive' },
  ];

  const skillOptions = [
    'JavaScript', 'React', 'TypeScript', 'Node.js', 'Python', 
    'Java', 'SQL', 'AWS', 'Docker', 'DevOps', 'UI/UX',
    'Product Management', 'Marketing', 'Sales', 'Customer Success',
  ];

  const handleLocationTypeChange = (value: string, checked: boolean) => {
    if (checked) {
      setFilters({
        ...filters,
        locationType: [...(filters.locationType || []), value as any],
      });
    } else {
      setFilters({
        ...filters,
        locationType: filters.locationType?.filter(type => type !== value),
      });
    }
  };

  const handleEmploymentTypeChange = (value: string, checked: boolean) => {
    if (checked) {
      setFilters({
        ...filters,
        employmentType: [...(filters.employmentType || []), value as any],
      });
    } else {
      setFilters({
        ...filters,
        employmentType: filters.employmentType?.filter(type => type !== value),
      });
    }
  };

  const handleExperienceLevelChange = (value: string, checked: boolean) => {
    if (checked) {
      setFilters({
        ...filters,
        experienceLevel: [...(filters.experienceLevel || []), value as any],
      });
    } else {
      setFilters({
        ...filters,
        experienceLevel: filters.experienceLevel?.filter(level => level !== value),
      });
    }
  };

  const handleSkillChange = (skill: string, checked: boolean) => {
    if (checked) {
      setFilters({
        ...filters,
        skills: [...(filters.skills || []), skill],
      });
    } else {
      setFilters({
        ...filters,
        skills: filters.skills?.filter(s => s !== skill),
      });
    }
  };

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocation(e.target.value);
    setFilters({
      ...filters,
      location: e.target.value,
    });
  };

  const clearAllFilters = () => {
    setFilters({
      locationType: [],
      employmentType: [],
      experienceLevel: [],
      skills: [],
    });
    setLocation('');
    onFilterChange({});
  };

  const applyFilters = () => {
    onFilterChange(filters);
    // Close mobile filters if open
    setMobileFiltersVisible(false);
  };

  const toggleMobileFilters = () => {
    setMobileFiltersVisible(!mobileFiltersVisible);
  };

  const filterCount = [
    ...(filters.locationType || []),
    ...(filters.employmentType || []),
    ...(filters.experienceLevel || []),
    ...(filters.skills || []),
  ].length + (filters.location ? 1 : 0);

  return (
    <>
      {/* Mobile filter toggle button */}
      <div className="md:hidden mb-4">
        <Button 
          variant="outline" 
          className="w-full flex justify-between items-center"
          onClick={toggleMobileFilters}
        >
          <span className="flex items-center gap-2">
            <SlidersHorizontal className="h-4 w-4" />
            Filters
          </span>
          {filterCount > 0 && (
            <Badge variant="secondary" className="ml-2">
              {filterCount}
            </Badge>
          )}
        </Button>
      </div>

      {/* Filter panel - hidden on mobile unless toggled */}
      <Card 
        className={cn(
          "glass-card overflow-hidden transition-all duration-300",
          className,
          "md:block", // Always visible on desktop
          mobileFiltersVisible ? "block" : "hidden", // Toggle on mobile
        )}
      >
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-semibold text-lg">Filters</h3>
            {filterCount > 0 && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={clearAllFilters}
                className="h-auto text-xs text-muted-foreground hover:text-foreground hover:bg-background"
              >
                Clear all
              </Button>
            )}
          </div>

          <div className="space-y-6">
            {/* Location search */}
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                placeholder="City, state, or zip code"
                value={location}
                onChange={handleLocationChange}
                className="bg-background border-input focus-visible:ring-1 focus-visible:ring-primary/50"
              />
            </div>

            <Separator />

            {/* Location Type */}
            <div className="space-y-3">
              <h4 className="font-medium text-sm">Location Type</h4>
              <div className="grid grid-cols-1 gap-2">
                {locationTypes.map((type) => (
                  <div key={type.id} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`location-${type.id}`} 
                      checked={filters.locationType?.includes(type.id as any)}
                      onCheckedChange={(checked) => 
                        handleLocationTypeChange(type.id, checked === true)
                      }
                    />
                    <Label
                      htmlFor={`location-${type.id}`}
                      className="text-sm font-normal cursor-pointer"
                    >
                      {type.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* Employment Type */}
            <div className="space-y-3">
              <h4 className="font-medium text-sm">Employment Type</h4>
              <div className="grid grid-cols-1 gap-2">
                {employmentTypes.map((type) => (
                  <div key={type.id} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`employment-${type.id}`} 
                      checked={filters.employmentType?.includes(type.id as any)}
                      onCheckedChange={(checked) => 
                        handleEmploymentTypeChange(type.id, checked === true)
                      }
                    />
                    <Label
                      htmlFor={`employment-${type.id}`}
                      className="text-sm font-normal cursor-pointer"
                    >
                      {type.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* Experience Level */}
            <div className="space-y-3">
              <h4 className="font-medium text-sm">Experience Level</h4>
              <div className="grid grid-cols-1 gap-2">
                {experienceLevels.map((level) => (
                  <div key={level.id} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`experience-${level.id}`} 
                      checked={filters.experienceLevel?.includes(level.id as any)}
                      onCheckedChange={(checked) => 
                        handleExperienceLevelChange(level.id, checked === true)
                      }
                    />
                    <Label
                      htmlFor={`experience-${level.id}`}
                      className="text-sm font-normal cursor-pointer"
                    >
                      {level.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* Skills */}
            <div className="space-y-3">
              <h4 className="font-medium text-sm">Skills</h4>
              <div className="flex flex-wrap gap-2">
                {skillOptions.map((skill) => {
                  const isSelected = filters.skills?.includes(skill);
                  return (
                    <Badge
                      key={skill}
                      variant={isSelected ? "default" : "outline"}
                      className={cn(
                        "cursor-pointer transition-all hover:bg-primary/10 select-none",
                        isSelected 
                          ? "bg-primary/10 hover:bg-primary/15 text-primary border-primary/10" 
                          : "bg-background hover:border-primary/30"
                      )}
                      onClick={() => handleSkillChange(skill, !isSelected)}
                    >
                      {skill}
                      {isSelected && (
                        <X className="ml-1 h-3 w-3" />
                      )}
                    </Badge>
                  );
                })}
              </div>
            </div>

            {/* Apply Filters Button - only visible on mobile */}
            <div className="pt-2 md:hidden">
              <Button className="w-full button-effect" onClick={applyFilters}>
                Apply Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default FilterPanel;
