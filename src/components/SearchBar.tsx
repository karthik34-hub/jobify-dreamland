
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SearchBarProps {
  onSearch: (query: string, location: string) => void;
  className?: string;
  expanded?: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ 
  onSearch, 
  className,
  expanded = false
}) => {
  const [query, setQuery] = useState('');
  const [location, setLocation] = useState('');
  const [focused, setFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query.trim(), location.trim());
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className={cn(
        "flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full transition-all duration-300",
        focused && "scale-[1.01]",
        expanded ? "max-w-4xl" : "max-w-2xl",
        className
      )}
    >
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          type="text"
          placeholder="Job title, keywords, or company"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="pl-10 h-12 bg-background border-input focus-visible:ring-1 focus-visible:ring-primary/50"
        />
      </div>
      
      {expanded && (
        <div className="relative flex-1">
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            className="pl-10 h-12 bg-background border-input focus-visible:ring-1 focus-visible:ring-primary/50"
          />
        </div>
      )}
      
      <Button type="submit" className="h-12 px-6 shadow-sm button-effect">
        Search
      </Button>
    </form>
  );
};

export default SearchBar;
