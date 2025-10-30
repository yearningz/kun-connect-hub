const advantages = [
  {
    title: "行业聚焦",
    points: ["跨境B2B", "娱乐", "广告", "Web3"],
  },
  {
    title: "值得信赖",
    points: ["持牌合规", "安全保障", "全链路防护", "风险管控"],
  },
  {
    title: "高效便捷",
    points: ["一站式平台", "用户友好", "Web2+Web3集成"],
  },
  {
    title: "客户至上",
    points: ["7×24小时支持", "顾问式服务", "专属客服"],
  },
];

const Advantages = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            为客户提供四大优势
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
