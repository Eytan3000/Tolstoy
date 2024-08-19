export default function Alert({ message }: { message: string }) {
  return (
    <div
      style={{
        width: '100%',
        marginBlock: '1rem',
        borderRadius: '5px',
        padding: '4px',
        background: '#ffbebe',
      }}>
      {message}
    </div>
  );
}
