
import { useState, useEffect } from "react";
import { ClockInOut } from "@/components/ClockInOut";
import { Navigation } from "@/components/Navigation";
import { Profile } from "@/components/Profile";
import { History } from "@/components/History";

const Index = () => {
  const [currentView, setCurrentView] = useState("dashboard");
  const [isClocked, setIsClocked] = useState(false);
  const [currentSession, setCurrentSession] = useState(null);
  const [timeEntries, setTimeEntries] = useState([]);

  useEffect(() => {
    // Load data from localStorage on component mount
    const savedEntries = localStorage.getItem("timeEntries");
    const savedSession = localStorage.getItem("currentSession");
    const savedClockStatus = localStorage.getItem("isClocked");

    if (savedEntries) {
      setTimeEntries(JSON.parse(savedEntries));
    }
    if (savedSession) {
      setCurrentSession(JSON.parse(savedSession));
    }
    if (savedClockStatus) {
      setIsClocked(JSON.parse(savedClockStatus));
    }
  }, []);

  const handleClockIn = () => {
    const now = new Date();
    const session = {
      id: Date.now(),
      clockIn: now.toISOString(),
      date: now.toDateString()
    };
    setCurrentSession(session);
    setIsClocked(true);
    localStorage.setItem("currentSession", JSON.stringify(session));
    localStorage.setItem("isClocked", "true");
  };

  const handleClockOut = () => {
    if (currentSession) {
      const now = new Date();
      const completedEntry = {
        ...currentSession,
        clockOut: now.toISOString(),
        duration: calculateDuration(new Date(currentSession.clockIn), now)
      };
      
      const updatedEntries = [completedEntry, ...timeEntries];
      setTimeEntries(updatedEntries);
      setCurrentSession(null);
      setIsClocked(false);
      
      localStorage.setItem("timeEntries", JSON.stringify(updatedEntries));
      localStorage.removeItem("currentSession");
      localStorage.setItem("isClocked", "false");
    }
  };

  const calculateDuration = (start, end) => {
    const diff = end - start;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
  };

  const renderContent = () => {
    switch (currentView) {
      case "profile":
        return <Profile />;
      case "history":
        return <History timeEntries={timeEntries} />;
      default:
        return (
          <ClockInOut
            isClocked={isClocked}
            currentSession={currentSession}
            onClockIn={handleClockIn}
            onClockOut={handleClockOut}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navigation currentView={currentView} onViewChange={setCurrentView} />
      <main className="container mx-auto px-4 py-8">
        {renderContent()}
      </main>
    </div>
  );
};

export default Index;
