import { OAuthButton } from './oauth-button';

interface OAuthSectionProps {
  onOAuthLogin: (provider: 'google' | 'github') => void;
  isLoading?: boolean;
  variant?: 'login' | 'register';
}

export function OAuthSection({
  onOAuthLogin,
  isLoading = false,
  variant = 'login',
}: OAuthSectionProps) {
  return (
    <div className="space-y-3">
      <OAuthButton
        provider="google"
        onClick={() => onOAuthLogin('google')}
        isLoading={isLoading}
        variant={variant}
      />
      <OAuthButton
        provider="github"
        onClick={() => onOAuthLogin('github')}
        isLoading={isLoading}
        variant={variant}
      />
    </div>
  );
}
