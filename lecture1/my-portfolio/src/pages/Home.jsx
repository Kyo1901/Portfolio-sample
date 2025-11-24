import { Box } from '@mui/material';
import HeroSection from '../components/sections/HeroSection';
import AboutMeSection from '../components/sections/AboutMeSection';
import SkillTreeSection from '../components/sections/SkillTreeSection';
import ProjectsSection from '../components/sections/ProjectsSection';
import ContactSection from '../components/sections/ContactSection';

function Home() {
  return (
    <Box>
      <HeroSection />
      <AboutMeSection />
      <SkillTreeSection />
      <ProjectsSection />
      <ContactSection />
    </Box>
  );
}

export default Home;
