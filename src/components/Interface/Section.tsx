interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export const Section = ({ children, className = '', id }: SectionProps) => (
  <section id={id} className={`py-20 ${className}`}>
    {children}
  </section>
);
