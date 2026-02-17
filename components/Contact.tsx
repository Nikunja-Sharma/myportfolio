import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Mail, Send, User, AlertCircle, CheckCircle, RefreshCw } from 'lucide-react';
import { ContactFormData } from '../types';
import { 
  sendContactEmail, 
  getPersistedFormData, 
  clearPersistedFormData,
  isEmailServiceConfigured,
  getConfigurationStatus
} from '../services/emailService';

interface ContactProps {
  onSubmit: (data: ContactFormData) => Promise<void>;
}

interface FormState {
  isSubmitting: boolean;
  isSuccess: boolean;
  error: string | null;
  hasPersistedData: boolean;
  configurationError: boolean;
}

export const Contact: React.FC<ContactProps> = ({ onSubmit }) => {
  const [formState, setFormState] = useState<FormState>({
    isSubmitting: false,
    isSuccess: false,
    error: null,
    hasPersistedData: false,
    configurationError: false
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue
  } = useForm<ContactFormData>({
    mode: 'onChange'
  });

  const watchedFields = watch();

  // Check for persisted form data and EmailJS configuration on component mount
  useEffect(() => {
    const persistedData = getPersistedFormData();
    const isConfigured = isEmailServiceConfigured();
    
    if (persistedData) {
      // Restore form data
      setValue('name', persistedData.name);
      setValue('email', persistedData.email);
      setValue('subject', persistedData.subject);
      setValue('message', persistedData.message);
      
      setFormState(prev => ({
        ...prev,
        hasPersistedData: true,
        error: `Previous submission failed. Data restored from ${new Date(persistedData.timestamp).toLocaleString()}. Attempt #${persistedData.attemptCount}`
      }));
    }

    if (!isConfigured) {
      setFormState(prev => ({
        ...prev,
        configurationError: true
      }));
      
      // Log configuration status for debugging
      console.warn('EmailJS configuration status:', getConfigurationStatus());
    }
  }, [setValue]);

  const onFormSubmit = async (data: ContactFormData) => {
    setFormState(prev => ({ 
      ...prev, 
      isSubmitting: true, 
      isSuccess: false, 
      error: null,
      hasPersistedData: false
    }));
    
    try {
      // Use the email service instead of the onSubmit prop
      const result = await sendContactEmail(data);
      
      if (result.success) {
        setFormState(prev => ({ 
          ...prev, 
          isSubmitting: false, 
          isSuccess: true, 
          error: null 
        }));
        reset();
      } else {
        throw new Error(result.error || result.message);
      }
    } catch (error) {
      setFormState(prev => ({ 
        ...prev, 
        isSubmitting: false, 
        isSuccess: false, 
        error: error instanceof Error ? error.message : 'Failed to send message. Please try again.',
        hasPersistedData: true
      }));
    }
  };

  const handleClearPersistedData = () => {
    clearPersistedFormData();
    reset();
    setFormState(prev => ({
      ...prev,
      hasPersistedData: false,
      error: null
    }));
  };

  const getFieldError = (fieldName: keyof ContactFormData) => {
    return errors[fieldName]?.message;
  };

  const isFieldValid = (fieldName: keyof ContactFormData) => {
    return !errors[fieldName] && watchedFields[fieldName] && watchedFields[fieldName].length > 0;
  };

  return (
    <section className="py-20 bg-surface">
      <div className="container mx-auto px-6 max-w-4xl">
        {/* Section Header */}
        <div className="flex items-center gap-4 mb-12">
          <div className="h-[1px] flex-1 bg-border" />
          <span className="font-mono text-textMuted text-sm tracking-[0.2em]">CONTACT</span>
          <div className="h-[1px] flex-1 bg-border" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Contact Information */}
          <div className="space-y-6 lg:space-y-8 order-2 lg:order-1">
            <div>
              <h2 className="text-2xl sm:text-3xl font-heading font-bold text-textPrimary mb-4">
                Let's Build Something
                <span className="text-primary">.</span>
              </h2>
              <p className="text-base sm:text-lg text-textMuted leading-relaxed">
                Ready to discuss your next project? I'm always interested in new opportunities 
                and collaborations. Drop me a message and let's create something amazing together.
              </p>
            </div>

            {/* Contact Details */}
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-center gap-3 text-textMuted">
                <Mail size={18} sm:size={20} className="text-primary flex-shrink-0" />
                <span className="font-mono text-sm sm:text-base break-all">xnikunja@gmail.com</span>
              </div>
              <div className="flex items-center gap-3 text-textMuted">
                <User size={18} sm:size={20} className="text-primary flex-shrink-0" />
                <span className="font-mono text-sm sm:text-base">+91 60030-75083</span>
              </div>
            </div>

            {/* Response Time */}
            <div className="p-3 sm:p-4 bg-background border border-border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-xs sm:text-sm font-mono text-textMuted">RESPONSE_TIME</span>
              </div>
              <p className="text-xs sm:text-sm text-textPrimary">
                Typically responds within 24 hours
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-background border border-border rounded-lg p-4 sm:p-6 lg:p-8 order-1 lg:order-2">
            <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4 sm:space-y-6">
              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block text-xs sm:text-sm font-mono text-textMuted mb-2 tracking-wider">
                  NAME *
                </label>
                <div className="relative">
                  <input
                    id="name"
                    type="text"
                    {...register('name', {
                      required: 'Name is required',
                      minLength: {
                        value: 2,
                        message: 'Name must be at least 2 characters'
                      }
                    })}
                    className={`w-full px-3 sm:px-4 py-2 sm:py-3 bg-surface border rounded-lg font-mono text-sm sm:text-base text-textPrimary placeholder-textMuted/50 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/50 ${
                      getFieldError('name') 
                        ? 'border-red-500 focus:border-red-500' 
                        : isFieldValid('name')
                        ? 'border-green-500 focus:border-green-500'
                        : 'border-border focus:border-primary'
                    }`}
                    placeholder="Your full name"
                  />
                  {isFieldValid('name') && (
                    <CheckCircle size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500" />
                  )}
                  {getFieldError('name') && (
                    <AlertCircle size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-red-500" />
                  )}
                </div>
                {getFieldError('name') && (
                  <p className="mt-1 text-xs sm:text-sm text-red-500 font-mono">{getFieldError('name')}</p>
                )}
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-xs sm:text-sm font-mono text-textMuted mb-2 tracking-wider">
                  EMAIL *
                </label>
                <div className="relative">
                  <input
                    id="email"
                    type="email"
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Please enter a valid email address'
                      }
                    })}
                    className={`w-full px-3 sm:px-4 py-2 sm:py-3 bg-surface border rounded-lg font-mono text-sm sm:text-base text-textPrimary placeholder-textMuted/50 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/50 ${
                      getFieldError('email') 
                        ? 'border-red-500 focus:border-red-500' 
                        : isFieldValid('email')
                        ? 'border-green-500 focus:border-green-500'
                        : 'border-border focus:border-primary'
                    }`}
                    placeholder="your.email@example.com"
                  />
                  {isFieldValid('email') && (
                    <CheckCircle size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500" />
                  )}
                  {getFieldError('email') && (
                    <AlertCircle size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-red-500" />
                  )}
                </div>
                {getFieldError('email') && (
                  <p className="mt-1 text-xs sm:text-sm text-red-500 font-mono">{getFieldError('email')}</p>
                )}
              </div>

              {/* Subject Field */}
              <div>
                <label htmlFor="subject" className="block text-xs sm:text-sm font-mono text-textMuted mb-2 tracking-wider">
                  SUBJECT *
                </label>
                <div className="relative">
                  <input
                    id="subject"
                    type="text"
                    {...register('subject', {
                      required: 'Subject is required',
                      minLength: {
                        value: 5,
                        message: 'Subject must be at least 5 characters'
                      }
                    })}
                    className={`w-full px-3 sm:px-4 py-2 sm:py-3 bg-surface border rounded-lg font-mono text-sm sm:text-base text-textPrimary placeholder-textMuted/50 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/50 ${
                      getFieldError('subject') 
                        ? 'border-red-500 focus:border-red-500' 
                        : isFieldValid('subject')
                        ? 'border-green-500 focus:border-green-500'
                        : 'border-border focus:border-primary'
                    }`}
                    placeholder="Project inquiry, collaboration, etc."
                  />
                  {isFieldValid('subject') && (
                    <CheckCircle size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500" />
                  )}
                  {getFieldError('subject') && (
                    <AlertCircle size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-red-500" />
                  )}
                </div>
                {getFieldError('subject') && (
                  <p className="mt-1 text-xs sm:text-sm text-red-500 font-mono">{getFieldError('subject')}</p>
                )}
              </div>

              {/* Message Field */}
              <div>
                <label htmlFor="message" className="block text-xs sm:text-sm font-mono text-textMuted mb-2 tracking-wider">
                  MESSAGE *
                </label>
                <div className="relative">
                  <textarea
                    id="message"
                    rows={5}
                    {...register('message', {
                      required: 'Message is required',
                      minLength: {
                        value: 10,
                        message: 'Message must be at least 10 characters'
                      }
                    })}
                    className={`w-full px-3 sm:px-4 py-2 sm:py-3 bg-surface border rounded-lg font-mono text-sm sm:text-base text-textPrimary placeholder-textMuted/50 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/50 resize-vertical ${
                      getFieldError('message') 
                        ? 'border-red-500 focus:border-red-500' 
                        : isFieldValid('message')
                        ? 'border-green-500 focus:border-green-500'
                        : 'border-border focus:border-primary'
                    }`}
                    placeholder="Tell me about your project, timeline, budget, or any questions you have..."
                  />
                  {isFieldValid('message') && (
                    <CheckCircle size={14} className="absolute right-3 top-3 text-green-500" />
                  )}
                  {getFieldError('message') && (
                    <AlertCircle size={14} className="absolute right-3 top-3 text-red-500" />
                  )}
                </div>
                {getFieldError('message') && (
                  <p className="mt-1 text-xs sm:text-sm text-red-500 font-mono">{getFieldError('message')}</p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={formState.isSubmitting}
                className="w-full px-6 sm:px-8 py-3 sm:py-4 bg-primary text-background font-bold font-mono uppercase tracking-wider hover:bg-white transition-colors flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
              >
                {formState.isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-background border-t-transparent rounded-full animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message
                    <Send size={18} className="group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>

              {/* Success Message */}
              {formState.isSuccess && (
                <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                  <div className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-green-500" />
                    <span className="text-sm font-mono text-green-500">MESSAGE_SENT</span>
                  </div>
                  <p className="text-sm text-textPrimary mt-1">
                    Thank you for your message! I'll get back to you within 24 hours.
                  </p>
                </div>
              )}

              {/* Configuration Error */}
              {formState.configurationError && (
                <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                  <div className="flex items-center gap-2">
                    <AlertCircle size={16} className="text-yellow-500" />
                    <span className="text-sm font-mono text-yellow-500">CONFIG_WARNING</span>
                  </div>
                  <p className="text-sm text-textPrimary mt-1">
                    Email service is not fully configured. Messages will be processed but may not be delivered.
                  </p>
                </div>
              )}

              {/* Persisted Data Notice */}
              {formState.hasPersistedData && !formState.isSuccess && (
                <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <RefreshCw size={16} className="text-blue-500" />
                      <span className="text-sm font-mono text-blue-500">DATA_RESTORED</span>
                    </div>
                    <button
                      type="button"
                      onClick={handleClearPersistedData}
                      className="text-xs text-blue-500 hover:text-blue-400 underline"
                    >
                      Clear
                    </button>
                  </div>
                  <p className="text-sm text-textPrimary mt-1">
                    Form data has been restored from a previous failed submission.
                  </p>
                </div>
              )}

              {/* Error Message */}
              {formState.error && !formState.hasPersistedData && (
                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                  <div className="flex items-center gap-2">
                    <AlertCircle size={16} className="text-red-500" />
                    <span className="text-sm font-mono text-red-500">SEND_FAILED</span>
                  </div>
                  <p className="text-sm text-textPrimary mt-1">
                    {formState.error}
                  </p>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};