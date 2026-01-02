import { useMemo, useState } from 'react';
import { Icon } from '@assets/icons';
import type { DropdownOption } from '@components/atoms/Dropdown';
import { useDispatch, useSelector } from 'react-redux';
import { placesManagerSelectors } from '@store/modules/placesManager/placesManagerSelectors';
import { placesManagerActions } from '@store/modules/placesManager/placesManagerActions';
import { appNav, nav } from '@navigation/helpers/navigation-helpers';
import { AppRoute } from '@navigation/index';

export const useHomeTab = () => {
  const [selectedHome, setSelectedHome] = useState('Minha casa');
  const [showAddMenu, setShowAddMenu] = useState(false);

  const dispatch = useDispatch();

  const homesData = useSelector(placesManagerSelectors.getAllHomes);

  // Mock data - banners
  const banners = [
    'https://www.piscinasrecanto.com.br/uploads/produtos/24/fotos/linha-soberana-f6NJ.jpg',
    'https://images.homify.com/v1441193254/p/photo/image/743510/Arquiteto_Aquiles_N_colas_K_laris_Casa_Porto_Seguro__43_.jpg',
    'https://viagem.cnnbrasil.com.br/wp-content/uploads/sites/5/2023/11/piscina-rosewood-divulgacao-site.png?w=1200&h=675&crop=1',
  ];

  const homeOptions: DropdownOption[] = useMemo(() => {
    const formattedHomeOptions: DropdownOption[] = homesData.map(home => ({
      id: home.homeId,
      label: home.name,
      icon: Icon.home,
      onPress: () => dispatch(placesManagerActions.selectHome(home)),
    }));

    if (formattedHomeOptions.length === 0) {
      formattedHomeOptions.push({
        id: 'empty',
        label: 'Nenhuma casa cadastrada...',
        disabled: true,
      });
    }

    formattedHomeOptions.push({
      id: 'manage',
      label: 'Gerenciar casas',
      icon: Icon.settings,
      onPress: () => console.log('Gerenciar casas'), // ✨ Navega para tela
    });

    return formattedHomeOptions;
  }, [homesData, dispatch]); // ✨ Dependências corretas

  // Opções do menu de adicionar
  const addOptions: DropdownOption[] = [
    {
      id: '1',
      label: 'Nova casa',
      icon: Icon.home,
      onPress: () => {
        nav.to(AppRoute.HouseManagement);
      },
    },
    {
      id: '2',
      label: 'Novo cômodo',
      icon: Icon.door,
      onPress: () => {
        console.log('Novo cômodo');
        // TODO: Navegar para tela de adicionar cômodo
      },
    },
    {
      id: '3',
      label: 'Novo dispositivo',
      icon: Icon.plug,
      onPress: () => {
        console.log('Novo dispositivo');
        // TODO: Navegar para tela de adicionar dispositivo
      },
    },
  ];

  return {
    selectedHome,
    setSelectedHome,
    showAddMenu,
    setShowAddMenu,
    banners,
    homeOptions,
    addOptions,
  };
};
