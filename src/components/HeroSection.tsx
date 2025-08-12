import { Button } from "@/components/ui/button";
import TruckScene from "./TruckScene";
import { useScrollHijack } from "@/hooks/useScrollHijack";
import { useRef, useState } from "react";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Slider from "@mui/material/Slider";
import VolumeDown from "@mui/icons-material/VolumeDown";
import VolumeUp from "@mui/icons-material/VolumeUp";

import CircularSlider from "@fseehawer/react-circular-slider";

import gsap from "gsap";

const HeroSection = () => {
  const [value, setValue] = useState(0);
  const [click, setClick] = useState(false);
  const [stop, setStop] = useState(false);
  const volumeBoxRef = useRef(null);

  const handleChange = (event, newValue) => {
    console.log("printing new value ", newValue);
    setValue(newValue);
    if (newValue >= 40) {
      gsap.from(volumeBoxRef.current, {
        duration: 6,
        opacity: 0,
        ease: "power2.out",
      });
      setClick(true);
    }
  };

  return (
    <section
      // ref={sectionRef}
      className="hero-section relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <div className="relative w-full h-screen">
        <TruckScene data={click} />

        <div
          onClick={() => setClick(!click)}
          className="absolute top-5 left-5 z-10 text-white cursor-pointer"
        >
          start
        </div>

        {/* Horizontal slider */}
        <Box
          ref={volumeBoxRef}
          sx={{
            position: "absolute",
            bottom: 100,
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 20,
            width: 300,
          }}
        >
          <Stack
            spacing={2}
            direction="row"
            sx={{ alignItems: "center", mb: 1 }}
          >
            <Slider
              aria-label="Volume"
              value={value}
              onChange={handleChange}
              sx={{ color: "#e38ff7" }}
            />
          </Stack>
        </Box>

        {/* Circular slider */}
                  <div 
              style={{ 
                position: 'absolute', 
                top: '40%', 
                left: '50%', 
                transform: 'translate(-50%, -50%)', 
                zIndex: 30, 
                width: '900px', 
                height:"400px",
                overflow:"hidden",
              }}
            >
              
                {/* <div style={{transform:"rotate(80deg)"}}>
                    <CircularSlider
                    width={880}
                    arcLength={180}
                    startAngle={180}
                      direction={1}
                    knobColor="#e38ff7"
                    progressColorFrom="#e38ff7"
                    progressColorTo="#e38ff7"
                    trackColor="#555"
                    knobSize={36}
                    dataIndex={0}
                    label=""                  // Remove label
                    hideLabelValue={true}     // Remove numeric value
                  />
              </div> */}
            </div>
      </div>
    </section>
  );
};

export default HeroSection;
