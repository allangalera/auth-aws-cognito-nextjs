import { Interpolation } from '@emotion/core';
import { Theme } from '../../styles/theme';

export const Container = (theme: Theme): Interpolation => ({
  color: theme.colors.primary,
  flex: 1,
});
