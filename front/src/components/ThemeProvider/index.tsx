import { FC } from 'react';
import { ThemeProvider as EmotionThemeProvider } from 'emotion-theming';
import { useRecoilValue } from 'recoil';
import { currentThemeAtom } from '../../store/atoms';
import themes from '../../styles/theme';

type Props = {};

const PageLayoutMain: FC<Props> = ({ children }) => {
  const currentTheme = useRecoilValue(currentThemeAtom);
  return <EmotionThemeProvider theme={themes[currentTheme]}>{children}</EmotionThemeProvider>;
};

PageLayoutMain.defaultProps = {};

export default PageLayoutMain;
