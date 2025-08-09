const stats = [
  { value: "500+", label: "Vehicles in Fleet", icon: "🚚" },
  { value: "50K+", label: "Deliveries per Month", icon: "📦" },
  { value: "99.8%", label: "On-time Delivery Rate", icon: "⏰" },
  { value: "24/7", label: "Customer Support", icon: "📞" }
];

const StatsSection = () => {
  return (
    <section className="py-20 px-4 bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Trusted by Thousands
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Our commitment to excellence is reflected in our track record of success and customer satisfaction.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center group">
              <div className="text-5xl mb-4 group-hover:animate-bounce">{stat.icon}</div>
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2 group-hover:scale-110 transition-transform duration-300">
                {stat.value}
              </div>
              <div className="text-muted-foreground font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;