import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/APIService';
import AuthFormContainer from '../../components/form/AuthFormContainer';
import FormInput from '../../components/form/FormInput';
import FormError from '../../components/form/FormError';
import SubmitButton from '../../components/props/SubmitButton';
import AuthLinkFooter from '../../components/props/AuthLinkFooter';

const RegisterPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone_number: '',
    password: '',
    password_confirmation: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      // Validate passwords match
      if (formData.password !== formData.password_confirmation) {
        throw new Error('Passwords do not match');
      }
      
      await api.register(formData);
      navigate('/login', { 
        state: { message: 'Registration successful! Please login with your new account.' }
      });
    } catch (err: any) {
      if (err.response && err.response.data) {
        if (err.response.data.errors) {
          const errorMessages = Object.values(err.response.data.errors)
            .flat()
            .join('. ');
          setError(errorMessages);
        } else {
          setError(err.response.data.message || 'Registration failed');
        }
      } else {
        setError(err.message || 'Registration failed');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthFormContainer title="Create an Account">
      <FormError error={error} />
      
      <form onSubmit={handleSubmit}>
        <FormInput
          id="name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          label="Name"
          required={true}
        />
        
        <FormInput
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          label="Email"
          required={true}
        />
        
        <FormInput
          id="phone_number"
          name="phone_number"
          type="tel"
          value={formData.phone_number}
          onChange={handleChange}
          label="Phone Number"
          required={true}
        />
        
        <FormInput
          id="password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          label="Password"
          required={true}
          minLength={8}
        />
        
        <FormInput
          id="password_confirmation"
          name="password_confirmation"
          type="password"
          value={formData.password_confirmation}
          onChange={handleChange}
          label="Confirm Password"
          required={true}
        />
        
        <SubmitButton
          loading={loading}
          loadingText="Creating Account..."
          text="Register"
        />
      </form>
      
      <AuthLinkFooter
        promptText="Already have an account?"
        linkText="Login"
        linkTo="/login"
      />
    </AuthFormContainer>
  );
};

export default RegisterPage;