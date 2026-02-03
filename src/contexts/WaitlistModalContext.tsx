"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import WaitlistModal from "@/components/WaitlistModal";

interface WaitlistModalContextValue {
    openWaitlist: () => void;
    closeWaitlist: () => void;
}

const WaitlistModalContext = createContext<WaitlistModalContextValue | undefined>(undefined);

export const WaitlistModalProvider = ({ children }: { children: ReactNode }) => {
    const [isOpen, setIsOpen] = useState(false);

    const openWaitlist = () => setIsOpen(true);
    const closeWaitlist = () => setIsOpen(false);

    return (
        <WaitlistModalContext.Provider value={{ openWaitlist, closeWaitlist }}>
            {children}
            <WaitlistModal isOpen={isOpen} onClose={closeWaitlist} />
        </WaitlistModalContext.Provider>
    );
};

export const useWaitlistModal = () => {
    const context = useContext(WaitlistModalContext);
    if (!context) {
        throw new Error("useWaitlistModal must be used within a WaitlistModalProvider");
    }
    return context;
};
