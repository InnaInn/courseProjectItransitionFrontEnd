import { useState, useEffect } from 'react';

export const SessionManager = {
    getSessionId() {
        return sessionStorage.getItem('x-session-id');
    },
    setSessionId(sessionId) {
        if (sessionId) {
            sessionStorage.setItem('x-session-id', sessionId);
        }
    },
    setUser(userData) {
        sessionStorage.setItem('user', JSON.stringify(userData));
    },
    getUser() {
        const user = sessionStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    },
    clearSession() {
        sessionStorage.removeItem('x-session-id');
        sessionStorage.removeItem('user');
    }
};

export const useAuth = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const saved = SessionManager.getUser();
    if (saved) {
      setUser(saved);
    }
  }, []);

  const login = (userData, sessionId) => {
    setUser(userData);
    SessionManager.setUser(userData);
    if (sessionId) {
      SessionManager.setSessionId(sessionId);
    }
  };

  const logout = () => {
    setUser(null);
    SessionManager.clearSession();
  };

  return { user, login, logout };
};

export async function fetchWithSession(url, options = {}) {
    const sessionId = SessionManager.getSessionId();
    
    const headers = {
        'Content-Type': 'application/json',
        ...options.headers
    };
    
    if (sessionId) {
        headers['x-session-id'] = sessionId;
    }
    
    const response = await fetch(url, {
        ...options,
        headers
    });
    
    const newSessionId = response.headers.get('x-session-id');
    if (newSessionId) {
        SessionManager.setSessionId(newSessionId);
    }
    
    return response;
}