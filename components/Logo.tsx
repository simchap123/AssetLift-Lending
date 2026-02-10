interface LogoProps {
  className?: string;
  size?: number;
}

const Logo = ({ className = "", size = 40 }: LogoProps) => {
  return (
    <img
      src="/logo-new.jpg"
      alt="Asset Lift Lending"
      className={`rounded-lg ${className}`}
      style={{
        height: size,
        width: 'auto',
        objectFit: 'contain',
      }}
    />
  );
};

export default Logo;
