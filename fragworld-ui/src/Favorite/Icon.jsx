import { Button } from "grommet";
import { Star } from "grommet-icons";

const FavoriteIcon = ({
  active,
  onClick,
  disabled,
  type,
  label,
  ...iconProps
}) => {
  const buttonProps = { onClick, disabled, type, label };
  iconProps.color = disabled ? "lightgrey" : active ? "orange" : "grey";

  return <Button {...buttonProps} icon={<Star {...iconProps} />} plain />;
};

export default FavoriteIcon;
