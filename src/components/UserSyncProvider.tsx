'use client';
import { useUser } from '@clerk/nextjs';
import { useEffect, useState } from 'react';

interface UserSyncProviderProps {
  children: React.ReactNode;
}

export default function UserSyncProvider({ children }: UserSyncProviderProps) {
  const { user, isLoaded } = useUser();
  const [synced, setSynced] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isLoaded || !user || synced) return;

    const email = user.emailAddresses[0]?.emailAddress;
    if (!email || !user.id) {
      console.warn('User email or ID missing, skipping sync');
      return;
    }

    const currentUser = user;
    
    let retries = 0;
    const maxRetries = 3;
    const retryDelay = 2000;

    async function attemptSync() {
      console.log('Starting sync attempt', retries + 1, 'of', maxRetries);
      
      const requestBody = {
        userId: currentUser.id,
        email,
        fullName: `${currentUser.firstName || ''} ${currentUser.lastName || ''}`.trim() || null,
        avatarUrl: currentUser.imageUrl || null,
      };

      console.log('Request body:', JSON.stringify(requestBody, null, 2));

      try {
        const response = await fetch('/api/sync-user', {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
        });

        console.log('Response status code:', response.status);
        console.log('Response status text:', response.statusText);
        console.log('Response ok:', response.ok);
        
        // Log semua headers dengan proper typing
        const headers: Record<string, string> = {};
        response.headers.forEach((value, key) => {
          headers[key] = value;
        });
        console.log('All response headers:', headers);

        const responseText = await response.text();
        console.log('Raw response text length:', responseText.length);
        console.log('Raw response text:', responseText);

        let data: any;
        try {
          data = responseText ? JSON.parse(responseText) : {};
        } catch (parseError) {
          console.error('Failed to parse JSON response:', parseError);
          console.error('Response was not valid JSON:', responseText);
          
          if (retries < maxRetries) {
            retries++;
            console.log('Retrying due to JSON parse error. Attempt', retries, 'of', maxRetries);
            setTimeout(attemptSync, retryDelay);
            return;
          } else {
            setError('Invalid response format from server');
            return;
          }
        }

        console.log('Parsed response data:', JSON.stringify(data, null, 2));

        if (response.ok) {
          if (data.success !== false) {
            console.log('User sync successful');
            setSynced(true);
            setError(null);
          } else {
            console.error('Server returned success: false', data);
            
            if (retries < maxRetries) {
              retries++;
              console.log('Retrying due to success: false. Attempt', retries, 'of', maxRetries);
              setTimeout(attemptSync, retryDelay);
            } else {
              setError(data.error || 'Unknown server error');
            }
          }
        } else {
          // Error response - log detail yang lebih lengkap
          console.error('HTTP Error Details:');
          console.error('- Status Code:', response.status);
          console.error('- Status Text:', response.statusText);
          console.error('- Response Body:', data);
          console.error('- Raw Response:', responseText);
          
          // Cek status code spesifik
          if (response.status === 500) {
            console.error('Internal Server Error - Check server logs');
          } else if (response.status === 404) {
            console.error('API endpoint not found');
          } else if (response.status === 400) {
            console.error('Bad Request - Invalid data sent');
          } else if (response.status === 401) {
            console.error('Unauthorized - Authentication required');
          } else if (response.status === 403) {
            console.error('Forbidden - Access denied');
          }

          if (retries < maxRetries) {
            retries++;
            console.log('Retrying due to HTTP error. Attempt', retries, 'of', maxRetries);
            setTimeout(attemptSync, retryDelay);
          } else {
            setError(`Server error: ${response.status} ${response.statusText}`);
          }
        }

      } catch (networkError) {
        console.error('Network error during sync:', networkError);
        
        if (retries < maxRetries) {
          retries++;
          console.log('Retrying due to network error. Attempt', retries, 'of', maxRetries);
          setTimeout(attemptSync, retryDelay);
        } else {
          setError('Network connection failed');
        }
      }
    }

    attemptSync();
  }, [user, isLoaded, synced]);

  if (error) {
    console.error('User sync failed permanently:', error);
  }

  return <>{children}</>;
}