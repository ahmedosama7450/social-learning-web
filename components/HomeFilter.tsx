import { CogIcon } from "@heroicons/react/outline";
import classNames from "classnames";
import { useForm } from "react-hook-form";

import { Button, IconButton, EduOrgsLoader, EduOrgWithTagsSelect } from ".";

interface IFormInputs {
  university: number;
  college: number;
  year: number;
  tags: number[];
}

export const HomeFilter = ({
  title,
  submitButtonText,
  onSubmit,

  secondaryButton,
  className,
}: {
  title: string;

  submitButtonText: string;
  onSubmit: (date: IFormInputs) => void;

  secondaryButton?: {
    text: string;
    listener: () => void;
  };

  className?: string;
}) => {
  const formMethods = useForm<IFormInputs>();

  return (
    <EduOrgsLoader>
      {(eduOrgs) => (
        <div
          className={classNames(
            className,
            "h-full pb-4 bg-aside border border-gray-100 form-rounded"
          )}
        >
          <form
            className="flex flex-col justify-between h-full"
            onSubmit={formMethods.handleSubmit(onSubmit)}
          >
            <div className="">
              <div className="flex items-center justify-between px-3 py-3 text-base font-semibold text-gray-900 border-b">
                {title}
                <IconButton
                  iconProps={{ hIcon: CogIcon, size: "md" }}
                  color="darkGray"
                  hoverType="simple"
                />
              </div>

              <EduOrgWithTagsSelect
                eduOrgs={eduOrgs}
                formMethods={formMethods}
                structure="aside"
                className="px-3 mt-3"
              />
            </div>

            <div className="flex gap-4 px-3 pt-4 border-t">
              {secondaryButton && (
                <Button
                  size="sm"
                  color="white"
                  className="flex-1"
                  onClick={secondaryButton.listener}
                >
                  {secondaryButton.text}
                </Button>
              )}

              <Button
                size={secondaryButton ? "sm" : "md"}
                color="primary"
                className="flex-1"
                innerProps={{ type: "submit" }}
              >
                {submitButtonText}
              </Button>
            </div>
          </form>
        </div>
      )}
    </EduOrgsLoader>
  );
};
