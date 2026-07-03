interface LogoProps {
  className?: string;
}

export function Logo({ className = "" }: LogoProps) {
  return (
    <img
      src="public\utils\logo-h.png"
      alt="Abrar Studio"
      className={`h-8 w-auto ${className}`}
    />
  );
}
