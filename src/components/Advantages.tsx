const advantages = [
  {
    title: "Industry Focus",
    points: ["Cross-Border B2B", "Entertainment", "Advertising", "Web3"],
  },
  {
    title: "Trustworthy",
    points: ["Licensed", "Compliant", "Security Assurance", "Full Chain Protection"],
  },
  {
    title: "Efficient and Convenient",
    points: ["All-in-one Platform", "User-Friendly", "Web2+Web3 Integrated"],
  },
  {
    title: "Customer Centric",
    points: ["24/7 Support", "Advisory-Style", "Customer Service"],
  },
];

const Advantages = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            Four Major Advantages for Our Clients
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {advantages.map((advantage, index) => (
            <div
              key={index}
              className="p-8 rounded-2xl bg-[var(--gradient-card)] border border-border shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-lg)] transition-all duration-300 hover:-translate-y-1"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center">
                  <div className="w-6 h-6 rounded-full bg-secondary" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">
                  {advantage.title}
                </h3>
                <ul className="space-y-2">
                  {advantage.points.map((point, i) => (
                    <li key={i} className="text-muted-foreground">
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Advantages;
