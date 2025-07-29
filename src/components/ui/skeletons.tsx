import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

// Basic skeleton components
export const TextSkeleton = ({ className = "h-4 w-full" }: { className?: string }) => (
  <Skeleton className={className} />
);

export const AvatarSkeleton = ({ size = "h-10 w-10" }: { size?: string }) => (
  <Skeleton className={`${size} rounded-full`} />
);

export const ButtonSkeleton = ({ className = "h-10 w-24" }: { className?: string }) => (
  <Skeleton className={className} />
);

export const ImageSkeleton = ({ className = "h-48 w-full" }: { className?: string }) => (
  <Skeleton className={className} />
);

// Card skeleton components
export const CardSkeleton = ({ 
  showHeader = true, 
  showImage = false, 
  lines = 3,
  className = ""
}: { 
  showHeader?: boolean; 
  showImage?: boolean; 
  lines?: number;
  className?: string;
}) => (
  <Card className={className}>
    {showHeader && (
      <CardHeader>
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </CardHeader>
    )}
    <CardContent className="space-y-3">
      {showImage && <ImageSkeleton className="h-32 w-full" />}
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton key={i} className={`h-4 ${i === lines - 1 ? 'w-2/3' : 'w-full'}`} />
      ))}
    </CardContent>
  </Card>
);

// Table skeleton components
export const TableSkeleton = ({ 
  rows = 5, 
  columns = 4,
  showHeader = true 
}: { 
  rows?: number; 
  columns?: number;
  showHeader?: boolean;
}) => (
  <Table>
    {showHeader && (
      <TableHeader>
        <TableRow>
          {Array.from({ length: columns }).map((_, i) => (
            <TableHead key={i}>
              <Skeleton className="h-4 w-20" />
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
    )}
    <TableBody>
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <TableRow key={rowIndex}>
          {Array.from({ length: columns }).map((_, colIndex) => (
            <TableCell key={colIndex}>
              <Skeleton className="h-4 w-16" />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

// List skeleton components
export const ListSkeleton = ({ 
  items = 5,
  showAvatar = false,
  className = ""
}: { 
  items?: number;
  showAvatar?: boolean;
  className?: string;
}) => (
  <div className={`space-y-3 ${className}`}>
    {Array.from({ length: items }).map((_, i) => (
      <div key={i} className="flex items-center space-x-3">
        {showAvatar && <AvatarSkeleton />}
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-3 w-1/2" />
        </div>
      </div>
    ))}
  </div>
);

// Form skeleton components
export const FormSkeleton = ({ 
  fields = 4,
  showButtons = true,
  className = ""
}: { 
  fields?: number;
  showButtons?: boolean;
  className?: string;
}) => (
  <div className={`space-y-4 ${className}`}>
    {Array.from({ length: fields }).map((_, i) => (
      <div key={i} className="space-y-2">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-10 w-full" />
      </div>
    ))}
    {showButtons && (
      <div className="flex space-x-2 pt-4">
        <ButtonSkeleton className="h-10 w-20" />
        <ButtonSkeleton className="h-10 w-16" />
      </div>
    )}
  </div>
);

// Grid skeleton components
export const GridSkeleton = ({ 
  items = 6,
  columns = 3,
  showImage = true,
  className = ""
}: { 
  items?: number;
  columns?: number;
  showImage?: boolean;
  className?: string;
}) => (
  <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-${columns} gap-6 ${className}`}>
    {Array.from({ length: items }).map((_, i) => (
      <CardSkeleton key={i} showImage={showImage} lines={2} />
    ))}
  </div>
);

// Page skeleton components
export const PageSkeleton = ({ 
  showHeader = true,
  showSidebar = false,
  className = ""
}: { 
  showHeader?: boolean;
  showSidebar?: boolean;
  className?: string;
}) => (
  <div className={`min-h-screen ${className}`}>
    {showHeader && (
      <div className="border-b p-6">
        <Skeleton className="h-8 w-64 mb-2" />
        <Skeleton className="h-4 w-96" />
      </div>
    )}
    <div className={`flex ${showSidebar ? 'space-x-6' : ''} p-6`}>
      {showSidebar && (
        <div className="w-64 space-y-4">
          <ListSkeleton items={6} />
        </div>
      )}
      <div className="flex-1 space-y-6">
        <GridSkeleton items={6} />
      </div>
    </div>
  </div>
);

// Testimonial skeleton
export const TestimonialSkeleton = ({ className = "" }: { className?: string }) => (
  <div className={`flex-shrink-0 w-full md:w-1/2 lg:w-[30%] p-4 ${className}`}>
    <Card className="h-full">
      <CardContent className="p-6">
        <div className="flex items-center space-x-4 mb-4">
          <AvatarSkeleton size="h-12 w-12" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-3 w-32" />
          </div>
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      </CardContent>
    </Card>
  </div>
);

// Product skeleton
export const ProductSkeleton = ({ className = "" }: { className?: string }) => (
  <Card className={className}>
    <CardContent className="p-6">
      <ImageSkeleton className="h-48 w-full mb-4" />
      <div className="space-y-3">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
        <div className="flex justify-between items-center pt-4">
          <Skeleton className="h-6 w-20" />
          <ButtonSkeleton className="h-9 w-24" />
        </div>
      </div>
    </CardContent>
  </Card>
);

// Service skeleton
export const ServiceSkeleton = ({ className = "" }: { className?: string }) => (
  <Card className={className}>
    <CardContent className="p-6">
      <div className="flex items-center space-x-3 mb-4">
        <Skeleton className="h-12 w-12 rounded-lg" />
        <div className="space-y-2">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-3 w-24" />
        </div>
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>
    </CardContent>
  </Card>
);

// Admin table skeleton
export const AdminTableSkeleton = ({ 
  title = "Loading...",
  showAddButton = true,
  rows = 5,
  columns = 5
}: { 
  title?: string;
  showAddButton?: boolean;
  rows?: number;
  columns?: number;
}) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between">
      <div className="space-y-2">
        <Skeleton className="h-6 w-48" />
        <Skeleton className="h-4 w-64" />
      </div>
      {showAddButton && <ButtonSkeleton className="h-9 w-32" />}
    </CardHeader>
    <CardContent>
      <TableSkeleton rows={rows} columns={columns} />
    </CardContent>
  </Card>
);

// Loading spinner component
export const LoadingSpinner = ({ 
  size = "h-8 w-8",
  className = ""
}: { 
  size?: string;
  className?: string;
}) => (
  <div className={`flex items-center justify-center ${className}`}>
    <div className={`${size} animate-spin rounded-full border-4 border-gray-300 border-t-blue-600`}></div>
  </div>
);

// Full page loading
export const FullPageLoading = ({ 
  message = "Loading...",
  showSpinner = true
}: { 
  message?: string;
  showSpinner?: boolean;
}) => (
  <div className="flex h-screen items-center justify-center">
    <div className="text-center space-y-4">
      {showSpinner && <LoadingSpinner size="h-12 w-12" />}
      <p className="text-lg text-muted-foreground">{message}</p>
    </div>
  </div>
);