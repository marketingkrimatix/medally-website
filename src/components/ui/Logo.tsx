import { type FC } from 'react';

interface LogoProps {
  className?: string;
}

export const Logo: FC<LogoProps> = ({ className }) => (
  <div className={`relative ${className}`}>
    <img 
      src="/logo-v1.svg" 
      alt="MedAlly Logo" 
      width="40" 
      height="40"
      className="w-auto h-[3.5rem]"
    />
  </div>
); 