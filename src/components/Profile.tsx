
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarInitials } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { User, Mail, Phone, MapPin, Calendar } from "lucide-react";

export const Profile = () => {
  // Mock employee data - in a real app this would come from a database
  const employee = {
    name: "John Doe",
    email: "john.doe@company.com",
    phone: "+1 (555) 123-4567",
    department: "Software Development",
    position: "Senior Developer",
    employeeId: "EMP001",
    joinDate: "January 15, 2023",
    location: "New York Office",
    status: "Active"
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h2 className="text-3xl font-bold text-gray-900">Employee Profile</h2>
      
      {/* Profile Header */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center space-x-6">
            <Avatar className="w-24 h-24">
              <AvatarFallback className="text-2xl">JD</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-gray-900">{employee.name}</h3>
              <p className="text-lg text-gray-600">{employee.position}</p>
              <p className="text-md text-gray-500">{employee.department}</p>
              <div className="mt-2">
                <Badge variant="secondary">{employee.status}</Badge>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500">Employee ID</div>
              <div className="text-lg font-semibold">{employee.employeeId}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contact Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <User size={20} />
              <span>Contact Information</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-3">
              <Mail size={18} className="text-gray-500" />
              <div>
                <div className="text-sm text-gray-500">Email</div>
                <div className="font-medium">{employee.email}</div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Phone size={18} className="text-gray-500" />
              <div>
                <div className="text-sm text-gray-500">Phone</div>
                <div className="font-medium">{employee.phone}</div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <MapPin size={18} className="text-gray-500" />
              <div>
                <div className="text-sm text-gray-500">Location</div>
                <div className="font-medium">{employee.location}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar size={20} />
              <span>Employment Details</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="text-sm text-gray-500">Join Date</div>
              <div className="font-medium">{employee.joinDate}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Department</div>
              <div className="font-medium">{employee.department}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Position</div>
              <div className="font-medium">{employee.position}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Employment Status</div>
              <Badge className="mt-1">{employee.status}</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Stats */}
      <Card>
        <CardHeader>
          <CardTitle>This Month's Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">22</div>
              <div className="text-sm text-gray-600">Days Worked</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">176h</div>
              <div className="text-sm text-gray-600">Total Hours</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">8.0h</div>
              <div className="text-sm text-gray-600">Avg. Daily</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">2</div>
              <div className="text-sm text-gray-600">Days Off</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
