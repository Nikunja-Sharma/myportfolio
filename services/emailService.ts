import emailjs from '@emailjs/browser';
import { ContactFormData } from '../types';
import { EMAILJS_CONFIG } from '../config/emailjs.config';

// Interface for email service response
export interface EmailServiceResponse {
  success: boolean;
  message: string;
  error?: string;
}

// Interface for form data persistence
export interface PersistedFormData extends ContactFormData {
  timestamp: number;
  attemptCount: number;
}

// Local storage key for form data persistence
const FORM_DATA_STORAGE_KEY = 'portfolio_contact_form_data';

/**
 * Initialize EmailJS with public key
 */
export const initializeEmailService = (): void => {
  try {
    emailjs.init(EMAILJS_CONFIG.publicKey);
  } catch (error) {
    console.error('Failed to initialize EmailJS:', error);
  }
};

/**
 * Send contact form data via EmailJS
 */
export const sendContactEmail = async (formData: ContactFormData): Promise<EmailServiceResponse> => {
  try {
    // Validate EmailJS configuration
    if (!EMAILJS_CONFIG.serviceId || !EMAILJS_CONFIG.templateId || !EMAILJS_CONFIG.publicKey) {
      throw new Error('EmailJS configuration is incomplete. Please check service ID, template ID, and public key.');
    }

    // Prepare template parameters for EmailJS
    const templateParams = {
      name: formData.name,        // {{name}} in template
      email: formData.email,      // {{email}} in template  
      subject: formData.subject,  // {{subject}} in template
      message: formData.message,  // {{message}} in template
      to_email: EMAILJS_CONFIG.recipientEmail, // Recipient email
      reply_to: formData.email,   // For reply-to functionality
    };

    // Send email via EmailJS
    const response = await emailjs.send(
      EMAILJS_CONFIG.serviceId,
      EMAILJS_CONFIG.templateId,
      templateParams,
      EMAILJS_CONFIG.publicKey
    );

    // Check if email was sent successfully
    if (response.status === 200) {
      // Clear any persisted form data on successful submission
      clearPersistedFormData();
      
      return {
        success: true,
        message: 'Message sent successfully! I\'ll get back to you within 24 hours.',
      };
    } else {
      throw new Error(`EmailJS returned status: ${response.status}`);
    }
  } catch (error) {
    console.error('Email sending failed:', error);
    
    // Persist form data on failure
    persistFormData(formData);
    
    // Return appropriate error message
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    
    return {
      success: false,
      message: 'Failed to send message. Your data has been saved and you can try again.',
      error: errorMessage,
    };
  }
};

/**
 * Persist form data to localStorage on submission failure
 */
export const persistFormData = (formData: ContactFormData): void => {
  try {
    const existingData = getPersistedFormData();
    const persistedData: PersistedFormData = {
      ...formData,
      timestamp: Date.now(),
      attemptCount: existingData ? existingData.attemptCount + 1 : 1,
    };
    
    localStorage.setItem(FORM_DATA_STORAGE_KEY, JSON.stringify(persistedData));
  } catch (error) {
    console.error('Failed to persist form data:', error);
  }
};

/**
 * Retrieve persisted form data from localStorage
 */
export const getPersistedFormData = (): PersistedFormData | null => {
  try {
    const storedData = localStorage.getItem(FORM_DATA_STORAGE_KEY);
    if (storedData) {
      const parsedData = JSON.parse(storedData) as PersistedFormData;
      
      // Check if data is not too old (24 hours)
      const isDataFresh = Date.now() - parsedData.timestamp < 24 * 60 * 60 * 1000;
      
      if (isDataFresh) {
        return parsedData;
      } else {
        // Clear old data
        clearPersistedFormData();
      }
    }
    return null;
  } catch (error) {
    console.error('Failed to retrieve persisted form data:', error);
    return null;
  }
};

/**
 * Clear persisted form data from localStorage
 */
export const clearPersistedFormData = (): void => {
  try {
    localStorage.removeItem(FORM_DATA_STORAGE_KEY);
  } catch (error) {
    console.error('Failed to clear persisted form data:', error);
  }
};

/**
 * Check if EmailJS is properly configured
 */
export const isEmailServiceConfigured = (): boolean => {
  return !!(
    EMAILJS_CONFIG.serviceId && 
    EMAILJS_CONFIG.templateId && 
    EMAILJS_CONFIG.publicKey &&
    EMAILJS_CONFIG.publicKey !== 'YOUR_EMAILJS_PUBLIC_KEY'
  );
};

/**
 * Get configuration status for debugging
 */
export const getConfigurationStatus = () => {
  return {
    serviceId: !!EMAILJS_CONFIG.serviceId,
    templateId: !!EMAILJS_CONFIG.templateId,
    publicKey: !!EMAILJS_CONFIG.publicKey && EMAILJS_CONFIG.publicKey !== 'YOUR_EMAILJS_PUBLIC_KEY',
    isConfigured: isEmailServiceConfigured(),
  };
};