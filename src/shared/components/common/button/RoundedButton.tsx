import Image from 'next/image';
import { twMerge } from 'tailwind-merge';

import ButtonBase from './ButtonBase';

interface RoundedButtonProps {
  label: string;
  buttonClassName?: string;
  iconSrc?: string;
  iconClassName?: string;
  onClick?: () => void;
}

const RoundedButton = ({
  label,
  buttonClassName,
  iconSrc,
  iconClassName,
  onClick,
}: RoundedButtonProps) => {
  const baseStyles =
    'rounded-full cursor-pointer flex items-center justify-center';

  const buttonFinalStyles = twMerge(baseStyles, buttonClassName);

  const iconBaseStyles = 'relative';
  const iconFinalStyles = twMerge(iconBaseStyles, iconClassName);

  return (
    <ButtonBase className={buttonFinalStyles} onClick={onClick}>
      {iconSrc && (
        <span className={iconFinalStyles}>
          <Image fill alt="icon" src={iconSrc} />
        </span>
      )}
      {label && <span>{label}</span>}
    </ButtonBase>
  );
};

export default RoundedButton;
