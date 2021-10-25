import classNames from "classnames";
import { useTranslation } from "next-i18next";

import { BaseButton } from "..";
import { ClickListener } from "../../lib/types";

// TODO Make a better logo (Better icon, Better name)

export const Logo = ({
  onClick,
  collapseIntoIcon = false,
  className,
}: {
  onClick?: ClickListener<HTMLButtonElement>;
  collapseIntoIcon?: boolean;
  className?: string;
}) => {
  const { t } = useTranslation();

  return (
    <BaseButton
      type={onClick ? "button" : "next-link"}
      href={onClick ? undefined : "/"}
      onClick={onClick}
      className={classNames(className, "flex items-center gap-1.5")}
    >
      <svg
        className={collapseIntoIcon ? "w-7 h-7" : "w-8 h-8"}
        id="Layer_1"
        enableBackground="new 0 0 512 512"
        viewBox="0 0 512 512"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g>
          <g>
            <g>
              <path d="m145.552 174.734h30v143.149h-30z" fill="#0094ff" />
            </g>
            <g>
              <path d="m209.184 191.121h30v126.762h-30z" fill="#0094ff" />
            </g>
            <g>
              <path d="m272.816 191.121h30v126.762h-30z" fill="#005fe3" />
            </g>
            <g>
              <path d="m336.448 174.734h30v143.149h-30z" fill="#005fe3" />
            </g>
          </g>
          <g>
            <g>
              <path d="m0 302.883h512v30h-512z" fill="#00409f" />
            </g>
            <g>
              <path d="m256 302.883h256v30h-256z" fill="#00215a" />
            </g>
            <g>
              <path
                d="m256 206.122c-51.393 0-102.833-12.193-148.759-35.26l-17.208-8.643 13.465-26.809 17.208 8.643c41.769 20.979 88.553 32.068 135.294 32.068s93.525-11.089 135.294-32.068l17.208-8.643 13.465 26.809-17.208 8.643c-45.926 23.067-97.366 35.26-148.759 35.26z"
                fill="#00409f"
              />
            </g>
            <path
              d="m408.502 135.411-17.208 8.643c-41.769 20.979-88.553 32.068-135.294 32.068v30c51.393 0 102.833-12.193 148.759-35.26l17.208-8.643z"
              fill="#00215a"
            />
            <path
              d="m28.487 140.694v294.52h76.92v-294.52l-38.46-11.751z"
              fill="#72bbff"
            />
            <path
              d="m66.947 435.214h38.46v-294.52l-38.46-11.751z"
              fill="#0094ff"
            />
            <path
              d="m94.588 69.286h-55.281l-10.82 71.408h76.92z"
              fill="#9dcfff"
            />
            <path d="m94.588 69.286h-27.641v71.408h38.46z" fill="#72bbff" />
          </g>
          <g>
            <path d="m0 412.714h133.894v30h-133.894z" fill="#0094ff" />
          </g>
          <g>
            <path d="m66.947 412.714h66.947v30h-66.947z" fill="#005fe3" />
          </g>
          <g>
            <path
              d="m406.593 140.694v294.52h76.92v-294.52l-38.46-11.751z"
              fill="#0094ff"
            />
            <path
              d="m445.053 435.214h38.46v-294.52l-38.46-11.751z"
              fill="#005fe3"
            />
            <path
              d="m472.694 69.286h-55.282l-10.819 71.408h76.92z"
              fill="#72bbff"
            />
            <path d="m472.694 69.286h-27.641v71.408h38.46z" fill="#0094ff" />
            <g>
              <path d="m378.106 412.714h133.894v30h-133.894z" fill="#005fe3" />
            </g>
            <g>
              <path d="m445.053 412.714h66.947v30h-66.947z" fill="#00409f" />
            </g>
          </g>
        </g>
      </svg>

      {!collapseIntoIcon && (
        <span className="text-2xl font-semibold text-gray-700">
          {t("common:app-name")}
        </span>
      )}
    </BaseButton>
  );
};
