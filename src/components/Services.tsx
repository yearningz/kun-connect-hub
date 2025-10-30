const services = [
  {
    title: "Service Industry",
    subtitle: "Advertising, Entertainment",
  },
  {
    title: "Wholesale / Ecommerce Trade",
    subtitle: "Cross-border B2B, Marketplace",
  },
  {
    title: "Payment Service Provider",
    subtitle: "Emerging Markets Payment Institutions, OTCs",
  },
  {
    title: "Web3 Industry",
    subtitle: "Projects, Exchanges, Wallets",
  },
];

const Services = () => {
  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            The Bridge to Accelerate{" "}
            <span className="text-secondary">Cross-Border Payments</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="group p-8 rounded-2xl bg-card border border-border shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-lg)] transition-all duration-300 hover:-translate-y-1"
            >
              <div className="space-y-3">
                <h3 className="text-xl font-bold text-foreground group-hover:text-secondary transition-colors">
                  {service.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {service.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-lg font-semibold text-foreground mb-4">
            Integrated Web2 + Web3 Payment Solutions Addressing Emerging Markets
          </p>
          <div className="flex justify-center gap-8 text-muted-foreground">
            <span className="text-lg">Asia</span>
            <span className="text-lg">Africa</span>
            <span className="text-lg">Latin America</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
