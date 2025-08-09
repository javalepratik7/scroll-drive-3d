import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const ContactSection = () => {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-muted/20 to-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Get In Touch
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Ready to optimize your logistics? Contact us today for a customized transportation solution.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Contact Form */}
          <Card className="transport-card">
            <CardHeader>
              <CardTitle className="text-2xl text-primary">Send us a Message</CardTitle>
              <CardDescription>
                We'll get back to you within 24 hours with a detailed quote and consultation.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <Input placeholder="First Name" className="border-border focus:border-primary" />
                <Input placeholder="Last Name" className="border-border focus:border-primary" />
              </div>
              <Input placeholder="Email Address" type="email" className="border-border focus:border-primary" />
              <Input placeholder="Company Name" className="border-border focus:border-primary" />
              <Textarea 
                placeholder="Tell us about your transportation needs..." 
                rows={4}
                className="border-border focus:border-primary resize-none"
              />
              <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground transport-glow">
                Request Quote
              </Button>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-8">
            <Card className="transport-card">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="text-3xl">📍</div>
                  <div>
                    <h3 className="text-lg font-semibold text-primary">Headquarters</h3>
                    <p className="text-muted-foreground">
                      1234 Transport Way<br />
                      Logistics City, LC 12345
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="transport-card">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="text-3xl">📞</div>
                  <div>
                    <h3 className="text-lg font-semibold text-primary">Phone</h3>
                    <p className="text-muted-foreground">
                      +1 (555) 123-4567<br />
                      24/7 Emergency Line
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="transport-card">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="text-3xl">✉️</div>
                  <div>
                    <h3 className="text-lg font-semibold text-primary">Email</h3>
                    <p className="text-muted-foreground">
                      info@transportpro.com<br />
                      quotes@transportpro.com
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;