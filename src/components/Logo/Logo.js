
import Tilt from 'react-parallax-tilt';
import brain from './brain_icon.png'
import './Logo.css'

const Logo = () => {
    return(
        <div className='ma4 mt0'>
    <Tilt  
        className="parallax-effect-glare-scale"
        perspective={500}
        glareEnable={true}
        glareMaxOpacity={0.45}
        scale={1.02}>
    <div className='br2 shadow-2 pa3'>
        <img src = {brain} alt = 'brain logo'/>
    </div>
   
    </Tilt>
        </div>

    );
  
}
 
export default Logo;