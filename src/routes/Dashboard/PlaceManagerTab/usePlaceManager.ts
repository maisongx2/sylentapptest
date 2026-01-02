import { useSelector } from 'react-redux';
import { placesManagerSelectors } from '@store/modules/placesManager/placesManagerSelectors';

export const usePlaceManager = () => {
  const selectedHome = useSelector(placesManagerSelectors.getSelectedHome);

  return {
    selectedHome,
  };
};
