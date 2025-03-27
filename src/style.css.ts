import { style } from '@vanilla-extract/css';

const bottomBtn = style({
  position: 'fixed',
  zIndex: 2,
  width: '100%',
  padding: '12px',
  bottom: 0,
  backgroundColor: '#fff',
});

const container = style({
  display: 'flex',
  padding: '1rem',
  flexDirection: 'column',
  gap: '1rem',
});
const containerItems = style([
  container,
  {
    backgroundColor: '#fff',
    borderRadius: '40px 40px 0 0',
  },
]);

const box = style({
  display: 'flex',
  padding: '12px',
  alignItems: 'center',
  gap: '6px',
  borderRadius: '1rem',
  backgroundColor: '#F2F3F5',
});

const row = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
});

const img = style({ margin: '0 auto', maxWidth: '328px', objectFit: 'contain' });

export const appSt = {
  bottomBtn,
  container,
  box,
  row,
  img,
  containerItems,
};
