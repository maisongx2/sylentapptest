import { useState, useEffect, useRef } from 'react';
import { LayoutChangeEvent, View } from 'react-native';

export const useHouseCard = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [buttonLayout, setButtonLayout] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });
  const buttonRef = useRef<View>(null);

  // Limpa estado ao desmontar
  useEffect(() => {
    return () => {
      setMenuVisible(false);
      setButtonLayout({ x: 0, y: 0, width: 0, height: 0 });
    };
  }, []);

  const measureButtonPosition = () => {
    buttonRef.current?.measureInWindow(
      (pageX, pageY, pageWidth, pageHeight) => {
        setButtonLayout({
          x: pageX,
          y: pageY,
          width: pageWidth,
          height: pageHeight,
        });
      },
    );
  };

  const handleMenuPress = () => {
    // Re-mede a posição ANTES de abrir o menu
    measureButtonPosition();
    setMenuVisible(true);
  };

  const handleCloseMenu = () => {
    setMenuVisible(false);
  };

  const handleButtonLayout = (event: LayoutChangeEvent) => {
    // Guarda a ref para poder medir depois
    buttonRef.current = event.target as any;
    measureButtonPosition();
  };

  return {
    menuVisible,
    buttonLayout,
    handleMenuPress,
    handleCloseMenu,
    handleButtonLayout,
  };
};
