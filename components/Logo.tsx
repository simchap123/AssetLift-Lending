interface LogoProps {
  className?: string;
  size?: number;
}

const Logo = ({ className = "", size = 40 }: LogoProps) => {
  const imgStyle = { height: size, width: 'auto', objectFit: 'contain' as const };

  return (
    <span className={className}>
      <img
        src="/logo.png"
        alt="Asset Lift Lending"
        className="dark:hidden"
        style={imgStyle}
      />
      <img
        src="/logo-new.jpg"
        alt="Asset Lift Lending"
        className="hidden dark:block rounded-lg"
        style={imgStyle}
      />
    </span>
  );
};

export default Logo;
