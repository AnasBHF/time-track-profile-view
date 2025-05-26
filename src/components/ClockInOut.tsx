
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock } from "lucide-react";

interface ClockInOutProps {
  isClocked: boolean;
  currentSession: any;
  onClockIn: () => void;
  onClockOut: () => void;
}

export const ClockInOut = ({ isClocked, currentSession, onClockIn, onClockOut }: ClockInOutProps) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [sessionDuration, setSessionDuration] = useState("0h 0m");

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      
      if (isClocked && currentSession) {
        const start = new Date(currentSession.clockIn);
        const now = new Date();
        const diff = now.getTime() - start.getTime();
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        setSessionDuration(`${hours}h ${minutes}m`);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [isClocked, currentSession]);

  return (
    <div className="max-w-md mx-auto space-y-4 p-4">
      {/* Current Time Display - Mobile Optimized */}
      <Card className="text-center">
        <CardContent className="pt-6 pb-6">
          <div className="text-3xl md:text-4xl font-mono font-bold text-gray-900 mb-2">
            {currentTime.toLocaleTimeString()}
          </div>
          <div className="text-base md:text-lg text-gray-600">
            {currentTime.toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </div>
        </CardContent>
      </Card>

      {/* Status Card - Mobile Optimized */}
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center space-x-2 text-lg">
            <Clock size={20} />
            <span>Work Status</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-6">
            <div className="flex-1">
              <div className="text-xl md:text-2xl font-semibold">
                {isClocked ? "Clocked In" : "Clocked Out"}
              </div>
              <div className="text-gray-600 text-sm md:text-base">
                {isClocked ? `Session Duration: ${sessionDuration}` : "Ready to start work"}
              </div>
              {isClocked && currentSession && (
                <div className="text-xs md:text-sm text-gray-500 mt-1">
                  Started at: {new Date(currentSession.clockIn).toLocaleTimeString()}
                </div>
              )}
            </div>
            <div className={`w-4 h-4 rounded-full ${isClocked ? 'bg-green-500' : 'bg-gray-400'}`}></div>
          </div>

          {/* Larger touch-friendly button for mobile */}
          <Button
            onClick={isClocked ? onClockOut : onClockIn}
            size="lg"
            className={`w-full h-16 md:h-20 text-lg md:text-xl font-semibold touch-manipulation ${
              isClocked 
                ? 'bg-red-600 hover:bg-red-700 active:bg-red-800' 
                : 'bg-green-600 hover:bg-green-700 active:bg-green-800'
            }`}
          >
            {isClocked ? "Clock Out" : "Clock In"}
          </Button>
        </CardContent>
      </Card>

      {/* Quick Stats - Mobile Grid */}
      <div className="grid grid-cols-2 gap-3">
        <Card>
          <CardContent className="pt-4 pb-4 text-center">
            <div className="text-xl md:text-2xl font-bold text-blue-600">8.5h</div>
            <div className="text-xs md:text-sm text-gray-600">Today's Target</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 pb-4 text-center">
            <div className="text-xl md:text-2xl font-bold text-green-600">
              {isClocked ? sessionDuration : "0h 0m"}
            </div>
            <div className="text-xs md:text-sm text-gray-600">Today's Progress</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
