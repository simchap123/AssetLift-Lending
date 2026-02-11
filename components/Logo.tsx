interface LogoProps {
  className?: string;
  size?: number;
}

const Logo = ({ className = "", size = 40 }: LogoProps) => {
  return (
    <img
      src="/logo.png"
      alt="Asset Lift Lending"
      className={className}
      style={{
        height: size,
        width: 'auto',
        objectFit: 'contain',
      }}
    />
  );
};

export default Logo;
