
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock } from "lucide-react";

interface HistoryProps {
  timeEntries: any[];
}

export const History = ({ timeEntries }: HistoryProps) => {
  const formatTime = (timeString: string) => {
    return new Date(timeString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatDate = (timeString: string) => {
    return new Date(timeString).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  const getTotalHoursToday = () => {
    const today = new Date().toDateString();
    const todayEntries = timeEntries.filter(entry => 
      new Date(entry.clockIn).toDateString() === today
    );
    
    return todayEntries.reduce((total, entry) => {
      if (entry.duration) {
        const hours = parseFloat(entry.duration.match(/(\d+)h/)?.[1] || 0);
        const minutes = parseFloat(entry.duration.match(/(\d+)m/)?.[1] || 0);
        return total + hours + (minutes / 60);
      }
      return total;
    }, 0).toFixed(1);
  };

  const getTotalHoursWeek = () => {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    
    const weekEntries = timeEntries.filter(entry => 
      new Date(entry.clockIn) >= oneWeekAgo
    );
    
    return weekEntries.reduce((total, entry) => {
      if (entry.duration) {
        const hours = parseFloat(entry.duration.match(/(\d+)h/)?.[1] || 0);
        const minutes = parseFloat(entry.duration.match(/(\d+)m/)?.[1] || 0);
        return total + hours + (minutes / 60);
      }
      return total;
    }, 0).toFixed(1);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h2 className="text-3xl font-bold text-gray-900">Time Tracking History</h2>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="pt-6 text-center">
            <div className="text-3xl font-bold text-blue-600">{getTotalHoursToday()}h</div>
            <div className="text-sm text-gray-600">Today</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <div className="text-3xl font-bold text-green-600">{getTotalHoursWeek()}h</div>
            <div className="text-sm text-gray-600">This Week</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <div className="text-3xl font-bold text-purple-600">{timeEntries.length}</div>
            <div className="text-sm text-gray-600">Total Sessions</div>
          </CardContent>
        </Card>
      </div>

      {/* Time Entries */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Clock size={20} />
            <span>Recent Sessions</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {timeEntries.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Clock size={48} className="mx-auto mb-4 text-gray-300" />
              <p>No time entries yet. Start by clocking in!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {timeEntries.map((entry) => (
                <div
                  key={entry.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2 text-gray-600">
                      <Calendar size={16} />
                      <span className="font-medium">{formatDate(entry.clockIn)}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-6">
                    <div className="text-sm">
                      <div className="text-gray-500">Clock In</div>
                      <div className="font-medium">{formatTime(entry.clockIn)}</div>
                    </div>
                    
                    <div className="text-sm">
                      <div className="text-gray-500">Clock Out</div>
                      <div className="font-medium">
                        {entry.clockOut ? formatTime(entry.clockOut) : "In Progress"}
                      </div>
                    </div>
                    
                    <div className="text-sm">
                      <div className="text-gray-500">Duration</div>
                      <Badge variant="secondary" className="font-medium">
                        {entry.duration || "Ongoing"}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
