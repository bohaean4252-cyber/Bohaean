import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { doc, onSnapshot, collection, query, orderBy } from 'firebase/firestore';
import { auth, db } from './lib/firebase';
import { SiteConfig, Service, Stat, PortfolioItem, UserProfile } from './types';

interface FirebaseContextType {
  user: User | null;
  userProfile: UserProfile | null;
  isAuthReady: boolean;
  siteConfig: SiteConfig | null;
  services: Service[];
  stats: Stat[];
  portfolio: PortfolioItem[];
  isAdmin: boolean;
}

const FirebaseContext = createContext<FirebaseContextType | undefined>(undefined);

export const FirebaseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isAuthReady, setIsAuthReady] = useState(false);
  const [siteConfig, setSiteConfig] = useState<SiteConfig | null>(null);
  const [services, setServices] = useState<Service[]>([]);
  const [stats, setStats] = useState<Stat[]>([]);
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setIsAuthReady(true);
      if (user) {
        // Fetch user profile
        const userDoc = doc(db, 'users', user.uid);
        onSnapshot(userDoc, (doc) => {
          if (doc.exists()) {
            setUserProfile(doc.data() as UserProfile);
          } else {
            // Default profile for new users or if not found
            const isDefaultAdmin = user.email === "bohaean4252@gmail.com";
            setUserProfile({
              uid: user.uid,
              email: user.email || '',
              role: isDefaultAdmin ? 'admin' : 'user'
            });
          }
        });
      } else {
        setUserProfile(null);
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    // Fetch Site Config
    const configDoc = doc(db, 'config', 'main');
    const unsubConfig = onSnapshot(configDoc, (doc) => {
      if (doc.exists()) {
        setSiteConfig(doc.data() as SiteConfig);
      } else {
        // Default config
        setSiteConfig({
          heroTitle: "보해안 (Bohaean)",
          heroSubtitle: "프리미엄 의료 컨설팅 & 경영 지원",
          accentColor: "#0070f3",
          contactEmail: "bohaean4252@gmail.com",
          instagramUrl: "#",
          blogUrl: "#"
        });
      }
    });

    // Fetch Services
    const unsubServices = onSnapshot(collection(db, 'services'), (snapshot) => {
      setServices(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Service)));
    });

    // Fetch Stats
    const unsubStats = onSnapshot(collection(db, 'stats'), (snapshot) => {
      setStats(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Stat)));
    });

    // Fetch Portfolio
    const unsubPortfolio = onSnapshot(collection(db, 'portfolio'), (snapshot) => {
      setPortfolio(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as PortfolioItem)));
    });

    return () => {
      unsubConfig();
      unsubServices();
      unsubStats();
      unsubPortfolio();
    };
  }, []);

  const isAdmin = userProfile?.role === 'admin' || user?.email === "bohaean4252@gmail.com";

  return (
    <FirebaseContext.Provider value={{
      user,
      userProfile,
      isAuthReady,
      siteConfig,
      services,
      stats,
      portfolio,
      isAdmin
    }}>
      {children}
    </FirebaseContext.Provider>
  );
};

export const useFirebase = () => {
  const context = useContext(FirebaseContext);
  if (context === undefined) {
    throw new Error('useFirebase must be used within a FirebaseProvider');
  }
  return context;
};
