import type { IUser } from '@/types/IUser';
import { Mail, MapPin, Calendar, Lock, Globe, Share2, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
 import { handleProfilePrivacy } from '@/services/user/profileService';
import { toast } from 'sonner';
import { ConfirmDialog } from '@/components/ui/ConfirmDialog';
type Props = {
  user?: IUser;
  loading: boolean;
  refetchUser: () => Promise<void>;
};

const Dashboard = ({ user, loading, refetchUser }: Props) => {
 
 

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse space-y-6">
            <div className="bg-white rounded-3xl shadow-xl p-8">
              <div className="flex flex-col items-center space-y-4">
                <div className="w-32 h-32 bg-gray-200 rounded-full"></div>
                <div className="space-y-2 text-center">
                  <div className="h-6 bg-gray-200 rounded w-48"></div>
                  <div className="h-4 bg-gray-200 rounded w-32"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        

        {/* Spacer */}
        <div className="h-20"></div>

        {/* Profile Info */}
        <Card className="bg-white rounded-3xl shadow-xl border-0 overflow-hidden hover:shadow-2xl transition-all duration-500">
          <CardContent className="p-8 md:p-12">
            <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8">
              <div className="flex-1 text-center lg:text-left space-y-4">
                <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                  {user?.firstName || 'User Name'}
                </h1>
                <p className="text-lg text-orange-600 font-medium mb-1">
                  @{user?.lastName || 'username'}
                </p>

                {user?.email && (
                  <div className="flex items-center justify-center lg:justify-start gap-2 text-gray-600">
                    <Mail className="w-4 h-4" />
                    <span className="text-sm">{user.email}</span>
                  </div>
                )}

                 

                <div className="flex flex-wrap justify-center lg:justify-start gap-3 pt-4">
                 

                  
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        
        </div>
 
  
         
     </div>
  );
};

export default Dashboard;
