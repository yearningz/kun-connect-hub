import heroWhale from "@/assets/hero-whale.png";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-[var(--gradient-hero)]" />
      
      {/* World map pattern overlay */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_50%_50%,hsl(var(--primary))_1px,transparent_1px)] bg-[size:50px_50px]" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 animate-fade-in">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-foreground">
              Establishing a Next-Generation{" "}
              <span className="text-secondary">Global Digital Payment Network</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              To facilitate Cross-Border Transaction
            </p>
          </div>
          
          <div className="relative animate-float">
            <img 
              src={heroWhale} 
              alt="Futuristic digital whale representing global payment network" 
              className="w-full h-auto drop-shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
