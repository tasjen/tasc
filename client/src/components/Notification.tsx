type Props = {
  noti: { text: string; error: boolean };
};

const Notification = ({ noti: { text, error } }: Props) => {
  return (
    <p id="noti" className={error ? 'error' : ''}>
      {text}
    </p>
  );
};

export default Notification;
