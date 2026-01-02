import { nav } from '@navigation/index';
import { authActions } from '@store/modules/auth/authActions';
import { authSelectors } from '@store/modules/auth/authSelectors';
import {
  User,
  Lock,
  Shield,
  HelpCircle,
  FileText,
  LogOut,
} from 'lucide-react-native';
import { useDispatch, useSelector } from 'react-redux';

export const useProfile = () => {
  const dispatch = useDispatch();
  const user = useSelector(authSelectors.getUser);

  const handleGoBack = () => {
    nav.back();
  };

  const handleMyData = () => {
    console.log('Navegar para Meus dados');
    // nav.to('MyData');
  };

  const handleChangePassword = () => {
    console.log('Navegar para Alterar senha');
    // nav.to('ChangePassword');
  };

  const handleSecurity = () => {
    console.log('Navegar para Segurança');
    // nav.to('Security');
  };

  const handleHelp = () => {
    console.log('Navegar para Ajuda');
    // nav.to('Help');
  };

  const handleTerms = () => {
    console.log('Navegar para Termos e políticas');
    // nav.to('Terms');
  };

  const handleLogout = () => {
    console.log('Sair da conta');
    dispatch(authActions.logoutRequest());
  };

  const menuItems = [
    {
      id: 'my-data',
      icon: User,
      label: 'Meus dados',
      onPress: handleMyData,
    },
    {
      id: 'change-password',
      icon: Lock,
      label: 'Alterar senha',
      onPress: handleChangePassword,
    },
    {
      id: 'security',
      icon: Shield,
      label: 'Segurança',
      onPress: handleSecurity,
    },
    {
      id: 'help',
      icon: HelpCircle,
      label: 'Ajuda',
      onPress: handleHelp,
    },
    {
      id: 'terms',
      icon: FileText,
      label: 'Termos e políticas',
      onPress: handleTerms,
    },
    {
      id: 'logout',
      icon: LogOut,
      label: 'Sair da conta',
      onPress: handleLogout,
      variant: 'danger' as const,
    },
  ];

  return {
    user,
    menuItems,
    handleGoBack,
  };
};
