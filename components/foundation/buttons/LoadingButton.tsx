import { useTranslation } from "react-i18next";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

import { Button, ButtonProps } from "./Button";

export type LoadingButtonProps = ButtonProps & {
  loading: boolean;
  loadingTextKey?: string;
};

export const LoadingButton = ({
  loading,
  loadingTextKey = "common:loading",

  innerProps,
  iconProps,

  ...buttonProps
}: LoadingButtonProps) => {
  const { t } = useTranslation();

  return (
    <Button
      {...buttonProps}
      iconProps={
        !loading ? iconProps : { faIcon: faSpinner, className: "animate-spin" }
      }
      innerProps={{ ...innerProps, disabled: loading }}
    >
      {loading ? t(loadingTextKey) : buttonProps.children}
    </Button>
  );
};
