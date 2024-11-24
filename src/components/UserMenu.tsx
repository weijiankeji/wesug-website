import React from 'react';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Avatar, AvatarFallback } from './ui/avatar';
import { LogIn, LogOut, User } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { LoginDialog } from './LoginDialog';
import { request } from '@/request';

// Mock user state (replace with real authentication later)
const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [user, setUser] = React.useState<{ username: string; } | null>(null);

  const login = (data: {
    mobile: string;
    password?: string;
    smscode?: number;
    loginType: 1 | 2;
  }) => {
    request('POST', '/user/login', data).then((res) => {
      if (res.data.success) {
        setIsLoggedIn(true);
        setUser(res.data);
      }
    });
  };

  const register = (data: {
    mobile: string;
    password: string;
    password1: string;
    smscode: number;
    username: string
  }) => {
    request('POST', '/user/register', data).then((res) => {
      if (res.data.success) {
        setIsLoggedIn(true);
        setUser(res.data);
      }
    });
  }

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
    localStorage.removeItem('user-info');
  };

  return { isLoggedIn, user, login, register, logout };
};

export const UserMenu = () => {
  const { t } = useTranslation();
  const { isLoggedIn, user, login, register, logout } = useAuth();
  const [showLoginDialog, setShowLoginDialog] = React.useState(false);

  if (!isLoggedIn) {
    return (
      <>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowLoginDialog(true)}
          className="flex items-center gap-2"
        >
          <LogIn className="h-4 w-4" />
          {t('login')}
        </Button>
        {showLoginDialog && (
          <LoginDialog
            open={showLoginDialog}
            onOpenChange={setShowLoginDialog}
            onLogin={login}
            onRegister={register}
          />
        )}
      </>
    );
  }

  const handleLogout = () => {
    logout();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarFallback>
              <User className="h-4 w-4" />
            </AvatarFallback>
          </Avatar>
          <span>{user?.username}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={handleLogout} className="text-red-600">
          <LogOut className="h-4 w-4 mr-2" />
          {t('logout')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};