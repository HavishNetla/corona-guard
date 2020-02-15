export default ({ onClick, color, children }) => (
  <div
    onClick={onClick}
    style={{
      background: color || 'blue',
      fontSize: '25px',
      width: '100%',
      boxShadow: '0 0 8px 0 rgba(0, 0, 0, 0.3)',
      height: '3em',
      padding: 'auto',
      color: 'white',
      borderRadius: '5px',
    }}
  >
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
      }}
    >
      <div>{children}</div>
    </div>
  </div>
)
