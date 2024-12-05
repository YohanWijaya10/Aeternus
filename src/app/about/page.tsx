import Link from 'next/link';
import CreateJobComponent  from "../../components/add";
import { ParticleBackground } from "../../components/ui/particle-background"
import { AnimatedGradient } from "../../components/ui/animated-gradient"
import { InteractiveBackground } from "../../components/ui/interactive-background"



export default function Abouts() {
  return (
    <div  className='bg-[#1c202e]'>
        <CreateJobComponent/>
     
    </div>
  );
}
