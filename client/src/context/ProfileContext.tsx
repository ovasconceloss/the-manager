import React, { createContext, useState } from "react";

export interface ProfileContextType {
    selectedClub: string | null;
    setSelectedClub: (club: string | null) => void;
}

export const ProfileContext = createContext<ProfileContextType | undefined>(undefined);
  
export const ProfileProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [selectedClub, setSelectedClub] = useState<string | null>(null);
    
    return (
        <ProfileContext.Provider value={{ selectedClub, setSelectedClub }}>
            {children}
        </ProfileContext.Provider>
    );
};