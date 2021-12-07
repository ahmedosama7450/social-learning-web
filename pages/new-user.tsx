import { GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router";
import { useForm, UseFormReturn } from "react-hook-form";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

import {
  useCreateUserMutation,
  useLogoutMutation,
  Locale,
  UserCreateInput,
  useTempUserInfoQuery,
} from "../__generated__/graphql";
import {
  Logo,
  Button,
  LoadingButton,
  RegisteredInputField,
  RegisteredTextareaField,
  RegisteredUserAvatarPicker,
  Loader,
  RedirectLoader,
  Error,
  ConfirmationDialog,
  EduOrgsLoader,
  EduOrgSelect,
} from "../components";
import {
  isClient,
  isErrorWithCode,
  setFormValidationErrors,
} from "../lib/utils";
import {
  AUTHENTICATION_ERROR_CODE,
  EXISTING_USER_ERROR_CODE,
} from "../lib/backendValues";

type FormInputs = Omit<UserCreateInput, "locale">;

const NewUserPage: NextPage = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const formMethods = useForm<FormInputs>();

  const {
    data: tempUserInfoData,
    loading: tempUserInfoLoading,
    error: tempUserInfoError,
  } = useTempUserInfoQuery();

  const [createUser, { called: createUserCalled, loading: createUserLoading }] =
    useCreateUserMutation({
      onCompleted() {
        // Our job is done here
        router.replace("/");
        // TODO Toast successful login
      },
      onError(err) {
        if (!setFormValidationErrors(err, formMethods.setError, t)) {
          // Unknown error
          console.log(err);
          // TODO Toast so the user tries again himself
        }
      },
    });

  // TODO Implement logout loading, probably show a loading dialog or a toast
  const [logout] = useLogoutMutation({
    onCompleted() {
      router.replace("/landing");
      // TODO Toast successful logout
    },
    onError(err) {
      console.log(err);
      // TODO Toast failed logout so the user tries again himself
    },
  });

  const onSubmit = (data: FormInputs) => {
    createUser({
      variables: {
        userCreateInput: {
          ...data,
          locale: Locale.Arabic /*TODO choose depending on current locale*/,
        },
      },
    });
  };

  // TODO Maybe this logic should be encapsulated as a protected route
  if (tempUserInfoLoading) {
    return <Loader />;
  } else if (tempUserInfoError) {
    if (isErrorWithCode(tempUserInfoError, AUTHENTICATION_ERROR_CODE)) {
      // Redirect to landing page to login first
      if (isClient()) router.replace("/landing");
      return <RedirectLoader />;
    } else if (isErrorWithCode(tempUserInfoError, EXISTING_USER_ERROR_CODE)) {
      // User is already created, what is he doing here ?
      if (isClient()) router.replace("/");
      return <RedirectLoader />;
    } else {
      return <Error />;
    }
  } else if (!tempUserInfoData) {
    return <Error />;
  }

  return (
    <EduOrgsLoader>
      {(eduOrgs) => (
        <div className="pb-16 bg-white">
          <header className="py-3.5">
            <nav className="flex items-center justify-between max-w-6xl px-3 mx-auto sm:px-10">
              <Logo />
              <ConfirmationDialog
                messageKey="common:confirm-logout"
                confirmListener={() => {
                  logout();
                }}
              >
                {(ds) => (
                  <Button
                    type="button"
                    color="red"
                    roundedFull
                    size="sm"
                    iconProps={{
                      icon: "ri:logout-box-r-line",
                    }}
                    isIconTrailing
                    onClick={() => {
                      ds.toggle();
                    }}
                  >
                    {t("common:logout")}
                  </Button>
                )}
              </ConfirmationDialog>
            </nav>
          </header>
          <main className="max-w-2xl px-3 mx-auto mt-4 sm:px-8">
            {/* TODO Add an illustration img here */}
            <h2 className="text-2xl font-bold text-center text-gray-900 sm:text-3xl">
              {t("profile:create-profile-title")}
            </h2>
            <p className="mt-2 mb-6 text-lg text-center text-gray-600 sm:mt-3 sm:mb-8 sm:text-xl">
              {t("profile:create-profile-under-title")}
            </p>
            <form
              onSubmit={formMethods.handleSubmit(onSubmit)}
              className="p-3 border rounded shadow-sm sm:p-4"
            >
              <RegisteredUserAvatarPicker
                name="avatar"
                control={formMethods.control}
                className="flex justify-center"
              />
              <div className="contents sm:flex sm:gap-5">
                <RegisteredInputField
                  name="firstName"
                  formMethods={formMethods}
                  className="mt-4 sm:flex-1"
                  innerProps={{
                    id: "firstName",
                    placeholder: t("profile:first-name"),
                    defaultValue: tempUserInfoData.tempUserInfo.firstName,
                  }}
                  label={t("profile:first-name")}
                />

                <RegisteredInputField
                  name="lastName"
                  formMethods={formMethods}
                  className="mt-4 sm:flex-1"
                  innerProps={{
                    id: "lastName",
                    placeholder: t("profile:last-name"),
                    defaultValue: tempUserInfoData.tempUserInfo.lastName,
                  }}
                  label={t("profile:last-name")}
                />
              </div>

              <RegisteredInputField
                name="username"
                formMethods={formMethods}
                className="mt-5"
                leadingAddonProps={{
                  addon: <span className="text-gray-500 sm:text-sm">@</span>,
                  isDetached: true,
                  className: "px-3",
                }}
                innerProps={{
                  id: "username",
                  placeholder: t("profile:username"),
                  defaultValue: tempUserInfoData.tempUserInfo.username,
                }}
                label={t("profile:username")}
              />

              <RegisteredTextareaField
                name="bio"
                formMethods={formMethods}
                className="mt-5"
                extraText={t("common:optional-field")}
                innerProps={{
                  id: "bio",
                  placeholder: t("profile:bio-placeholder"),
                  rows: 3,
                }}
                label={t("profile:bio")}
              />

              <EduOrgSelect
                eduOrgs={eduOrgs}
                formMethods={
                  // TODO Maybe there is a better way ?
                  formMethods as UseFormReturn<
                    Pick<UserCreateInput, "universityId" | "collegeId" | "year">
                  >
                }
                structure="normal"
                className="mt-5"
              />

              <LoadingButton
                type="button"
                size="lg"
                className="w-full mt-7"
                color="primary"
                loading={createUserCalled && createUserLoading}
                innerProps={{ type: "submit" }}
              >
                {t("common:continue")}
              </LoadingButton>
            </form>
          </main>
        </div>
      )}
    </EduOrgsLoader>
  );
};

export default NewUserPage;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, [
        "common",
        "validation",
        "edu-orgs",
        "profile",
      ])),
    },
  };
};
