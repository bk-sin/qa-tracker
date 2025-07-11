interface LoginHeaderProps {
  title?: string;
  subtitle?: string;
}

export function AuthHeader({
  title = 'QA Tracker',
  subtitle = 'Inicia sesión en tu cuenta',
}: LoginHeaderProps) {
  return (
    <div className="space-y-2 text-center">
      <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
      <p className="text-gray-600">{subtitle}</p>
    </div>
  );
}
