import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { nav } from '@navigation/index';
import { icons } from 'lucide-react-native';
import type { DropdownOption } from '@components/atoms/Dropdown';

const ROOM_TYPE_ICONS: Record<string, keyof typeof icons> = {
  Sala: 'Sofa',
  Cozinha: 'ChefHat',
  Quarto: 'Bed',
  Banheiro: 'Bath',
  Garagem: 'Car',
  Jardim: 'Trees',
  Central: 'Zap',
  Escritório: 'Briefcase',
  Lavanderia: 'Shirt',
  Corredor: 'ArrowRight',
  Varanda: 'Sun',
  Despensa: 'Package',
  'Área de serviço': 'Wind',
  Outros: 'Settings',
};

const schema = Yup.object().shape({
  name: Yup.string()
    .required('Nome do cômodo é obrigatório')
    .min(2, 'Nome deve ter pelo menos 2 caracteres'),
  type: Yup.string().required('Tipo do cômodo é obrigatório'),
  description: Yup.string()
    .required('Descrição é obrigatória')
    .min(10, 'Descrição deve ter pelo menos 10 caracteres'),
});

interface FormData {
  name: string;
  type: string;
  description: string;
}

export const useAddRoom = () => {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting, isDirty, isValid },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    mode: 'onChange',
    defaultValues: {
      name: '',
      type: '',
      description: '',
    },
  });

  const selectedType = watch('type');

  const handleGoBack = () => {
    nav.back();
  };

  const onSubmit = (data: FormData) => {
    const iconName = ROOM_TYPE_ICONS[data.type] || 'MoreHorizontal';

    const roomData = {
      ...data,
      iconName,
    };

    console.log('Salvando cômodo:', roomData);

    // TODO: Dispatch action para salvar
    // dispatch(placesManagerActions.addRoom(roomData));

    nav.back();
  };

  const handleCancel = () => {
    if (isDirty) {
      // TODO: Mostrar modal de confirmação
      console.warn('Formulário alterado, deseja descartar?');
    }
    nav.back();
  };

  // Ícone atual baseado no tipo selecionado
  const currentIcon = selectedType ? ROOM_TYPE_ICONS[selectedType] : 'Sofa';

  const roomTypes: DropdownOption[] = Object.keys(ROOM_TYPE_ICONS).map(
    (type, index) => ({
      id: `room-type-${index}`,
      label: type,
      icon: {
        name: ROOM_TYPE_ICONS[type],
      },
    }),
  );

  return {
    control,
    errors,
    isSubmitting,
    isValid,
    currentIcon,
    roomTypes,
    handleGoBack,
    handleCancel,
    onSubmit: handleSubmit(onSubmit),
  };
};
