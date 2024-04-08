import styled from 'styled-components';
import Wrapper from '../assets/wrappers/LandingPage';
import main from '../assets/images/main.svg';
import { Link } from 'react-router-dom';
import { Logo } from '../components';

const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>
      <div className='container page'>
        <div className='info'>
          <h1>
            J-Learn <span>Student</span> portal
          </h1>
          <p>
          J-Learn: Your Key to Academic Success. Seamlessly navigate your educational journey with our intuitive platform. Access resources, track progress, and connect with peers all in one place. Unlock your potential and thrive with J-Learn.
          </p>
          <Link to='/register' className='btn register-link'>
            Register
          </Link>
          <Link to='/login' className='btn '>
            Login
          </Link>
        </div>
        <img src={main} alt='course hunt' className='img main-img' />
      </div>
    </Wrapper>
  );
};

export default Landing;
