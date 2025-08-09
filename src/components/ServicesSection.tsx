import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const services = [
  {
    title: "Freight Transport",
    description: "Reliable nationwide freight delivery with real-time tracking and professional handling.",
    features: ["24/7 Tracking", "Secure Handling", "On-time Delivery"],
    icon: "🚛"
  },
  {
    title: "Logistics Management",
    description: "End-to-end supply chain solutions optimized for efficiency and cost-effectiveness.",
    features: ["Route Optimization", "Inventory Management", "Cost Analysis"],
    icon: "📦"
  },
  {
    title: "Express Delivery",
    description: "Fast delivery services for urgent shipments with guaranteed time windows.",
    features: ["Same Day Delivery", "Priority Handling", "Emergency Response"],
    icon: "⚡"
  }
];

const ServicesSection = () => {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-background to-muted/20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Our Services
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Comprehensive transportation solutions designed to meet your business needs with precision and reliability.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="transport-card hover:border-primary/50 transition-all duration-300">
              <CardHeader className="text-center">
                <div className="text-6xl mb-4">{service.icon}</div>
                <CardTitle className="text-2xl text-primary">{service.title}</CardTitle>
                <CardDescription className="text-muted-foreground">
                  {service.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 justify-center">
                  {service.features.map((feature, idx) => (
                    <Badge key={idx} variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                      {feature}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;