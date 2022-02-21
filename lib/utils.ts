import { ApolloError } from "@apollo/client";
import { TFunction } from "next-i18next";
import { UseFormSetError } from "react-hook-form";

import {
  VALIDATION_ERROR_EXTENSIONS_KEY,
  VALIDATION_ERROR_CODE,
} from "./backendValues";

export function isClient() {
  return typeof window !== "undefined";
}

/*
 TODO 
 I am not sure how to represent regex on the frontend. right now, we just give the interpolate the regex string
 which is not very friendly. We might need custom interpolator to make it look friendly
 */

/**
 * @returns true if the error passed is a validation error
 */
export function setFormValidationErrors(
  apolloError: ApolloError,
  setError: UseFormSetError<any>,
  t: TFunction
): boolean {
  if (isErrorWithCode(apolloError, VALIDATION_ERROR_CODE)) {
    const validationErrors =
      apolloError.graphQLErrors[0].extensions![VALIDATION_ERROR_EXTENSIONS_KEY];

    traverseObject(validationErrors, (fieldName, validationError) => {
      const [errorCode, extras] = validationError;
      console.log(extras);
      setError(fieldName, {
        message: t("validation:" + errorCode, { replace: extras }),
      });
    });

    return true;
  }

  return false;
}

/**
 * Recursively traverse obj and call execute on each key-value pair
 * Note: Arrays are not recursively traversed
 */
function traverseObject(
  obj: object,
  execute: (key: string, value: any) => void
) {
  for (const key in obj) {
    const maybeNestedObj = (obj as any)[key];
    if (typeof maybeNestedObj === "object" && !Array.isArray(maybeNestedObj)) {
      // Keep going deeper
      traverseObject(maybeNestedObj, execute);
    } else {
      execute(key, maybeNestedObj);
    }
  }
}

/**
 * Check if an apollo error has the specified code
 */
export function isErrorWithCode(err: ApolloError, code: string) {
  return err.graphQLErrors[0]?.extensions?.code === code;
}

/* 
Using FileReader api 
@See https://stackoverflow.com/questions/31742072/filereader-vs-window-url-createobjecturl

export function readFile(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.addEventListener(
      "load",
      () => {
        if (reader.result && !(reader.result instanceof ArrayBuffer))
          resolve(reader.result);
        else reject("file can not be read");
      },
      false
    );
    reader.readAsDataURL(file);
  });
} */
