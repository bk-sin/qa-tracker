import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface UserAvatarProps {
  src?: string;
  alt: string;
  fallback: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function UserAvatar({
  src,
  alt,
  fallback,
  size = 'md',
  className,
}: UserAvatarProps) {
  const sizeClasses = {
    sm: 'h-6 w-6',
    md: 'h-8 w-8',
    lg: 'h-10 w-10',
  };

  const fallbackSizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
  };

  return (
    <Avatar className={`${sizeClasses[size]} ${className || ''}`}>
      <AvatarImage src={src || '/placeholder.svg'} alt={alt} />
      <AvatarFallback className={fallbackSizeClasses[size]}>
        {fallback}
      </AvatarFallback>
    </Avatar>
  );
}
