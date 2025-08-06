const FormButton = ({ icon: Icon, text, anime = "" }) => {
  return (
    <div className={`flex items-center gap-2 ${anime}`}>
      <Icon size={23} weight="regular" />
      {text && <div>{text}</div>}
    </div>
  );
};

export default FormButton;
