import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import AuthFormContainer from '../../components/form/AuthFormContainer';
import FormInput from '../../components/form/FormInput';
import FormError from '../../components/form/FormError';
import SubmitButton from '../../components/props/SubmitButton';
import AuthLinkFooter from '../../components/props/AuthLinkFooter';

const LoginPage: React.FC = () => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const loginData = {
        login: identifier.trim(),
        password
      };

      await login(loginData);
      
      // Redirect to Homepage
      const redirectTo = location.state?.from?.pathname || '/';
      navigate(redirectTo);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthFormContainer title="Welcome Back">
      <FormError error={error} />
      
      <form onSubmit={handleSubmit}>
        <FormInput
          id="identifier"
          name="identifier"
          type="text"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
          label="Email or Phone Number"
          required={true}
        />
        
        <FormInput
          id="password"
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          label="Password"
          required={true}
        />
        
        <SubmitButton
          loading={loading}
          loadingText="Logging in..."
          text="Login"
        />
      </form>
      
      <AuthLinkFooter
        promptText="Don't have an account?"
        linkText="Register"
        linkTo="/register"
      />
    </AuthFormContainer>
  );
};

export default LoginPage;