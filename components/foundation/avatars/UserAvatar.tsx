import { AvatarProps, Avatar } from "./Avatar";

export type UserAvatarProps = Omit<AvatarProps, "avatarUrl"> & {
  /**
   * This is not a url, but more of an identifier for the avatar
   * If the passed in avatar doesn't exist in avatars map, a default avatar is used
   */
  avatar?: string | null;
};

export const UserAvatar = ({
  avatar = DEFAULT_USER_AVATAR,
  ...avatarProps
}: UserAvatarProps) => {
  return (
    <Avatar
      {...avatarProps}
      // avatars must match this path
      avatarUrl={`/avatars/${
        avatar !== null && avatar in USER_AVATARS_MAP
          ? USER_AVATARS_MAP[avatar]
          : USER_AVATARS_MAP[DEFAULT_USER_AVATAR]
      }`}
    />
  );
};

export const DEFAULT_USER_AVATAR = "0";

export const USER_AVATARS_MAP: Record<string, string> = {
  [DEFAULT_USER_AVATAR]: "default.svg",
  "1": "male1.png",
};
