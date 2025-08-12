import HeroSection from '@/components/HeroSection';
import ServicesSection from '@/components/ServicesSection';
import StatsSection from '@/components/StatsSection';
import ContactSection from '@/components/ContactSection';
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from 'react';
import ShipSectipn from '@/components/ShipSectipn';

gsap.registerPlugin(ScrollTrigger);



const Index = () => {

  useEffect(()=>{
    gsap.to(".section2 .innerDiv",{
   transform:"translateX(-150%)",
  // duration:50,
  scrollTrigger:{
      trigger:".section2",
      scroller:"body",
      markers:true,
      start:"top 0%",
      end:"bottom -250%",
      scrub:2,
      pin:true
  }})
  },[])

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section with 3D Truck */}
      <div className='section2 w-[100vw] h-[1vh] bg-white'>
        <div className="innerDiv"></div>
          <HeroSection />
      </div>
      <div className='section2 w-[100vw] h-[1vh] bg-white'>
        <div className="innerDiv"></div>
          <div style={{height:"100vh"}}>
          <ShipSectipn/>
          </div>
      </div>
      
      {/* Services Section */}
      <ServicesSection  />
      
      {/* Statistics Section */}
      <StatsSection />

      {/* ship section */}
      
      {/* <div style={{height:"100vh"}}>
      <ShipSectipn/>
      </div> */}
      
      {/* Contact Section */}
      <ContactSection />
      
      {/* Footer */}
      <footer className="py-12 px-4 bg-card border-t border-border">
        <div className="max-w-6xl mx-auto text-center">
          <div className="text-2xl font-bold text-primary mb-4">TransportPro</div>
          <p className="text-muted-foreground mb-6">
            Professional logistics solutions for the modern world
          </p>
          <div className="flex justify-center gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-primary transition-colors">Contact</a>
          </div>
          <div className="mt-6 pt-6 border-t border-border text-sm text-muted-foreground">
            © 2024 TransportPro. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
