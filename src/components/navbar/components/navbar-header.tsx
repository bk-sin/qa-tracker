import { Button } from '@/components/ui/button';

interface NavbarHeaderProps {
  title: string;
  subtitle: string;
}

export function NavbarHeader({ title, subtitle }: NavbarHeaderProps) {
  return (
    <Button
      variant="ghost"
      className="h-auto flex-col items-start p-0 hover:bg-transparent"
      onClick={() => (window.location.href = '/')}
    >
      <h1 className="text-foreground text-3xl font-bold">{title}</h1>
      <p className="text-muted-foreground">{subtitle}</p>
    </Button>
  );
}
