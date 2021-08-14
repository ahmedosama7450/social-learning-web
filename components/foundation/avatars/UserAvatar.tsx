import { AvatarProps, Avatar } from "./Avatar";
import { Replace } from "../../../lib/types";

export const UserAvatar = ({
  /**
   * This is not a url, but more of an identifier for the avatar
   * If the passed in avatar doesn't exist in avatars map, a default avatar is used
   */
  avatar = DEFAULT_AVATAR,
  ...avatarProps
}: Replace<AvatarProps, "avatarUrl", { avatar?: string }>) => {
  return (
    <Avatar
      {...avatarProps}
      avatarUrl={`/avatars/${
        avatar in AVATARS_MAP
          ? AVATARS_MAP[avatar]
          : AVATARS_MAP[DEFAULT_AVATAR]
      }`}
    />
  );
};

export const DEFAULT_AVATAR = "0";

export const AVATARS_MAP: Record<string, string> = {
  [DEFAULT_AVATAR]: "default.svg",
  "1": "male1.png",
};
