const services = [
  {
    title: "服务行业",
    subtitle: "广告、娱乐",
  },
  {
    title: "批发/电商贸易",
    subtitle: "跨境B2B、市场平台",
  },
  {
    title: "支付服务商",
    subtitle: "新兴市场支付机构、场外交易",
  },
  {
    title: "Web3行业",
    subtitle: "项目、交易所、钱包",
  },
];

const Services = () => {
  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            加速{" "}
            <span className="text-secondary">跨境支付</span>
            的桥梁
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
            整合Web2 + Web3支付解决方案，面向新兴市场
          </p>
          <div className="flex justify-center gap-8 text-muted-foreground">
            <span className="text-lg">亚洲</span>
            <span className="text-lg">非洲</span>
            <span className="text-lg">拉丁美洲</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
