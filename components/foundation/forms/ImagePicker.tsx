import { FileField } from "../..";
import { RetypeField } from "../../../lib/types";
import { FileFieldProps } from "./base/FileField";
import {
  ImageCropperDialog,
  ImageCropperDialogProps,
} from "./ImageCropperDialog";

export type ImagePickerProps = RetypeField<
  ImageCropperDialogProps,
  "children",
  FileFieldProps["children"]
>;

export const ImagePicker = ({ children, ...rest }: ImagePickerProps) => {
  return (
    <ImageCropperDialog {...rest}>
      {(ds) => (
        <FileField
          accept="image/*"
          onChange={(event) => {
            const file = event.target.files?.[0];

            if (file) {
              ds.resultDataHandler?.setResultData({
                src: URL.createObjectURL(file),
              });
              event.target.value = "";
              ds.toggle();
            }
          }}
        >
          {children}
        </FileField>
      )}
    </ImageCropperDialog>
  );
};
