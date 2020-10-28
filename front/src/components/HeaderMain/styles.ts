import { Interpolation } from '@emotion/core';
import { Theme } from '../../styles/theme';

export const Container = (theme: Theme): Interpolation => ({
  background: theme.colors.primary,
  color: theme.colors.primary,
  position: 'sticky',
  top: 0,
  display: 'flex',
  justifyContent: 'space-between',
  padding: '1rem',
});
