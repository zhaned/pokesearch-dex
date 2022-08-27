export function PageNumber({ number, offset, offsetAmount }) {
  return (
    <div style={{ color: '#f8f9fa', textShadow: '2px 2px #851bed' }}>
      Page {Math.ceil(offset / offsetAmount + 1)} of{' '}
      {Math.ceil(number / offsetAmount)}
    </div>
  );
}
