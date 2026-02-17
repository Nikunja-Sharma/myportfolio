/**
 * Email Service Tests
 * 
 * These tests verify the email service functionality including:
 * - Form data persistence
 * - Configuration validation
 * - Error handling
 */

import { 
  persistFormData, 
  getPersistedFormData, 
  clearPersistedFormData,
  isEmailServiceConfigured,
  getConfigurationStatus
} from '../emailService';
import { ContactFormData } from '../../types';

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};

// @ts-ignore
global.localStorage = localStorageMock;

describe('Email Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Form Data Persistence', () => {
    const mockFormData: ContactFormData = {
      name: 'John Doe',
      email: 'john@example.com',
      subject: 'Test Subject',
      message: 'Test message content'
    };

    it('should persist form data to localStorage', () => {
      persistFormData(mockFormData);
      
      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'portfolio_contact_form_data',
        expect.stringContaining('"name":"John Doe"')
      );
    });

    it('should retrieve persisted form data', () => {
      const persistedData = {
        ...mockFormData,
        timestamp: Date.now(),
        attemptCount: 1
      };
      
      localStorageMock.getItem.mockReturnValue(JSON.stringify(persistedData));
      
      const result = getPersistedFormData();
      
      expect(result).toEqual(persistedData);
      expect(localStorageMock.getItem).toHaveBeenCalledWith('portfolio_contact_form_data');
    });

    it('should return null for expired data', () => {
      const expiredData = {
        ...mockFormData,
        timestamp: Date.now() - (25 * 60 * 60 * 1000), // 25 hours ago
        attemptCount: 1
      };
      
      localStorageMock.getItem.mockReturnValue(JSON.stringify(expiredData));
      
      const result = getPersistedFormData();
      
      expect(result).toBeNull();
      expect(localStorageMock.removeItem).toHaveBeenCalledWith('portfolio_contact_form_data');
    });

    it('should clear persisted form data', () => {
      clearPersistedFormData();
      
      expect(localStorageMock.removeItem).toHaveBeenCalledWith('portfolio_contact_form_data');
    });

    it('should handle localStorage errors gracefully', () => {
      localStorageMock.setItem.mockImplementation(() => {
        throw new Error('Storage quota exceeded');
      });
      
      // Should not throw
      expect(() => persistFormData(mockFormData)).not.toThrow();
    });
  });

  describe('Configuration Validation', () => {
    it('should detect incomplete configuration', () => {
      // Mock environment variables not being set
      const isConfigured = isEmailServiceConfigured();
      
      // Should be false with default placeholder values
      expect(isConfigured).toBe(false);
    });

    it('should provide configuration status', () => {
      const status = getConfigurationStatus();
      
      expect(status).toHaveProperty('serviceId');
      expect(status).toHaveProperty('templateId');
      expect(status).toHaveProperty('publicKey');
      expect(status).toHaveProperty('isConfigured');
    });
  });

  describe('Error Handling', () => {
    it('should handle JSON parsing errors in getPersistedFormData', () => {
      localStorageMock.getItem.mockReturnValue('invalid json');
      
      const result = getPersistedFormData();
      
      expect(result).toBeNull();
    });

    it('should handle localStorage access errors', () => {
      localStorageMock.getItem.mockImplementation(() => {
        throw new Error('localStorage not available');
      });
      
      const result = getPersistedFormData();
      
      expect(result).toBeNull();
    });
  });
});

// Integration test for form data persistence workflow
describe('Form Data Persistence Workflow', () => {
  const mockFormData: ContactFormData = {
    name: 'Jane Smith',
    email: 'jane@example.com',
    subject: 'Integration Test',
    message: 'Testing the complete workflow'
  };

  beforeEach(() => {
    jest.clearAllMocks();
    localStorageMock.getItem.mockReturnValue(null);
  });

  it('should complete full persistence workflow', () => {
    // 1. Initially no data
    expect(getPersistedFormData()).toBeNull();
    
    // 2. Persist data
    persistFormData(mockFormData);
    expect(localStorageMock.setItem).toHaveBeenCalled();
    
    // 3. Mock the stored data for retrieval
    const storedData = {
      ...mockFormData,
      timestamp: Date.now(),
      attemptCount: 1
    };
    localStorageMock.getItem.mockReturnValue(JSON.stringify(storedData));
    
    // 4. Retrieve data
    const retrieved = getPersistedFormData();
    expect(retrieved).toEqual(storedData);
    
    // 5. Clear data
    clearPersistedFormData();
    expect(localStorageMock.removeItem).toHaveBeenCalledWith('portfolio_contact_form_data');
  });

  it('should increment attempt count on multiple failures', () => {
    // First failure
    persistFormData(mockFormData);
    
    const firstCall = localStorageMock.setItem.mock.calls[0][1];
    const firstData = JSON.parse(firstCall);
    expect(firstData.attemptCount).toBe(1);
    
    // Mock existing data for second failure
    localStorageMock.getItem.mockReturnValue(firstCall);
    
    // Second failure
    persistFormData(mockFormData);
    
    const secondCall = localStorageMock.setItem.mock.calls[1][1];
    const secondData = JSON.parse(secondCall);
    expect(secondData.attemptCount).toBe(2);
  });
});