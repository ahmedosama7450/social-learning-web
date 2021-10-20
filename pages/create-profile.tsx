import { GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

import {
  useCreateProfileMutation,
  useLogoutMutation,
  useMeQuery,
  Locale,
  ProfileCreateInput,
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
import { AUTHENTICATION_ERROR_CODE } from "../lib/backendValues";

type FormInputs = Omit<ProfileCreateInput, "locale">;

const CreateProfile: NextPage = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const formMethods = useForm<FormInputs>();

  const { data: meData, loading: meLoading, error: meError } = useMeQuery();
  const [
    createProfile,
    { called: createProfileCalled, loading: createProfileLoading },
  ] = useCreateProfileMutation({
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
    createProfile({
      variables: {
        profileCreateInput: {
          ...data,
          locale: Locale.Arabic /*TODO choose depending on current locale*/,
        },
      },
    });
  };

  // TODO Maybe this logic should be encapsulated as a protected route
  if (meLoading) {
    return <Loader />;
  } else if (meError) {
    // This could be an authentication error, which we need to handle
    if (isErrorWithCode(meError, AUTHENTICATION_ERROR_CODE)) {
      // Redirect to landing page to login first
      if (isClient()) router.replace("/landing");
      return <RedirectLoader />;
    } else {
      return <Error />;
    }
  } else if (!meData) {
    return <Error />;
  } else if (meData.me.profile) {
    // Profile is already created, what is he doing here ?
    if (isClient()) router.replace("/");
    return <RedirectLoader />;
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
                    color="red"
                    roundedFull
                    size="sm"
                    iconProps={{
                      icon: "ri:logout-box-r-line",
                      isTrailing: true,
                    }}
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
                    defaultValue: meData.me.firstName,
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
                    defaultValue: meData.me.lastName,
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
                  defaultValue: meData.me.username,
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
                formMethods={formMethods}
                structure="normal"
                className="mt-5"
              />

              <LoadingButton
                size="full"
                className="mt-7"
                color="primary"
                loading={createProfileCalled && createProfileLoading}
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

export default CreateProfile;

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
